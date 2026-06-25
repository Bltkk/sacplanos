/**
 * Listado de proyectos realizados para la galería.
 *
 * Las imágenes viven en /public/proyectos/ y se procesan con
 * scripts/procesar_proyectos.py. Para agregar o cambiar fotos, edita ese
 * script y vuelve a ejecutarlo; luego actualiza este arreglo.
 *
 * No hay base de datos: la galería es contenido estático que se despliega
 * junto con el sitio. Esto es lo adecuado para una vitrina de proyectos que
 * cambia con poca frecuencia.
 */

export type Categoria = 'Vivienda' | 'Institucional';

export interface Proyecto {
  src: string;
  alt: string;
  titulo: string;
  categoria: Categoria;
}

export const proyectos: Proyecto[] = [
  { src: '/proyectos/proyecto-01.jpg', titulo: 'Conjunto residencial', categoria: 'Vivienda', alt: 'Conjunto de viviendas con amplio jardín construido por SAC' },
  { src: '/proyectos/proyecto-02.jpg', titulo: 'Casa de campo', categoria: 'Vivienda', alt: 'Casa de campo de un piso con teja colonial' },
  { src: '/proyectos/proyecto-03.jpg', titulo: 'Vivienda de dos pisos', categoria: 'Vivienda', alt: 'Vivienda de dos pisos con entorno arbolado' },
  { src: '/proyectos/proyecto-04.jpg', titulo: 'Casa de ladrillo a la vista', categoria: 'Vivienda', alt: 'Casa de dos pisos de ladrillo a la vista con techos a dos aguas' },
  { src: '/proyectos/proyecto-05.jpg', titulo: 'Vivienda mediterránea', categoria: 'Vivienda', alt: 'Vivienda estilo mediterráneo con muros blancos' },
  { src: '/proyectos/proyecto-06.jpg', titulo: 'Colegio Mekis', categoria: 'Institucional', alt: 'Edificio del Colegio Mekis construido por SAC' },
  { src: '/proyectos/proyecto-07.jpg', titulo: 'Casa con acceso enrejado', categoria: 'Vivienda', alt: 'Vivienda de un piso con teja colonial y acceso enrejado' },
  { src: '/proyectos/proyecto-08.jpg', titulo: 'Edificio residencial', categoria: 'Vivienda', alt: 'Edificio residencial de dos niveles con buhardillas' },
  { src: '/proyectos/proyecto-09.jpg', titulo: 'Vivienda de dos pisos', categoria: 'Vivienda', alt: 'Vivienda de dos pisos con techo de teja' },
  { src: '/proyectos/proyecto-10.jpg', titulo: 'Edificio institucional', categoria: 'Institucional', alt: 'Edificio institucional de líneas modernas' },
  { src: '/proyectos/proyecto-11.jpg', titulo: 'Colegio Patricio Mekis', categoria: 'Institucional', alt: 'Fachada del Colegio Patricio Mekis construido por SAC' },
  { src: '/proyectos/proyecto-12.jpg', titulo: 'Conjunto habitacional', categoria: 'Vivienda', alt: 'Conjunto habitacional con acceso enrejado' },
  { src: '/proyectos/proyecto-13.jpg', titulo: 'Casa con teja colonial', categoria: 'Vivienda', alt: 'Vivienda de un piso con teja colonial y antejardín' },
  { src: '/proyectos/proyecto-14.jpg', titulo: 'Vivienda con acceso vehicular', categoria: 'Vivienda', alt: 'Vivienda de un piso con acceso vehicular enrejado' },
  { src: '/proyectos/proyecto-15.jpg', titulo: 'Casa con piscina', categoria: 'Vivienda', alt: 'Vivienda de un piso con piscina y jardín' },
  { src: '/proyectos/proyecto-16.jpg', titulo: 'Vivienda dos aguas', categoria: 'Vivienda', alt: 'Vivienda con techo a dos aguas y jardín' },
  { src: '/proyectos/proyecto-17.jpg', titulo: 'Casa con piscina', categoria: 'Vivienda', alt: 'Casa con piscina y terraza' },
  { src: '/proyectos/proyecto-18.jpg', titulo: 'Casa estilo americano', categoria: 'Vivienda', alt: 'Casa estilo americano de ladrillo y dos aguas' },
  { src: '/proyectos/proyecto-19.jpg', titulo: 'Vivienda contemporánea', categoria: 'Vivienda', alt: 'Vivienda contemporánea con techo de pizarra' },
  { src: '/proyectos/proyecto-20.jpg', titulo: 'Casa con galería y piscina', categoria: 'Vivienda', alt: 'Casa con galería de arcos y piscina' },
  { src: '/proyectos/proyecto-21.jpg', titulo: 'Casa con quincho y piscina', categoria: 'Vivienda', alt: 'Vivienda con quincho y piscina' },
  { src: '/proyectos/proyecto-22.jpg', titulo: 'Casa de campo con palmeras', categoria: 'Vivienda', alt: 'Casa de campo con palmeras y antejardín' },
  { src: '/proyectos/proyecto-23.jpg', titulo: 'Casa patronal', categoria: 'Vivienda', alt: 'Casa patronal de dos pisos con acceso enrejado' },
  { src: '/proyectos/proyecto-24.jpg', titulo: 'Vivienda de dos pisos', categoria: 'Vivienda', alt: 'Vivienda de dos pisos con terraza y jardín' },
  { src: '/proyectos/proyecto-25.jpg', titulo: 'Casa patronal con galería', categoria: 'Vivienda', alt: 'Casa patronal de dos pisos con galería de arcos' },
];
