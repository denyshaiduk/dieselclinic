import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, MapPin, Menu, Phone, ShieldCheck, Wrench, X } from 'lucide-react'
import { serviceBenefits, serviceGroups, workshopSteps } from './serviceData'

function ServicePage({ service }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const Icon = service.icon

  useEffect(() => {
    setActiveDropdown(null)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!activeDropdown) return
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest('.nav-dropdown')) setActiveDropdown(null)
    }
    document.addEventListener('click', closeOnOutsideClick)
    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [activeDropdown])

  useEffect(() => {
    document.title = `${service.title} в Одесі | Дизель-Клінік`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${service.description} Дизель-Клінік, Одеса: сучасне обладнання, гарантія та запис за телефоном.`)
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', service.keywords)

    const schema = document.createElement('script')
    schema.id = 'service-schema'
    schema.type = 'application/ld+json'
    schema.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, areaServed: 'Одеса та Одеська область', provider: { '@type': 'AutoRepair', name: 'Дизель-Клінік', telephone: '+380963438860', address: { '@type': 'PostalAddress', streetAddress: 'Промислова 37', addressLocality: 'Одеса', addressCountry: 'UA' } } })
    document.head.querySelector('#service-schema')?.remove()
    document.head.append(schema)

    return () => schema.remove()
  }, [service])

  const serviceFaq = [
    [`Коли потрібен ${service.title.toLowerCase()}?`, `Зверніться на діагностику, якщо ви помітили: ${service.symptoms.join(', ')}. Точну причину визначимо на стенді.`],
    [`Що входить у ${service.title.toLowerCase()}?`, `Ми виконуємо: ${service.works.join(', ')}. Перелік робіт погоджуємо після дефектування.`],
    ['Чи є гарантія на виконані роботи?', 'Так. Після ремонту перевіряємо вузол у робочих режимах та надаємо гарантію на виконані роботи й комплектуючі.'],
  ]

  return <main className="service-page">
    <div className="topline"><div className="container topline-inner"><a href="https://maps.google.com/?q=Промислова+37,+Одеса" target="_blank" rel="noreferrer"><MapPin size={15} /> Промислова 37, Одеса</a><div className="topline-phones"><a href="tel:+380681866888">+380 (68) 186-68-88</a><span></span><a href="tel:+380963438860">+380 (96) 343-88-60</a></div></div></div>
    <header className="header"><div className="container header-inner"><Link className="brand" to="/" aria-label="Diesel Clinic, головна"><span className="brand-mark">D<span>C</span></span><span className="brand-text">DIESEL<br /><b>CLINIC</b></span></Link><nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Основна навігація"><div className={activeDropdown === 'injectors' ? 'nav-dropdown is-open' : 'nav-dropdown'}><button type="button" aria-expanded={activeDropdown === 'injectors'} onClick={() => setActiveDropdown(activeDropdown === 'injectors' ? null : 'injectors')}>Дизельні форсунки <ChevronRight size={15} /></button><div className="dropdown-menu">{serviceGroups[0].items.map((item) => <Link to={`/posluhy/${item.slug}`} onClick={() => { setMenuOpen(false); setActiveDropdown(null) }} key={item.slug}>{item.title}</Link>)}</div></div><div className={activeDropdown === 'pumps' ? 'nav-dropdown is-open' : 'nav-dropdown'}><button type="button" aria-expanded={activeDropdown === 'pumps'} onClick={() => setActiveDropdown(activeDropdown === 'pumps' ? null : 'pumps')}>Ремонт ПНВТ <ChevronRight size={15} /></button><div className="dropdown-menu">{serviceGroups[1].items.map((item) => <Link to={`/posluhy/${item.slug}`} onClick={() => { setMenuOpen(false); setActiveDropdown(null) }} key={item.slug}>{item.title}</Link>)}</div></div><a href="#process" onClick={() => setMenuOpen(false)}>Як ми працюємо</a><a href="#service-request" onClick={() => setMenuOpen(false)}>Контакти</a></nav><a className="button button-dark header-cta" href="tel:+380963438860"><Phone size={15} /> Подзвонити</a><button className="menu-button" type="button" aria-label="Відкрити меню" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div></header>
    <section className="service-hero"><div className="service-hero-image" style={{ backgroundImage: `url(${service.image})` }} /><div className="service-hero-shade" /><div className="container service-hero-content"><div className="breadcrumbs"><Link to="/">Головна</Link><ChevronRight size={14} /><span>{service.group}</span></div><p className="eyebrow"><span /> Дизельний сервіс в Одесі</p><h1>{service.title}<br /><em>з гарантією якості.</em></h1><p>{service.description}</p><div className="hero-actions"><a className="button button-accent" href="tel:+380963438860"><Phone size={18} /> Подзвонити зараз <ArrowRight size={18} /></a><a className="hero-phone" href="tel:+380681866888"><Phone size={18} /> +380 (68) 186-68-88</a></div></div><div className="service-hero-badge"><Icon size={27} /><span>Професійне<br />обладнання</span></div></section>
    <section className="service-intro section"><div className="container service-intro-grid"><div><p className="kicker">Точна діагностика</p><h2>Відновлюємо ресурс,<br />а не маскуємо проблему.</h2></div><div><p>{service.description} Наші майстри працюють за технічною документацією виробників і контролюють параметри вузла на кожному етапі.</p><p className="symptoms-label">Приводи звернутися до сервісу</p><ul>{service.symptoms.map((symptom) => <li key={symptom}><Check size={17} /> {symptom}</li>)}</ul></div></div></section>
    <section className="service-offers"><div className="container"><div className="section-heading"><div><p className="kicker">Що виконуємо</p><h2>Роботи за вашою<br />паливною системою</h2></div><a className="button button-dark service-call" href="tel:+380963438860"><Phone size={17} /> Уточнити по телефону</a></div><div className="offer-grid">{service.works.map((work, index) => <article key={work}><span>0{index + 1}</span><h3>{work}</h3><p>Професійна перевірка та виконання робіт на спеціалізованому обладнанні.</p><a href="tel:+380963438860"><Phone size={15} /> Подзвонити майстру</a></article>)}</div></div></section>
    <section className="service-work" id="process"><div className="container"><div className="section-heading"><div><p className="kicker kicker-light">Етапи роботи</p><h2>Контроль на кожному<br />етапі ремонту</h2></div><p>Ви розумієте, що відбувається з вузлом, за що сплачуєте та який результат отримуєте.</p></div><div className="work-grid">{workshopSteps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="service-benefits section"><div className="container"><p className="kicker">Перевага Diesel Clinic</p><h2>Рішення, на яке можна<br />розраховувати в дорозі.</h2><div className="benefit-grid">{serviceBenefits.map(({ icon: BenefitIcon, title, text }) => <article key={title}><BenefitIcon size={28} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="service-faq section"><div className="container faq-inner"><div><p className="kicker">Важливо знати</p><h2>{service.title}<br />без зайвих питань</h2><p>Майстер пояснить стан вузла та підкаже наступний крок ще до ремонту.</p><a className="text-link" href="tel:+380963438860"><Phone size={16} /> Отримати консультацію</a></div><div className="faq-list">{serviceFaq.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronRight size={19} /></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="related-services"><div className="container"><div><p className="kicker">Інші послуги</p><h2>Паливна система<br />під повним контролем</h2></div><div className="related-list">{serviceGroups.flatMap((group) => group.items).filter((item) => item.slug !== service.slug).slice(0, 5).map((item) => <Link to={`/posluhy/${item.slug}`} key={item.slug}><span>{item.title}</span><ChevronRight size={19} /></Link>)}</div></div></section>
    <section className="request service-request" id="service-request"><div className="container request-inner"><div><p className="kicker kicker-light">Дзвоніть прямо зараз</p><h2>Запишемо вас на<br />{service.title}.</h2><p>Майстер уточнить деталі та запропонує зручний час для діагностики.</p></div><div className="cta-phones"><a className="cta-phone-btn" href="tel:+380963438860"><Phone size={22} /> <span>+380 (96) 343-88-60</span></a><a className="cta-phone-btn cta-phone-btn-alt" href="tel:+380681866888"><Phone size={22} /> <span>+380 (68) 186-68-88</span></a><div className="cta-note"><ShieldCheck size={18} /> Гарантія на всі види робіт</div></div></div></section>
    <footer><div className="container footer-inner"><Link className="brand footer-brand" to="/"><span className="brand-mark">D<span>C</span></span><span className="brand-text">DIESEL<br /><b>CLINIC</b></span></Link><div className="footer-place"><b>Промислова 37, Одеса</b><span>Пн–Пт: 09:00–18:00</span></div><div className="footer-links"><a href="tel:+380963438860"><Phone size={15} /> +380 (96) 343-88-60</a><a href="tel:+380681866888"><Phone size={15} /> +380 (68) 186-68-88</a></div><div className="footer-actions"><a className="footer-call" href="tel:+380963438860"><Phone size={16} /> Подзвонити</a><a className="footer-route" href="https://maps.google.com/?q=Промислова+37,+Одеса" target="_blank" rel="noreferrer"><Wrench size={16} /> Маршрут</a></div><span className="copyright">© Diesel Clinic, 2026</span></div></footer>
  </main>
}

export default ServicePage
