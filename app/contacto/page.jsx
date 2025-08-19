'use client';

import ContactForm from "@/components/contacto/ContactForm"

export default function ContactPage() {
  return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Hablemos 👋
          </h1>
          <p className="mt-2 text-gray-300">
            Cuéntame sobre tu proyecto o escríbeme para cualquier oportunidad.
          </p>
        </div>

        <div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className='bg-gray-950 border-sky-500 border-2 rounded-lg shadow-inner shadow-sky-300 grow flex flex-col p-8'
        >
          <h2>Envíame un mensaje:</h2>
          <ContactForm/>
        </div>
      </section>
  );
}
