// Хелпери для GA4/Google Ads. Події можна імпортувати як конверсію в Google Ads
// (Tools > Conversions > + New > Google Analytics) без будь-яких додаткових ID.
const pushEvent = (eventName, params) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

export const trackPhoneClick = (source) => {
  pushEvent('generate_lead', { method: 'phone_call', lead_source: source, currency: 'UAH', value: 1 })
}

export const trackCallbackForm = (source) => {
  pushEvent('generate_lead', { method: 'callback_form', lead_source: source, currency: 'UAH', value: 1 })
}
