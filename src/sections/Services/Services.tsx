import { portfolioData } from '../../data/portfolio'
import { Box, Code, Smartphone, PenTool } from 'lucide-react'
import styles from './Services.module.css'

export default function Services() {
  const { services } = portfolioData

  return (
    <section className={styles.section} id="services">

      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{services.title}</h2>
          <p className={styles.subtitle}>{services.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {services.list.map((srv, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconBox}>
                {idx === 0 && <Box size={24} color="#FFB580" />}
                {idx === 1 && <Code size={24} color="#00A5D9" />}
                {idx === 2 && <Smartphone size={24} color="#8D42FF" />}
                {idx === 3 && <PenTool size={24} color="#A04100" />}
              </div>
              <h3 className={styles.cardTitle}>{srv.title}</h3>
              <p className={styles.cardText}>{srv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
