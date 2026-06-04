import { useState } from 'react'
import { portfolioData } from '../../data/portfolio'
import { Menu, X } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
  const { header } = portfolioData
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          {header.logo}
        </a>

        {/* Desktop Nav */}
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          {header.nav.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={link.active ? styles.navLinkActive : styles.navLink}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          <a href="#contact" className={`${styles.cta} ${styles.mobileCta}`} onClick={() => setIsOpen(false)}>
            {header.cta}
          </a>
        </nav>

        <div className={styles.rightActions}>
          <a href="#contact" className={`${styles.cta} ${styles.desktopCta}`}>
            {header.cta}
          </a>
          
          <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  )
}
