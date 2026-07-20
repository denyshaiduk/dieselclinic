import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check, ChevronRight, CircleGauge, Clock3, Fuel, MapPin, Menu, Navigation, Phone, ShieldCheck, Star, Wrench, X } from 'lucide-react'
import ServicePage from './ServicePage'
import { serviceGroups, servicePages, serviceImages } from './serviceData'
import './App.css'

const services = [
  { number: '01', icon: Fuel, title: 'Дизельні форсунки', text: 'Діагностика, очищення, ремонт та точне регулювання механічних, електромагнітних і п’єзофорсунок Common Rail.', image: serviceImages[0], link: 'remont-forsunok-common-rail' },
  { number: '02', icon: CircleGauge, title: 'Дизельні ПНВТ', text: 'Комплексне відновлення рядних, розподільних і магістральних насосів на професійному обладнанні.', image: serviceImages[1], link: 'magistralni-pnvt-common-rail' },
  { number: '03', icon: Wrench, title: 'Вантажна техніка', text: 'Ремонт паливної апаратури вантажівок MAZ, KAMAZ, MTZ, YuMZ, LSTN, автобусів, спецтехніки та сільськогосподарських машин.', image: serviceImages[3], link: 'remont-vantazhnyh-forsunok' },
]
const advantages = [['Сучасні стенди', 'Точна діагностика за заводськими тест-планами'], ['Гарантія на ремонт', 'Відповідаємо за результат виконаних робіт'], ['Ремонт без затримок', 'Власний склад комплектуючих і досвід майстрів']]
const systems = ['BOSCH', 'DELPHI', 'DENSO', 'SIEMENS VDO', 'STANADYNE', 'COMMON RAIL', 'CUMMINS']
const faq = [
  ['Скільки триває діагностика форсунок?', 'Термін залежить від типу форсунок і стану вузла. Після перевірки ми надаємо акт дефектування, пояснюємо причину несправності та погоджуємо ремонт.'],
  ['Чи надаєте гарантію на ремонт?', 'Так. На виконані ремонтні роботи та встановлені комплектуючі діє гарантія. Ми перевіряємо вузол на стенді перед видачею.'],
  ['Чи працюєте з вантажною та спеціальною технікою?', 'Так, ремонтуємо паливну апаратуру вантажівок, автобусів, тракторів, будівельної та іншої спецтехніки.'],
]
const sectionHref = (id) => `#/?section=${id}`

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const service = servicePages[location.pathname.split('/').filter(Boolean).pop()]

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveDropdown(null)
    setMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!activeDropdown) return
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest('.nav-dropdown')) setActiveDropdown(null)
    }
    document.addEventListener('click', closeOnOutsideClick)
    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [activeDropdown])

  useEffect(() => {
    if (!service) {
      document.title = 'Ремонт дизельних форсунок та ПНВТ в Одесі | Дизель-Клінік'
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Дизель-Клінік в Одесі: діагностика та ремонт дизельних форсунок, ПНВТ і Common Rail. Гарантія на роботи, сучасні стенди, запис за телефоном.')
      const section = new URLSearchParams(location.search).get('section')
      if (section) document.getElementById(section)?.scrollIntoView()
    }
  }, [location.search, service])

  if (service) return <ServicePage service={service} />

  return <main>
    <div className="topline"><div className="container topline-inner"><a href="https://maps.google.com/?q=Промислова+37,+Одеса" target="_blank" rel="noreferrer"><MapPin size={15} /> Промислова 37, Одеса</a><div className="topline-phones"><a href="tel:+380681866888">+380 (68) 186-68-88</a><span></span><a href="tel:+380963438860">+380 (96) 343-88-60</a></div></div></div>
    <header className="header"><div className="container header-inner"><a className="brand" href={sectionHref('top')} aria-label="Diesel Clinic, головна"><span className="brand-mark">D<span>C</span></span><span className="brand-text">DIESEL<br /><b>CLINIC</b></span></a><nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Основна навігація"><div className={activeDropdown === 'injectors' ? 'nav-dropdown is-open' : 'nav-dropdown'}><button type="button" aria-expanded={activeDropdown === 'injectors'} onClick={() => setActiveDropdown(activeDropdown === 'injectors' ? null : 'injectors')}>Дизельні форсунки <ChevronRight size={15} /></button><div className="dropdown-menu">{serviceGroups[0].items.map((item) => <Link to={`/posluhy/${item.slug}`} onClick={() => { setMenuOpen(false); setActiveDropdown(null) }} key={item.slug}>{item.title}</Link>)}</div></div><div className={activeDropdown === 'pumps' ? 'nav-dropdown is-open' : 'nav-dropdown'}><button type="button" aria-expanded={activeDropdown === 'pumps'} onClick={() => setActiveDropdown(activeDropdown === 'pumps' ? null : 'pumps')}>Ремонт ПНВТ <ChevronRight size={15} /></button><div className="dropdown-menu">{serviceGroups[1].items.map((item) => <Link to={`/posluhy/${item.slug}`} onClick={() => { setMenuOpen(false); setActiveDropdown(null) }} key={item.slug}>{item.title}</Link>)}</div></div><a href={sectionHref('process')} onClick={() => setMenuOpen(false)}>Як ми працюємо</a><a href={sectionHref('contacts')} onClick={() => setMenuOpen(false)}>Контакти</a></nav><a className="button button-dark header-cta" href="tel:+380963438860"><Phone size={15} /> Подзвонити</a><button className="menu-button" type="button" aria-label="Відкрити меню" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div></header>
    <section className="hero" id="top"><div className="hero-image" role="img" aria-label="Ремонт дизельної паливної системи" /><div className="hero-overlay" /><div className="container hero-content"><div className="eyebrow"><span /> Дизельний сервіс в Одесі</div><h1>Паливна система<br /><em>працює бездоганно.</em></h1><p className="hero-copy">Професійна діагностика та ремонт дизельних форсунок і ПНВТ для легкових авто, вантажівок та спецтехніки.</p><div className="hero-actions"><a className="button button-accent" href="tel:+380963438860"><Phone size={18} /> Подзвонити зараз <ArrowRight size={18} /></a><a className="hero-phone" href="tel:+380681866888"><Phone size={18} /> +380 (68) 186-68-88</a></div></div><div className="hero-panel"><div><strong>25+</strong><span>років досвіду</span></div><div><strong>100%</strong><span>гарантія робіт</span></div><div><strong>EURO 1-6</strong><span>усі покоління</span></div></div></section>
    <section className="trust-strip"><div className="container trust-inner"><p><BadgeCheck size={20} /> Сертифіковане обладнання <b>BOSCH · DELPHI · DENSO</b></p><p><Clock3 size={20} /> Попередній запис без черг</p><div className="trust-rating"><Star size={15} fill="currentColor" /> <b>Професійна діагностика</b><span>з гарантією результату</span></div></div></section>
    <section className="services section" id="services"><div className="container"><div className="section-heading"><div><p className="kicker">Наші послуги</p><h2>Точність у кожній<br />деталі паливної системи</h2></div><p>Діагностуємо причину несправності, погоджуємо вартість і виконуємо ремонт відповідно до технічних вимог виробника.</p></div><div className="service-grid">{services.map(({ number, icon: Icon, title, text, image, link }) => <article className="service-card" key={number}><div className="service-card-image" style={{ backgroundImage: `url(${image})` }} role="img" aria-label={title} /><div className="service-head"><Icon size={28} strokeWidth={1.5} /><span>{number}</span></div><h3>{title}</h3><p>{text}</p><div className="service-actions"><Link to={`/posluhy/${link}`} aria-label={`Детальніше про ${title}`}>Детальніше <ChevronRight size={18} /></Link><a className="card-call" href="tel:+380963438860" aria-label={`Зателефонувати щодо ${title}`}><Phone size={16} /> Подзвонити</a></div></article>)}</div></div></section>
    <section className="reason" id="about"><div className="reason-photo" role="img" aria-label="Майстер проводить діагностику двигуна" /><div className="reason-content"><p className="kicker">Чому Diesel Clinic</p><h2>Ремонт, якому<br /><em>можна довіряти.</em></h2><p className="reason-intro">Ми не маскуємо проблему. Наші майстри знаходять причину несправності, відновлюють вузол і перевіряють результат на стенді.</p><div className="advantage-list">{advantages.map(([title, text]) => <div key={title}><Check size={18} /><p><b>{title}</b>{text}</p></div>)}</div><a className="text-link" href="tel:+380963438860"><Phone size={16} /> Подзвонити майстру</a></div></section>
    <section className="systems"><div className="container systems-inner"><p>Працюємо з паливними системами</p><div>{systems.map((system) => <span key={system}>{system}</span>)}</div></div></section>
    <section className="quick-call"><div className="container quick-call-inner"><div><p className="kicker kicker-light">Потрібна швидка відповідь?</p><h2>Майстер на зв’язку.<br /><em>Опишіть симптоми.</em></h2></div><div><p>Зателефонуйте зараз: підкажемо, з чого почати діагностику та чи можна продовжувати рух.</p><a className="button button-accent" href="tel:+380963438860"><Phone size={18} /> Подзвонити майстру</a><a className="quick-number" href="tel:+380681866888">+380 (68) 186-68-88</a></div></div></section>
    <section className="process section" id="process"><div className="container"><div className="section-heading compact"><div><p className="kicker">Прозорий процес</p><h2>Як ми працюємо</h2></div><p>Ви знаєте стан паливної системи та вартість ремонту до початку робіт.</p></div><ol className="process-grid"><li><span>01</span><h3>Заявка</h3><p>Зателефонуйте або залиште номер для запису.</p></li><li><span>02</span><h3>Діагностика</h3><p>Перевіряємо вузол і визначаємо точну причину.</p></li><li><span>03</span><h3>Погодження</h3><p>Надаємо акт дефектування та кошторис.</p></li><li><span>04</span><h3>Результат</h3><p>Ремонтуємо, тестуємо та надаємо гарантію.</p></li></ol></div></section>
    <section className="faq section"><div className="container faq-inner"><div><p className="kicker">Відповідаємо чесно</p><h2>Питання, які<br />ставлять найчастіше</h2><p>Не знайшли відповідь? Майстер проконсультує по телефону.</p><a className="text-link" href="tel:+380963438860"><Phone size={16} /> Зателефонувати зараз</a></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronRight size={19} /></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="request" id="request"><div className="container request-inner"><div><p className="kicker kicker-light">Дзвоніть прямо зараз</p><h2>Майстер відповість<br />і запише вас <em>сьогодні.</em></h2><p>Зателефонуйте — підкажемо терміни ремонту та орієнтовну вартість ще до приїзду в сервіс.</p></div><div className="cta-phones"><a className="cta-phone-btn" href="tel:+380963438860"><Phone size={22} /> <span>+380 (96) 343-88-60</span></a><a className="cta-phone-btn cta-phone-btn-alt" href="tel:+380681866888"><Phone size={22} /> <span>+380 (68) 186-68-88</span></a><div className="cta-note"><ShieldCheck size={18} /> Гарантія на всі види робіт</div></div></div></section>
    <footer id="contacts"><div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark">D<span>C</span></span><span className="brand-text">DIESEL<br /><b>CLINIC</b></span></div><div className="footer-place"><b>Промислова 37, Одеса</b><span>Пн–Пт: 09:00–18:00</span></div><div className="footer-links"><a href="tel:+380963438860"><Phone size={15} /> +380 (96) 343-88-60</a><a href="tel:+380681866888"><Phone size={15} /> +380 (68) 186-68-88</a></div><div className="footer-actions"><a className="footer-call" href="tel:+380963438860"><Phone size={16} /> Подзвонити</a><a className="footer-route" href="https://maps.google.com/?q=Промислова+37,+Одеса" target="_blank" rel="noreferrer"><Navigation size={16} /> Маршрут</a></div><span className="copyright">© Diesel Clinic, 2026</span></div></footer><a className="call-float" href="tel:+380963438860" aria-label="Зателефонувати" title="Зателефонувати"><Phone size={21} /></a>
  </main>
}
export default App
