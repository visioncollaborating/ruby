/* ============================================================================
   EDITA SOLO ESTE ARCHIVO PARA CADA CLIENTE O SEMANA
   ============================================================================

   CAMBIO RÁPIDO:
   1. Edita la sección DATOS DEL CLIENTE.
   2. Edita la sección DATOS DE LA SEMANA.
   3. Cambia el texto, fecha e imágenes de las publicaciones.
   4. Guarda las imágenes dentro de la carpeta "img".

   NO es necesario editar index.html, config.js ni style.css.
============================================================================ */

const CONFIG_SEMANAL = {

    /* ------------------------------------------------------------------------
       1. DATOS DEL CLIENTE
       Estos datos se escriben UNA SOLA VEZ.
    ------------------------------------------------------------------------ */
    cliente: "Ruby Sanchez",
    usuarioInstagram: "rubysanchez.propiedades",

    // Firma que se agregará automáticamente al final de todas las publicaciones.
    firmaPublicaciones: "Contáctame y disfruta de tu nueva casa 🙌",
    whatsappPublicaciones: "📞 Ruby Sánchez: 999.970.167",

    // Número al que llegará la aprobación. Solo números y con código de país.
    // Déjalo vacío para que el cliente elija el chat de WhatsApp.
    whatsappDestino: "",

    /* ------------------------------------------------------------------------
       2. DATOS DE LA SEMANA
    ------------------------------------------------------------------------ */
    titulo: "Calendario Julio 2026",
    rangoFechas: "Semana del martes 14 al sábado 18 de julio",

    /* ------------------------------------------------------------------------
       3. PUBLICACIONES

       tipo: puede ser "imagen", "video" o "carrusel".
       diaSemana: fecha que verá el cliente.
       imagenes: nombre y ubicación de las imágenes.
       copy: escribe solamente el contenido principal. La firma se añade sola.

       PARA UN CARRUSEL:
       imagenes: ["img/1.jpg", "img/2.jpg", "img/3.jpg"]
    ------------------------------------------------------------------------ */
    publicaciones: [
        {
            tipo: "imagen",
            diaSemana: "Martes 14 de julio",
            imagenes: ["img/14.jpg"],
            copy: `¿Buscas casa? Deja de mirar solo fotos bonitas. 🏠

Para que tu inversión sea rentable y tu vida más fácil, analiza esto primero:

📍 Ubicación estratégica
🚉 Conectividad real
💼 Estilo de vida a tu medida
📈 Potencial de valorización

¿Quieres comprar con cabeza fría?`
        },

        {
            tipo: "video",
            diaSemana: "Jueves 16 de julio",
            imagenes: ["img/16.jpg"],
            copy: `¿Buscas la sede central para tu negocio en SJM? 🏢

Potencia tu crecimiento en este edificio comercial de 5 pisos, ubicado en el corazón económico del distrito.

✅ Ubicación clave: A pasos de la Municipalidad, sobre avenida principal y cerca de Av. Pachacútec.
✅ Infraestructura lista: 854 m², 22 ambientes, luz trifásica y zonificación CZ.
✅ Versátil: Ideal para institutos, centros médicos, notarías u oficinas corporativas.

¡Tu negocio merece una ubicación estratégica! 🚀

📲 ¿Listo para verlo? Agenda tu visita aquí.`
        },

        {
            tipo: "carrusel",
            diaSemana: "Viernes 17 de julio",
            imagenes: ["img/17.jpg","img/17_2.jpg","img/17_3.jpg", "img/17_4.jpg","img/17_5.jpg"],
            copy: `¿Tu depa de playa soñado en Punta Hermosa? 🌊

A solo 40 minutos de Lima, estrena este flat exclusivo con una ventaja que tu bolsillo agradecerá: ¡NO PAGA ALCABALA! 💸

📍 Ubicación top: Av. Punta Hermosa, cerca al Malecón Norte y al Club Náutico.
✨ El depa: 104 m², 3 dormitorios (master con baño), balcón con vista y cocina abierta.
🚗 Plus: Cochera doble lineal y ascensor.
🏢 Exclusividad: Edificio de solo 12 departamentos.

Ideal para disfrutar todo el año o como inversión segura.

📲 ¿Lo visitamos este fin de semana? Escríbeme ahora.`
        },

        {
            tipo: "video",
            diaSemana: "Sábado 18 de julio",
            imagenes: ["img/18.jpg"],
            copy: `¿Buscas tu refugio de paz en Cieneguilla? 🌿

Escapa del ruido y disfruta esta casa de campo diseñada para compartir. Ubicada en la mejor zona (3ra etapa), a solo minutos de los principales puntos de interés.

✨ Lo que amarás:
• Área social top: Terraza con pérgola, piscina y zona de parrilla lista para tus reuniones.
• Distribución ideal: 5 habitaciones (3 en el primer piso, ideales para adultos mayores o invitados).
• Libertad total: Terreno amplio con jardín, ¡sin pagar mantenimiento!
• Capacidad: Espacio para 8 autos.

Documentos en regla y lista para transferir. Deja de buscar y empieza a disfrutar.

📲 ¿Agendamos tu visita este finde? Escríbeme aquí.`
        }
    ]
};
