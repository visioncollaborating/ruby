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
    rangoFechas: "Semana del martes 21 al sábado 25 de julio",

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
            diaSemana: "Martes 21 de julio",
            imagenes: ["img/21.jpg"],
            copy: `🏠 ¿Comprar, vender o invertir? No lo hagas a ciegas.

Mi objetivo es entregarte la información y el análisis que necesitas para que tu próxima decisión inmobiliaria sea la más rentable de tu vida.

Aquí encontrarás:
🔍 Análisis reales de mercado.
💡 Consejos para evitar errores costosos.
📈 Oportunidades seleccionadas.

¡Sígueme y aseguremos tu patrimonio juntos! 📲`
        },

        {
            tipo: "imagen",
            diaSemana: "Jueves 23 de julio",
            imagenes: ["img/23.png"],
            copy: `¡Feliz día, Fuerza Aérea del Perú! 🇵🇪 Recordamos al Capitán Quiñones, cuyo ejemplo de valentía y determinación nos inspira a diario en cada meta que nos proponemos. ¡Un honor celebrar su legado! ✈️`
        },

        {
            tipo: "video",
            diaSemana: "Viernes 24 de julio",
            imagenes: ["img/24.jpg"],
            copy: `¡ALQUILER EN SURCO (CAMINOS DEL INCA)! 🏢✨

Vive frente al centro empresarial y comercial más exclusivo. Ubicación inmejorable y máxima comodidad.

💰 Alquiler: USD 1,200

95 m² | Piso 3 (vista externa antirruido).
2 dormitorios + cuarto de servicio con baño.
Cocina cerrada (gas natural) + lavandería.
Incluye cochera techada + depósito (4 m²).
Edificio: Seguridad 24/7 y espectacular Rooftop con zona de parrilla.

Condiciones:
Mantenimiento: S/ 350 (incluye agua).
2x1 | Contrato 1 año | Buen historial crediticio.
🚫 No mascotas.

¡Agenda tu visita hoy mismo!`
        },

        {
            tipo: "video",
            diaSemana: "Sábado 25 de julio",
            imagenes: ["img/25.jpg"],
            copy: `¡Celebrando nuestro mes patrio con colegas de ASPAI! 🇵🇪✨ Una excelente oportunidad para conectar y compartir en este gran evento.`
        }
    ]
};
