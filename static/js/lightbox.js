// Lightbox: al hacer click en una imagen del artículo se amplía con una
// animación suave (FLIP) y el fondo se oscurece.
document.addEventListener('DOMContentLoaded', () => {
    const SELECTOR = '.post-content img';
    const ZOOM_MS = 340;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    let clone = null;
    let sourceImg = null;
    let target = null;
    let closing = false;

    function fit(natW, natH) {
        const maxW = window.innerWidth * 0.9;
        const maxH = window.innerHeight * 0.9;
        const ratio = Math.min(maxW / natW, maxH / natH);
        const w = natW * ratio;
        const h = natH * ratio;
        return {
            w,
            h,
            left: (window.innerWidth - w) / 2,
            top: (window.innerHeight - h) / 2
        };
    }

    function rectOf(img) {
        const r = img.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
    }

    // Transform para que la imagen pase de "target" (posición final) a "from".
    function flipTransform(from, to) {
        const scaleX = from.width / to.width;
        const scaleY = from.height / to.height;
        const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
        const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
        return `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
    }

    function open(img) {
        if (clone || closing) return;
        sourceImg = img;

        const natW = img.naturalWidth || img.width;
        const natH = img.naturalHeight || img.height;
        if (!natW || !natH) return;

        const source = rectOf(img);
        const f = fit(natW, natH);
        target = { left: f.left, top: f.top, width: f.w, height: f.h };

        clone = document.createElement('img');
        clone.className = 'lightbox-image';
        clone.src = img.currentSrc || img.src;
        clone.alt = img.alt || '';
        clone.style.width = target.width + 'px';
        clone.style.height = target.height + 'px';
        clone.style.left = target.left + 'px';
        clone.style.top = target.top + 'px';
        clone.style.transform = flipTransform(source, target);

        overlay.appendChild(clone);

        // Forzamos un reflow para que la transición se dispare.
        void clone.offsetWidth;

        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-lock');

        requestAnimationFrame(() => {
            clone.style.transform = 'translate(0px, 0px) scale(1, 1)';
        });
    }

    function close() {
        if (!clone || closing) return;
        closing = true;

        const from = rectOf(sourceImg);
        clone.style.transform = flipTransform(from, target);
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-lock');

        const node = clone;
        const done = () => {
            node.remove();
            clone = null;
            sourceImg = null;
            target = null;
            closing = false;
        };
        node.addEventListener('transitionend', done, { once: true });
        // Respaldo por si transitionend no dispara.
        setTimeout(done, ZOOM_MS + 120);
    }

    document.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === clone) {
            close();
            return;
        }
        const img = e.target.closest(SELECTOR);
        if (img) {
            e.preventDefault();
            open(img);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
});
