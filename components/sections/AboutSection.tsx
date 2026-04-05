export default function AboutSection() {
  return (
    <section className="py-20 bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Band */}
        <div className="bg-brand-navy p-12 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-white">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-white/60 mt-2">
              Conversemos sobre cómo podemos ayudarte a concretarlo.
            </p>
          </div>
          <a
            href="/contacto"
            className="shrink-0 bg-brand-orange text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#c55a00] transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
