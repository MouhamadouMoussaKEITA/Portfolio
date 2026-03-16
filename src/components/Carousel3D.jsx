import React, { useEffect, useRef, useState, useCallback } from 'react';

const Carousel3D = ({ projects }) => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(null); // 'next' | 'prev'
  const [animating, setAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const timeoutRef = useRef();
  const total = projects.length;

  const go = useCallback((direction) => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    setTimeout(() => {
      setCurrent(prev =>
        direction === 'next'
          ? (prev + 1) % total
          : (prev - 1 + total) % total
      );
      setAnimating(false);
      setDir(null);
    }, 600);
  }, [animating, total]);

  useEffect(() => {
    if (showModal) return;
    timeoutRef.current = setTimeout(() => go('next'), 4200);
    return () => clearTimeout(timeoutRef.current);
  }, [current, showModal, go]);

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <>
      <style>{`
        .c3d-root {
          width: 100%;
          max-width: var(--container-max, 1120px);
          margin: 0 auto;
          padding: 0 var(--container-padding, 2rem);
        }

        /* ── Track ── */
        .c3d-track {
          display: grid;
          grid-template-columns: 1fr 1.55fr 1fr;
          gap: 1.5rem;
          align-items: center;
          width: 100%;
          perspective: 1400px;
        }

        /* ── Side cards ── */
        .c3d-side {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(201, 123, 58, 0.1);
          background: rgba(16, 14, 12, 0.75);
          backdrop-filter: blur(12px);
          aspect-ratio: 3/4;
          position: relative;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.4s ease,
                      opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.55;
          transform: rotateY(12deg) scale(0.94);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .c3d-side-right {
          transform: rotateY(-12deg) scale(0.94);
        }
        .c3d-side:hover {
          opacity: 0.78;
          border-color: rgba(201, 123, 58, 0.28);
          box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 16px rgba(201,123,58,0.12);
        }
        .c3d-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: sepia(0.1) brightness(0.72) contrast(1.05);
          transition: filter 0.35s ease;
        }
        .c3d-side:hover img {
          filter: sepia(0.05) brightness(0.82) contrast(1.05);
        }
        /* Side card label */
        .c3d-side-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1.25rem 1.1rem;
          background: linear-gradient(to top, rgba(8,7,6,0.92) 60%, transparent);
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 400;
          color: rgba(245, 239, 232, 0.7);
          text-align: center;
          letter-spacing: 0.02em;
          pointer-events: none;
        }

        /* ── Center card ── */
        .c3d-center {
          border-radius: 16px;
          background: rgba(16, 14, 12, 0.88);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(201, 123, 58, 0.22);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.6),
            0 0 0 1px rgba(201,123,58,0.08),
            inset 0 1px 0 rgba(255,255,255,0.04);
          overflow: hidden;
          transform: rotateY(0deg) scale(1);
          transition: box-shadow 0.42s ease;
          position: relative;
        }
        /* Top copper shimmer line */
        .c3d-center::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(201,123,58,0.5) 30%,
            rgba(45,156,170,0.4) 70%,
            transparent 100%
          );
        }

        .c3d-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          position: relative;
        }
        .c3d-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(14,12,10,0.9), transparent);
          pointer-events: none;
        }
        .c3d-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: sepia(0.06) contrast(1.04);
          transition: transform 0.7s ease, filter 0.4s ease;
        }
        .c3d-center:hover .c3d-img-wrap img {
          transform: scale(1.03);
        }

        /* Center body */
        .c3d-body {
          padding: 1.75rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .c3d-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .c3d-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.7rem;
          border-radius: 2px;
          background: rgba(201,123,58,0.08);
          color: var(--accent-secondary, #e8b97e);
          border: 1px solid rgba(201,123,58,0.18);
          transition: background 0.2s, border-color 0.2s;
        }
        .c3d-tag:nth-child(3n+2) {
          background: rgba(45,156,170,0.08);
          color: #5ec9d4;
          border-color: rgba(45,156,170,0.18);
        }

        .c3d-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.65rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary, #f5efe8);
          margin: 0;
        }

        .c3d-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-secondary, #b8a99a);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .c3d-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }
        .c3d-btn-demo {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.6rem 1.25rem;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #c97b3a 0%, #e8b97e 100%);
          color: #0d0c0b;
          font-weight: 400;
          box-shadow: 0 4px 16px rgba(201,123,58,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .c3d-btn-demo:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(201,123,58,0.38);
        }
        .c3d-btn-code {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.6rem 1.25rem;
          border-radius: 2px;
          background: rgba(45,156,170,0.08);
          color: #5ec9d4;
          border: 1px solid rgba(45,156,170,0.22);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .c3d-btn-code:hover {
          background: rgba(45,156,170,0.15);
          border-color: rgba(45,156,170,0.4);
          transform: translateY(-1px);
          color: #7dd8e0;
        }

        /* ── Nav controls ── */
        .c3d-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .c3d-arrow {
          width: 40px;
          height: 40px;
          border-radius: 2px;
          background: rgba(201,123,58,0.06);
          border: 1px solid rgba(201,123,58,0.18);
          color: var(--accent-secondary, #e8b97e);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
        }
        .c3d-arrow:hover {
          background: rgba(201,123,58,0.14);
          border-color: rgba(201,123,58,0.38);
          color: var(--accent-primary, #c97b3a);
          transform: scale(1.08);
        }

        .c3d-dots {
          display: flex;
          gap: 0.55rem;
          align-items: center;
        }
        .c3d-dot {
          width: 20px;
          height: 2px;
          border-radius: 1px;
          background: rgba(255,255,255,0.1);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          border: none;
          padding: 0;
        }
        .c3d-dot.active {
          width: 32px;
          background: linear-gradient(90deg, var(--accent-primary, #c97b3a), var(--accent-teal, #2d9caa));
        }
        .c3d-dot:hover:not(.active) {
          background: rgba(201,123,58,0.35);
        }

        /* ── Slide animation ── */
        .c3d-track.animating-next .c3d-center {
          animation: slideLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .c3d-track.animating-prev .c3d-center {
          animation: slideRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes slideLeft {
          0%   { transform: translateX(0)    scale(1);    opacity: 1; }
          30%  { transform: translateX(-28px) scale(0.97); opacity: 0.5; }
          60%  { transform: translateX( 10px) scale(0.99); opacity: 0.85; }
          100% { transform: translateX(0)    scale(1);    opacity: 1; }
        }
        @keyframes slideRight {
          0%   { transform: translateX(0)    scale(1);    opacity: 1; }
          30%  { transform: translateX( 28px) scale(0.97); opacity: 0.5; }
          60%  { transform: translateX(-10px) scale(0.99); opacity: 0.85; }
          100% { transform: translateX(0)    scale(1);    opacity: 1; }
        }

        /* ── Modal ── */
        .c3d-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 4, 3, 0.88);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .c3d-modal-box {
          background: rgba(16,14,12,0.97);
          border: 1px solid rgba(201,123,58,0.2);
          border-radius: 12px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.75);
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          overflow: hidden;
        }
        .c3d-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: rgba(201,123,58,0.12);
          border: 1px solid rgba(201,123,58,0.25);
          color: var(--accent-secondary, #e8b97e);
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          font-family: 'Space Mono', monospace;
        }
        .c3d-modal-close:hover {
          background: rgba(201,123,58,0.25);
          color: var(--accent-primary, #c97b3a);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .c3d-track {
            grid-template-columns: 1fr;
          }
          .c3d-side { display: none; }
        }
        @media (max-width: 600px) {
          .c3d-body { padding: 1.25rem 1.25rem 1.5rem; }
          .c3d-title { font-size: 1.35rem; }
        }
      `}</style>

      <div className="c3d-root">
        {/* Track */}
        <div className={`c3d-track${animating && dir ? ` animating-${dir}` : ''}`}>

          {/* Left side card */}
          <div
            className="c3d-side"
            onClick={() => go('prev')}
            aria-label="Projet précédent"
          >
            <img src={projects[prevIdx].image} alt={projects[prevIdx].title} />
            <div className="c3d-side-label">{projects[prevIdx].title}</div>
          </div>

          {/* Center card */}
          <div className="c3d-center">
            <div className="c3d-img-wrap">
              <img src={projects[current].image} alt={projects[current].title} />
            </div>
            <div className="c3d-body">
              <div className="c3d-tags-row">
                {projects[current].tags.map(tag => (
                  <span key={tag} className="c3d-tag">{tag}</span>
                ))}
              </div>
              <h3 className="c3d-title">{projects[current].title}</h3>
              <p className="c3d-desc">{projects[current].desc}</p>
              <div className="c3d-actions">
                {projects[current].demo && projects[current].demo !== '#' && (
                  <button
                    className="c3d-btn-demo"
                    onClick={() => { setModalUrl(projects[current].demo); setShowModal(true); }}
                  >
                    ↗ Démo
                  </button>
                )}
                {projects[current].github && (
                  <a
                    href={projects[current].github}
                    target="_blank"
                    rel="noreferrer"
                    className="c3d-btn-code"
                  >
                    ⌥ Code
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right side card */}
          <div
            className="c3d-side c3d-side-right"
            onClick={() => go('next')}
            aria-label="Projet suivant"
          >
            <img src={projects[nextIdx].image} alt={projects[nextIdx].title} />
            <div className="c3d-side-label">{projects[nextIdx].title}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="c3d-nav">
          <button className="c3d-arrow" onClick={() => go('prev')} aria-label="Précédent">
            ←
          </button>
          <div className="c3d-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`c3d-dot${i === current ? ' active' : ''}`}
                onClick={() => {
                  if (i === current || animating) return;
                  setDir(i > current ? 'next' : 'prev');
                  setAnimating(true);
                  clearTimeout(timeoutRef.current);
                  setTimeout(() => {
                    setCurrent(i);
                    setAnimating(false);
                    setDir(null);
                  }, 600);
                }}
                aria-label={`Aller au projet ${i + 1}`}
              />
            ))}
          </div>
          <button className="c3d-arrow" onClick={() => go('next')} aria-label="Suivant">
            →
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="c3d-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="c3d-modal-box" onClick={e => e.stopPropagation()}>
            <button className="c3d-modal-close" onClick={() => setShowModal(false)}>×</button>
            <iframe
              src={modalUrl}
              title="Démo"
              style={{ width: '70vw', height: '80vh', border: 'none', borderRadius: 11, display: 'block' }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel3D;
