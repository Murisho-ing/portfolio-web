// ============================================================
// Project types — extensible viewer architecture
// ============================================================

export type ViewerType = 'sketchfab' | 'aframe' | 'modelviewer' | 'glb'

export interface SketchfabViewer {
  viewerType: 'sketchfab'
  /** Sketchfab model ID — the hash from the URL: sketchfab.com/3d-models/xxx-<ID> */
  modelId: string
}

export interface AFrameViewer {
  viewerType: 'aframe'
  src: string
}

export interface ModelViewerConfig {
  viewerType: 'modelviewer'
  src: string
  poster?: string
}

export interface GlbViewer {
  viewerType: 'glb'
  src: string
}

export type ViewerConfig =
  | SketchfabViewer
  | AFrameViewer
  | ModelViewerConfig
  | GlbViewer

export interface ProjectTag {
  label: string
  color: string
}

export interface Project {
  title: string
  tags: ProjectTag[]
  text: string
  image: string
  /** Present only for 3D projects */
  viewer?: ViewerConfig
}
