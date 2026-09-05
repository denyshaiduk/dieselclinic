// ВАЖЛИВО: цей токен потрапляє у публічний JS-бандл сайту (client-side),
// тому будь-хто може його прочитати через "Переглянути код сторінки".
// Ризик: третя особа зможе надсилати повідомлення через цього бота у вказаний чат (спам),
// але не зможе читати чужі дані чи керувати іншими ботами/акаунтами.
// Рекомендація: коли з'явиться можливість, перенести відправку в серверний proxy
// (наприклад, Cloudflare Worker/Netlify Function), щоб токен не потрапляв у браузер.
export const TELEGRAM_BOT_TOKEN = '8757538500:AAH6yssc7iav3z9ZAFzZuP1kijWEc_ob1BY'
export const TELEGRAM_CHAT_ID = '-5553929945'

export const SITE_URL = 'https://dieselclinic.com.ua'
export const PHONE_NUMBER = '+380681866888'
export const PHONE_DISPLAY = '+380 (68) 186-68-88'
