import { useEffect, useRef } from 'react'
import type { ViewerConfig } from '../../types/project'
import styles from './ModelViewer3D.module.css'

interface Props {
  config: ViewerConfig
  title: string
}

/**
 * ModelViewer3D — renders the correct 3D viewer based on viewerType.
 * Only mounted when the modal opens (lazy), so no assets load before user interaction.
 */
export default function ModelViewer3D({ config, title }: Props) {
  if (config.viewerType === 'modelviewer' || config.viewerType === 'glb') {
    return <NativeModelViewer config={config} title={title} />
  }

  if (config.viewerType === 'sketchfab') {
    return (
      <iframe
        className={styles.viewer}
        title={title}
        src={`https://sketchfab.com/models/${config.modelId}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0`}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
      />
    )
  }

  if (config.viewerType === 'aframe') {
    return (
      <iframe
        className={styles.viewer}
        title={title}
        src={config.src}
        allowFullScreen
        loading="lazy"
      />
    )
  }

  return <div className={styles.unsupported}>Visor no disponible</div>
}

/**
 * Renders <model-viewer> by injecting it into the DOM imperatively via useEffect.
 * This avoids React's custom element handling issues and ensures @google/model-viewer
 * is fully registered before the element is created.
 */
function NativeModelViewer({
  config,
  title,
}: {
  config: Extract<ViewerConfig, { viewerType: 'modelviewer' | 'glb' }>
  title: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Dynamically import to ensure the custom element is registered first
    import('@google/model-viewer').then(() => {
      const mv = document.createElement('model-viewer')

      mv.setAttribute('src', config.src)
      mv.setAttribute('alt', title)
      mv.setAttribute('camera-controls', '')
      mv.setAttribute('auto-rotate', '')
      mv.setAttribute('shadow-intensity', '1.2')
      mv.setAttribute('exposure', '1.1')
      mv.setAttribute('environment-image', 'neutral')
      mv.setAttribute('tone-mapping', 'commerce')
      mv.setAttribute('interpolation-decay', '200')

      if ('poster' in config && config.poster) {
        mv.setAttribute('poster', config.poster)
      }

      mv.style.width = '100%'
      mv.style.height = '100%'
      mv.style.backgroundColor = 'transparent'
      mv.style.display = 'block'

      container.appendChild(mv)
    })

    return () => {
      // Cleanup on unmount
      if (container) container.innerHTML = ''
    }
  }, [config, title])

  return <div ref={containerRef} className={styles.modelViewerContainer} />
}
