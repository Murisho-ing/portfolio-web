import { useState } from 'react'
import { portfolioData } from '../../data/portfolio'
import styles from './Footer.module.css'

const EMAIL = 'dmurilloneme@gmail.com'

export default function Footer() {
  const { footer } = portfolioData
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          {footer.logo}
        </a>

        <p className={styles.copyright}>{footer.copyright}</p>

        <div className={styles.links}>
          {footer.links.map(link => {
            if (link.label === 'Correo') {
              return (
                <button
                  key={link.label}
                  className={`${styles.link} ${styles.copyBtn}`}
                  onClick={handleCopyEmail}
                  title={copied ? '¡Copiado!' : EMAIL}
                  aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
                >
                  {copied ? '¡Copiado!' : link.label}
                </button>
              )
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
