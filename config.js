document.addEventListener("DOMContentLoaded", () => {
    const posts = CONFIG_SEMANAL.publicaciones;
    const storageKey = `revision-${CONFIG_SEMANAL.cliente}-${CONFIG_SEMANAL.rangoFechas}`;
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

    let current = Math.min(saved.current || 0, Math.max(posts.length - 1, 0));
    const answers = posts.map((_, index) => saved.answers?.[index] || {
        status: "",
        comment: ""
    });

    const content = document.getElementById("content");
    const stepText = document.getElementById("stepText");
    const progressBar = document.getElementById("progressBar");

    document.getElementById("clientName").textContent = CONFIG_SEMANAL.cliente;
    document.getElementById("weekDates").textContent = CONFIG_SEMANAL.rangoFechas;

    const escapeHTML = (text = "") => String(text).replace(/[&<>'"]/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);

    function save() {
        localStorage.setItem(storageKey, JSON.stringify({ current, answers }));
    }

    function buildCopy(post) {
        const extras = [];
        if (CONFIG_SEMANAL.firmaPublicaciones) extras.push(CONFIG_SEMANAL.firmaPublicaciones);
        if (CONFIG_SEMANAL.whatsappPublicaciones) {
            const phone = String(CONFIG_SEMANAL.whatsappPublicaciones).replace(/\D/g, "");
            extras.push(`WhatsApp: https://wa.me/${phone}`);
        }
        return extras.length ? `${post.copy}\n.\n.\n${extras.join("\n")}` : post.copy;
    }

    function mediaHTML(post, postIndex) {
        const images = Array.isArray(post.imagenes) ? post.imagenes : [];

        if (post.tipo === "carrusel") {
            return `
                <div class="media carousel-media" data-carousel>
                    <div class="carousel-track">
                        ${images.map((src, imageIndex) => `
                            <img src="${escapeHTML(src)}"
                                 alt="Imagen ${imageIndex + 1} de ${images.length}, publicación ${postIndex + 1}">
                        `).join("")}
                    </div>
                    ${images.length > 1 ? `
                        <div class="carousel-dots">
                            ${images.map((_, i) => `<button type="button" class="dot ${i === 0 ? "active" : ""}" aria-label="Ver imagen ${i + 1}"></button>`).join("")}
                        </div>
                    ` : ""}
                </div>`;
        }

        if (post.tipo === "video") {
            return `
                <div class="media video-media">
                    <img src="${escapeHTML(images[0] || "")}" alt="Portada del video, publicación ${postIndex + 1}">
                    <button class="fake-play" type="button" aria-label="Vista previa de video">▶</button>
                    <span class="media-label">VIDEO</span>
                </div>`;
        }

        return `
            <div class="media">
                <img src="${escapeHTML(images[0] || "")}" alt="Publicación ${postIndex + 1}">
                <span class="media-label">IMAGEN</span>
            </div>`;
    }

    function renderPost() {
        // Asegura que la página vuelva a desplazarse después de cerrar el modal.
        document.body.classList.remove("modal-open");

        const post = posts[current];
        const answer = answers[current];

        stepText.textContent = `Publicación ${current + 1} de ${posts.length}`;
        progressBar.style.width = `${((current + 1) / posts.length) * 100}%`;

        content.innerHTML = `
            <article class="card">
                <div class="card-top">
                    <div>
                        <span>PUBLICACIÓN ${current + 1}</span>
                        <h2>${escapeHTML(post.diaSemana)}</h2>
                    </div>
                    <strong>${post.tipo === "video" ? "Video" : post.tipo === "carrusel" ? "Carrusel" : "Imagen"}</strong>
                </div>

                <div class="media-stage">
                    ${current > 0 ? '<button class="post-arrow post-prev" id="prevPost" type="button" aria-label="Publicación anterior">‹</button>' : ""}
                    ${mediaHTML(post, current)}
                    <button class="post-arrow post-next" id="nextPost" type="button" aria-label="Siguiente publicación">›</button>
                </div>

                <section class="copy-box" aria-label="Texto de la publicación">
                    <div class="copy-title">Texto de la publicación</div>
                    <p>${escapeHTML(buildCopy(post))}</p>
                </section>
            </article>

            <div class="modal-backdrop" id="approvalModal" hidden>
                <section class="approval-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                    <button class="modal-close" id="closeModal" type="button" aria-label="Cerrar">×</button>
                    <div class="modal-icon">👀</div>
                    <h3 id="modalTitle">¿Lo revisaste bien?</h3>
                    <p>Confirma que la imagen, el texto y la fecha estén correctos.</p>

                    <div class="choice-grid">
                        <button class="choice approve ${answer.status === "APROBADO" ? "selected" : ""}" data-status="APROBADO" type="button">
                            <span>✓</span> Sí, lo apruebo
                        </button>
                        <button class="choice changes ${answer.status === "CON CAMBIOS" ? "selected" : ""}" data-status="CON CAMBIOS" type="button">
                            <span>✎</span> Necesita cambios
                        </button>
                    </div>

                    <div class="comment-area ${answer.status === "CON CAMBIOS" ? "show" : ""}" id="commentArea">
                        <label for="comment">¿Qué debemos cambiar?</label>
                        <textarea id="comment" placeholder="Escribe el cambio aquí...">${escapeHTML(answer.comment)}</textarea>
                    </div>

                    <p class="error" id="errorMessage"></p>
                    <button class="primary modal-continue" id="confirmNext" type="button">
                        ${current === posts.length - 1 ? "Terminar revisión" : "Continuar"}
                    </button>
                </section>
            </div>`;

        setupCarousel();

        document.getElementById("prevPost")?.addEventListener("click", () => {
            current--;
            save();
            renderPost();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        document.getElementById("nextPost").addEventListener("click", openModal);
        document.getElementById("closeModal").addEventListener("click", closeModal);
        document.getElementById("approvalModal").addEventListener("click", event => {
            if (event.target.id === "approvalModal") closeModal();
        });

        document.querySelectorAll("[data-status]").forEach(button => {
            button.addEventListener("click", () => {
                answer.status = button.dataset.status;
                document.querySelectorAll("[data-status]").forEach(item => item.classList.remove("selected"));
                button.classList.add("selected");
                document.getElementById("commentArea").classList.toggle("show", answer.status === "CON CAMBIOS");
                document.getElementById("errorMessage").textContent = "";
                save();
            });
        });

        document.getElementById("comment")?.addEventListener("input", event => {
            answer.comment = event.target.value;
            save();
        });

        document.getElementById("confirmNext").addEventListener("click", () => {
            const error = document.getElementById("errorMessage");

            if (!answer.status) {
                error.textContent = "Selecciona una opción para continuar.";
                return;
            }

            if (answer.status === "CON CAMBIOS" && !answer.comment.trim()) {
                error.textContent = "Escribe brevemente qué debemos cambiar.";
                document.getElementById("comment").focus();
                return;
            }

            if (current === posts.length - 1) {
                save();
                renderFinal();
                return;
            }

            current++;
            save();
            renderPost();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function openModal() {
        const modal = document.getElementById("approvalModal");
        modal.hidden = false;
        document.body.classList.add("modal-open");
        setTimeout(() => modal.classList.add("show"), 10);
    }

    function closeModal() {
        const modal = document.getElementById("approvalModal");
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
        setTimeout(() => { modal.hidden = true; }, 180);
    }

    function setupCarousel() {
        const carousel = document.querySelector("[data-carousel]");
        if (!carousel) return;

        const track = carousel.querySelector(".carousel-track");
        const images = [...track.querySelectorAll("img")];
        const dots = [...carousel.querySelectorAll(".dot")];
        let imageIndex = 0;

        const showImage = index => {
            imageIndex = (index + images.length) % images.length;
            track.scrollTo({ left: track.clientWidth * imageIndex, behavior: "smooth" });
            dots.forEach((dot, i) => dot.classList.toggle("active", i === imageIndex));
        };

        dots.forEach((dot, i) => dot.addEventListener("click", () => showImage(i)));
        track.addEventListener("scroll", () => {
            const newIndex = Math.round(track.scrollLeft / track.clientWidth);
            if (newIndex !== imageIndex) {
                imageIndex = newIndex;
                dots.forEach((dot, i) => dot.classList.toggle("active", i === imageIndex));
                }
        });
    }

    function renderFinal() {
        document.body.classList.remove("modal-open");
        stepText.textContent = "Revisión terminada";
        progressBar.style.width = "100%";

        const approved = answers.filter(item => item.status === "APROBADO").length;
        const changes = answers.length - approved;

        content.innerHTML = `
            <section class="final-card">
                <div class="final-icon">✓</div>
                <h2>¡Revisión terminada!</h2>
                <p>Ya revisaste las ${posts.length} publicaciones.</p>
                <div class="simple-summary">
                    <div><strong>${approved}</strong><span>Aprobadas</span></div>
                    <div><strong>${changes}</strong><span>Con cambios</span></div>
                </div>
                <button class="whatsapp" id="sendBtn" type="button">Enviar respuesta por WhatsApp</button>
                <button class="secondary full" id="reviewAgain" type="button">Volver a revisar</button>
            </section>`;

        document.getElementById("reviewAgain").addEventListener("click", () => {
            current = 0;
            save();
            renderPost();
        });

        document.getElementById("sendBtn").addEventListener("click", () => {
            const detail = answers.map((answer, index) => {
                const title = `Publicación ${index + 1} - ${posts[index].diaSemana}`;
                const result = answer.status === "APROBADO" ? "APROBADA" : `CAMBIOS: ${answer.comment.trim()}`;
                return `*${title}*\n${result}`;
            }).join("\n\n");

            const message = `*REVISIÓN DE CONTENIDO - ${CONFIG_SEMANAL.cliente.toUpperCase()}*\n\n${detail}`;
            const phone = String(CONFIG_SEMANAL.whatsappDestino || "").replace(/\D/g, "");
            const url = phone
                ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
                : `https://wa.me/?text=${encodeURIComponent(message)}`;

            window.open(url, "_blank", "noopener");
        });
    }

    if (posts.length) renderPost();
});
