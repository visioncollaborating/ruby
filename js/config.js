document.addEventListener("DOMContentLoaded", () => {
    // Inyectar textos del encabezado
    document.getElementById("mainTitle").innerText = CONFIG_SEMANAL.titulo;
    document.getElementById("mainSubtitle").innerText = CONFIG_SEMANAL.cliente;
    document.getElementById("weekDates").innerText = CONFIG_SEMANAL.rangoFechas;

    const wrapper = document.getElementById("slidesWrapper");
    const totalPosts = CONFIG_SEMANAL.publicaciones.length;

    // Generar dinámicamente los Mockups de Instagram
    CONFIG_SEMANAL.publicaciones.forEach((post, index) => {
        const slide = document.createElement("div");
        slide.className = `slide ${index === 0 ? 'active' : ''}`;

        let mediaHTML = "";
        let legendClass = "";

        if (post.tipo === "video") {
            legendClass = "spec-video";
            mediaHTML = `
                <div class="ig-media">
                    <div class="ig-reel-icon">🎬 REEL</div>
                    <img src="${post.imagenes[0]}" alt="Video ${index + 1}">
                </div>`;
        } else if (post.tipo === "carrusel") {
            legendClass = "spec-carousel";
            let imagesHTML = post.imagenes.map(src => `<img src="${src}" alt="Carrusel">`).join("");
            let dotsHTML = post.imagenes.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join("");
            
            mediaHTML = `
                <div class="ig-media-carousel">
                    <div class="ig-carousel-icon">📋 CARRUSEL</div>
                    <div class="inner-carousel-track">
                        ${imagesHTML}
                    </div>
                    <div class="carousel-dots">
                        ${dotsHTML}
                    </div>
                </div>`;
        } else {
            mediaHTML = `
                <div class="ig-media">
                    <img src="${post.imagenes[0]}" alt="Imagen ${index + 1}">
                </div>`;
        }

        slide.innerHTML = `
            <div class="instagram-mockup">
                <div class="ig-header">
                    <div class="ig-avatar">${CONFIG_SEMANAL.avatarLetras}</div>
                    <div class="ig-username">${CONFIG_SEMANAL.usuarioInstagram}</div>
                </div>
                
                ${mediaHTML}
                
                <div class="post-legend ${legendClass}">
                    <span class="legend-indicator">Publicación ${index + 1} de ${totalPosts}</span>
                    <span class="legend-day">📅 ${post.diaSemana}</span>
                </div>

                <div class="ig-actions">
                    <span>❤️</span> <span>💬</span> <span>🔁</span>
                </div>
                
                <div class="ig-caption-box">
                    <p class="ig-caption">${post.copy}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Inyectar de último la Pantalla 5 fija de Aprobación
    const approvalSlide = document.createElement("div");
    approvalSlide.className = "slide";
    approvalSlide.innerHTML = `
        <div class="approval-card">
            <div class="approval-icon">📝</div>
            <h2>Revisión Final</h2>
            <p>Por favor, indícanos si apruebas el contenido o si deseas dejarnos alguna corrección.</p>
            <div class="form-group">
                <label class="radio-label">
                    <input type="radio" name="status" value="APROBADO" checked>
                    <span class="custom-radio approved">🟢 ¡Todo aprobado, me encanta!</span>
                </label>
                <label class="radio-label">
                    <input type="radio" name="status" value="CON CAMBIOS">
                    <span class="custom-radio changes">🟡 Aprobar con cambios / observaciones</span>
                </label>
            </div>
            <div class="form-group">
                <textarea id="clientComments" placeholder="Escribe aquí tus comentarios, correcciones o sugerencias para esta semana..."></textarea>
            </div>
            <button class="submit-whatsapp-btn" id="sendWhatsapp">
                <span>💬 Enviar Respuesta al Grupo de WhatsApp</span>
            </button>
        </div>
    `;
    wrapper.appendChild(approvalSlide);

    // INICIALIZAR EVENTOS DE NAVEGACIÓN
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentSlide = 0;

    function updateSlidePosition(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) slide.classList.add("active");
        });
        prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
        nextBtn.style.visibility = index === slides.length - 1 ? "hidden" : "visible";
    }

    prevBtn.addEventListener("click", () => { if (currentSlide > 0) { currentSlide--; updateSlidePosition(currentSlide); } });
    nextBtn.addEventListener("click", () => { if (currentSlide < slides.length - 1) { currentSlide++; updateSlidePosition(currentSlide); } });
    updateSlidePosition(currentSlide);

    // ACTIVAR SCROLL DE PUNTITOS PARA LOS CARRUSELES INTERNOS
    const tracks = document.querySelectorAll(".inner-carousel-track");
    
    tracks.forEach(track => {
        const dots = track.parentElement.querySelectorAll(".dot");
        
        track.addEventListener("scroll", () => {
            const width = track.clientWidth;
            const activeIndex = Math.round(track.scrollLeft / width);
            dots.forEach((dot, idx) => {
                dot.classList.remove("active");
                if (idx === activeIndex) dot.classList.add("active");
            });
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                const width = track.clientWidth;
                track.scrollTo({
                    left: width * index,
                    behavior: "smooth"
                });
            });
        });
    });

    // CONFIGURACIÓN DE ENVÍO DIRECTO A WHATSAPP
    document.getElementById("sendWhatsapp").addEventListener("click", () => {
        const status = document.querySelector('input[name="status"]:checked').value;
        const comments = document.getElementById("clientComments").value.trim() || "Sin comentarios adicionales.";
        
        const message = `*RESPUESTA CALENDARIO - ${CONFIG_SEMANAL.cliente.toUpperCase()}*\n\n` +
                        `*Estado:* ${status}\n` +
                        `*Comentarios:* ${comments}\n\n` +
                        `_Enviado desde el sistema de previsualización web._`;
        
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
});