import { portfolioData } from '../../data/portfolio'
import { Layout, Terminal, Box } from 'lucide-react'
import styles from './WhatIDoBest.module.css'

export default function WhatIDoBest() {
  const { whatIDo, about, skills } = portfolioData

  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{whatIDo.title}</h2>
          <p className={styles.sectionSubtitle}>{whatIDo.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {/* Row 1: Sobre Mí (7 cols) + Diseño Visual (5 cols) */}
          <div className={styles.aboutCard}>
            <h3 className={styles.aboutTitle}>{about.title}</h3>
            <p className={styles.aboutDesc}>{about.description}</p>
            <div className={styles.aboutTags}>
              {about.tags.map((tag, idx) => {
                const tagClass = idx === 0 
                  ? styles.tagPeach 
                  : idx === 1 
                  ? styles.tagPurple 
                  : styles.tagCyan;
                
                return (
                  <span key={tag} className={`${styles.tag} ${tagClass}`}>{tag}</span>
                );
              })}
            </div>
          </div>

          <div className={styles.visualCard}>
            <div className={styles.cardIconPurple}>
              <Layout size={30} color="#8D42FF" />
            </div>
            <h4 className={styles.cardTitle}>{skills[0].title}</h4>
            <p className={styles.cardDesc}>{skills[0].description}</p>
          </div>

          {/* Row 2: Desarrollo Web (3 cols) + Exp Inmersivas (5 cols) + Icon (4 cols) */}
          <div className={styles.webCard}>
            <div className={styles.cardIconPeach}>
              <Terminal size={26} color="#A04100" />
            </div>
            <h4 className={styles.cardTitle}>{skills[1].title}</h4>
            <p className={styles.cardDesc}>{skills[1].description}</p>
          </div>

          <div className={styles.inmersiveCard}>
            <div className={styles.inmersiveContent}>
              <h4 className={styles.inmersiveTitle}>{skills[2].title}</h4>
              <p className={styles.inmersiveDesc}>{skills[2].description}</p>
              <a href="#projects" className={styles.inmersiveLink}>{skills[2].link}</a>
            </div>
            <div className={styles.iconBoxCyan}>
              <div className={styles.cardIconCyan}>
                <Box size={44} color="#00A5D9" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
