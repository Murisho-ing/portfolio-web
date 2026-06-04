import { useState } from 'react'
import { portfolioData } from '../../data/portfolio'
import type { Project } from '../../types/project'
import ProjectModal from '../../components/ProjectModal/ProjectModal'
import styles from './Projects.module.css'

import imgModelado3D from '../../assets/Proyecto Modelado 3D.png'
import imgDesarrolloWeb from '../../assets/Proyecto Desarrollo Web.png'
import imgInterfaces from '../../assets/Proyecto Diseño de Interfaces.png'
import imgMarca from '../../assets/Proyecto Creación de Marca.png'

const projectImages: Record<string, string> = {
  'Modelado 3D': imgModelado3D,
  'Desarrollo Web': imgDesarrolloWeb,
  'Diseño UI/UX': imgInterfaces,
  'Creación de Marca': imgMarca,
}

const tagStyleMap: Record<string, string> = {
  orange: styles.tagOrange,
  outline: styles.tagOutline,
  green: styles.tagGreen,
  purple: styles.tagPurple,
  cyan: styles.tagCyan,
}

function ProjectCard({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false)
  const has3D = Boolean(project.viewer)

  return (
    <>
      <article
        className={`${styles.project} ${has3D ? styles.projectClickable : ''}`}
        onClick={has3D ? () => setModalOpen(true) : undefined}
        role={has3D ? 'button' : undefined}
        tabIndex={has3D ? 0 : undefined}
        onKeyDown={has3D ? (e) => e.key === 'Enter' && setModalOpen(true) : undefined}
        aria-label={has3D ? `Ver modelo 3D: ${project.title}` : undefined}
      >
        <div className={styles.imageBox}>
          <img
            src={projectImages[project.title]}
            alt={project.title}
            className={styles.projectImage}
          />
          {/* 3D badge overlay */}
          {has3D && (
            <div className={styles.badge3D} aria-hidden="true">
              <span className={styles.badge3DIcon}>⬡</span>
              Ver en 3D
            </div>
          )}
        </div>

        <div className={styles.tags}>
          {project.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className={tagStyleMap[tag.color] || styles.tagOutline}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectText}>{project.text}</p>
      </article>

      {/* Modal — only mounts when open, lazy-loads viewer inside */}
      {modalOpen && (
        <ProjectModal
          project={project}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default function Projects() {
  const { projects } = portfolioData

  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{projects.title}</h2>
            <p className={styles.subtitle}>{projects.subtitle}</p>
          </div>
          <button className={styles.viewAllBtn}>{projects.viewAll}</button>
        </div>

        <div className={styles.columnsContainer}>
          <div className={styles.columnView}>
            {[projects.list[0], projects.list[2]].map((project, idx) => (
              <ProjectCard key={`left-${idx}`} project={project} />
            ))}
          </div>

          <div className={`${styles.columnView} ${styles.columnRight}`}>
            {[projects.list[1], projects.list[3]].map((project, idx) => (
              <ProjectCard key={`right-${idx}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
