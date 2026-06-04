import { portfolioData } from '../../data/portfolio'
import { useContactForm } from '../../hooks/useContactForm'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import styles from './CTA.module.css'

export default function CTA() {
  const { cta } = portfolioData
  const { form, status, serverMessage, onSubmit } = useContactForm()

  const { register, formState: { errors } } = form

  return (
    <section className={styles.section} id="contact">
      <div className={styles.glowContainer}>
        <div className={styles.glowCyan}></div>
        <div className={styles.glowPeach}></div>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>👋</div>
        <h2 className={styles.title}>{cta.title}</h2>
        <p className={styles.description}>{cta.description}</p>

        {/* Toast feedback */}
        {(status === 'success' || status === 'error') && (
          <div className={`${styles.toast} ${status === 'success' ? styles.toastSuccess : styles.toastError}`}>
            {status === 'success'
              ? <CheckCircle size={18} />
              : <AlertCircle size={18} />
            }
            <span>{serverMessage}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Tu nombre"
              {...register('name')}
            />
            {errors.name && (
              <span className={styles.fieldError}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="tu@email.com"
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="¿De qué trata tu proyecto?"
              {...register('message')}
            ></textarea>
            {errors.message && (
              <span className={styles.fieldError}>{errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <span className={styles.submitBtnContent}>
                <Loader2 size={18} className={styles.spinner} />
                Enviando...
              </span>
            ) : (
              cta.button
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
