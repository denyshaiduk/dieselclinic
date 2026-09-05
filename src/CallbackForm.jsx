import { useEffect, useState } from 'react'
import { Phone, ShieldCheck, X } from 'lucide-react'
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, PHONE_DISPLAY } from './config'
import { trackCallbackForm } from './analytics'

function CallbackForm({ open, onClose, source }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!open) return
    setStatus('idle')
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || phone.trim().length < 7) return
    setStatus('sending')
    const text = `Заявка на дзвінок з сайту\nІм'я: ${name.trim()}\nТелефон: ${phone.trim()}\nСторінка: ${source}`
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      })
      if (!response.ok) throw new Error('Telegram request failed')
      trackCallbackForm(source)
      setStatus('success')
      setName('')
      setPhone('')
    } catch {
      setStatus('error')
    }
  }

  return <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="callback-title" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="modal-card">
      <button type="button" className="modal-close" aria-label="Закрити" onClick={onClose}><X size={20} /></button>
      {status === 'success' ? (
        <div className="modal-success">
          <ShieldCheck size={40} />
          <h3>Дякуємо!</h3>
          <p>Ваша заявка прийнята. Майстер зателефонує вам найближчим часом.</p>
          <button type="button" className="button button-accent" onClick={onClose}>Закрити</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 id="callback-title">Замовити дзвінок</h3>
          <p className="modal-subtitle">Залиште номер — майстер передзвонить і підкаже, з чого почати діагностику.</p>
          <label>Ваше ім'я<input type="text" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Ім'я" /></label>
          <label>Телефон<input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" placeholder="+380 (__) ___-__-__" /></label>
          {status === 'error' && <p className="modal-error">Не вдалося надіслати заявку. Зателефонуйте, будь ласка: <a href="tel:+380681866888">{PHONE_DISPLAY}</a></p>}
          <button className="button button-accent" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Надсилаємо…' : 'Замовити дзвінок'}</button>
          <a className="modal-phone-link" href="tel:+380681866888"><Phone size={15} /> Або зателефонуйте: {PHONE_DISPLAY}</a>
        </form>
      )}
    </div>
  </div>
}

export default CallbackForm
