/* ================================================
   React Vite Environment Declarations
   ================================================ */

/// <reference types="vite/client" />
/// <reference types="@google/model-viewer" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.glb' {
  const src: string
  export default src
}

declare module '*.gltf' {
  const src: string
  export default src
}

// Extend JSX to recognize <model-viewer> as a valid element
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string
      alt?: string
      poster?: string
      'camera-controls'?: boolean | ''
      'auto-rotate'?: boolean | ''
      'shadow-intensity'?: string
      'environment-image'?: string
      exposure?: string
      'tone-mapping'?: string
      style?: React.CSSProperties
    }
  }
}
