import { portfolioData } from '../../data/portfolio'
import profilePhoto from '../../assets/FotodePerfil.jpg'
import styles from './Hero.module.css'

export default function Hero() {
  const { hero } = portfolioData

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.badge}>
            {hero.badge}
          </div>

          <h1 className={styles.title}>
            {hero.title.line1}<br />
            <span className={styles.titleAccent}>{hero.title.line2}</span>
          </h1>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.techStack} aria-label="Tecnologías y herramientas">
            <img src="https://cdn.simpleicons.org/autodeskmaya/6b7280" alt="Maya" className={styles.techIcon} title="Autodesk Maya" />
            <img src="https://cdn.simpleicons.org/blender/6b7280" alt="Blender" className={styles.techIcon} title="Blender" />
            <img src="https://cdn.simpleicons.org/figma/6b7280" alt="Figma" className={styles.techIcon} title="Figma" />
            <img src="https://cdn.simpleicons.org/react/6b7280" alt="React" className={styles.techIcon} title="React" />
            <img src="https://cdn.simpleicons.org/angular/6b7280" alt="Angular" className={styles.techIcon} title="Angular" />
            <a href="https://sketchfab.com/Murisho" target="_blank" rel="noopener noreferrer" className={styles.techIconLink} title="Sketchfab">
              <img src="https://cdn.simpleicons.org/sketchfab/6b7280" alt="Sketchfab" className={styles.techIcon} />
            </a>
            <a href="https://github.com/Murisho-ing" target="_blank" rel="noopener noreferrer" className={styles.techIconLink} title="GitHub">
              <img src="https://cdn.simpleicons.org/github/6b7280" alt="GitHub" className={styles.techIcon} />
            </a>
          </div>

          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryBtn}>{hero.buttons.primary}</a>
            <a
              href="http://localhost:3001/public/Santiago_Murillo_CV.pdf"
              download="Santiago_Murillo_CV.pdf"
              className={styles.secondaryBtn}
            >
              <span className={styles.downloadIcon}>↓</span>
              {hero.buttons.secondary}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.photoContainer}>
            <div className={styles.photoPlaceholder}>
              <img src={profilePhoto} alt="Foto de perfil de Santiago Murillo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
