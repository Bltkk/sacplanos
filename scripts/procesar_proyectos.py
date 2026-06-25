#!/usr/bin/env python3
"""
Procesa las fotos de proyectos de SAC Planos para la web.

Pasos por foto:
  1. Rota 90° antihorario (las fotos vienen acostadas desde WhatsApp).
  2. Auto-recorta el borde blanco del papel impreso (bounding box del contenido).
  3. Redimensiona a un ancho máximo para web (carga rápida).
  4. Guarda como JPEG optimizado en public/proyectos/.

Uso:
  python3 scripts/procesar_proyectos.py            # procesa todas
  python3 scripts/procesar_proyectos.py --limit 3  # solo las primeras N (prueba)
"""

import argparse
import sys
from pathlib import Path
from PIL import Image, ImageOps

ORIGEN = Path.home() / "Downloads" / "fotos sacplanos pagina"
DESTINO = Path(__file__).resolve().parent.parent / "public" / "proyectos"

MAX_ANCHO = 1400          # ancho máximo en px tras rotar (suficiente para web)
CALIDAD = 82              # calidad JPEG (buen balance peso/nitidez)

# Recorte fijo del marco de papel. El cielo claro de muchas fotos se confunde
# con el papel blanco, así que un recorte porcentual fijo es más fiable que
# detectar el borde. Cualquier resto mínimo lo absorbe el object-cover de la
# galería (proporción fija). Lados con más margen de papel que arriba/abajo.
RECORTE_VERT = 0.035      # 3.5% arriba y abajo
RECORTE_HORIZ = 0.045     # 4.5% izquierda y derecha


def recortar_borde_blanco(img: Image.Image) -> Image.Image:
    """Recorta un margen fijo en cada lado para eliminar el marco del papel."""
    w, h = img.size
    dx = round(w * RECORTE_HORIZ)
    dy = round(h * RECORTE_VERT)
    return img.crop((dx, dy, w - dx, h - dy))


def procesar(ruta: Path, indice: int) -> Path:
    img = Image.open(ruta)
    img = ImageOps.exif_transpose(img)          # respeta orientación EXIF si existe
    img = img.rotate(90, expand=True)           # endereza (antihorario)
    img = recortar_borde_blanco(img)

    # Redimensiona si excede el ancho máximo
    if img.width > MAX_ANCHO:
        nuevo_alto = round(img.height * MAX_ANCHO / img.width)
        img = img.resize((MAX_ANCHO, nuevo_alto), Image.LANCZOS)

    DESTINO.mkdir(parents=True, exist_ok=True)
    salida = DESTINO / f"proyecto-{indice:02d}.jpg"
    img.convert("RGB").save(salida, "JPEG", quality=CALIDAD, optimize=True, progressive=True)
    return salida


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None, help="Procesar solo las primeras N fotos")
    args = parser.parse_args()

    if not ORIGEN.exists():
        print(f"No existe la carpeta de origen: {ORIGEN}", file=sys.stderr)
        return 1

    fotos = sorted(ORIGEN.glob("*.jpeg")) + sorted(ORIGEN.glob("*.jpg"))
    if args.limit:
        fotos = fotos[: args.limit]

    print(f"Procesando {len(fotos)} fotos -> {DESTINO}")
    for i, foto in enumerate(fotos, start=1):
        salida = procesar(foto, i)
        kb = salida.stat().st_size // 1024
        print(f"  [{i:02d}] {foto.name}  ->  {salida.name}  ({kb} KB)")
    print("Listo.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
