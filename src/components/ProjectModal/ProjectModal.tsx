import { useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import type { Project } from '../../types/project'
import styles from './ProjectModal.module.css'

// Lazy-load the viewer so 3D assets never load until modal opens
const ModelViewer3D = lazy(() => import('../ModelViewer3D/ModelViewer3D'))

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Fullscreen on the panel — keeps all CSS effects intact
  const handleFullscreen = () => {
    const el = panelRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Visor 3D: ${project.title}`}
    >
      <div className={styles.panel} ref={panelRef}>

        {/* Floating overlay — title + controls */}
        <div className={styles.overlay}>
          <span className={styles.title}>{project.title}</span>
          <div className={styles.overlayActions}>
            <button
              className={styles.overlayBtn}
              onClick={handleFullscreen}
              aria-label="Pantalla completa"
              title="Pantalla completa"
            >
              ⛶
            </button>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Cerrar visor"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Viewer — fills the entire panel */}
        <div className={styles.viewerWrapper}>
          {project.viewer ? (
            <Suspense
              fallback={
                <div className={styles.loading}>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>Cargando modelo 3D…</span>
                </div>
              }
            >
              <ModelViewer3D config={project.viewer} title={project.title} />
            </Suspense>
          ) : (
            <div className={styles.noViewer}>
              No hay visor configurado para este proyecto.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
