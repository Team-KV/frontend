import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonCS from 'locales/cs/common.json'
import clientsCS from 'locales/cs/clients.json'
import calendarCS from 'locales/cs/calendar.json'
import exercisesCS from 'locales/cs/exercises.json'
import dashboardCS from 'locales/cs/dashboard.json'

import commonEN from 'locales/en/common.json'
import clientsEN from 'locales/en/clients.json'
import calendarEN from 'locales/en/calendar.json'
import exercisesEN from 'locales/en/exercises.json'
import dashboardEN from 'locales/en/dashboard.json'

const resources = {
  cs: {
    common: commonCS,
    clients: clientsCS,
    calendar: calendarCS,
    exercises: exercisesCS,
    dashboard: dashboardCS,
  },
  en: {
    common: commonEN,
    clients: clientsEN,
    calendar: calendarEN,
    exercises: exercisesEN,
    dashboard: dashboardEN,
  },
}

let locale = localStorage.getItem('locale')
if(!locale) {
  locale = 'cs'
  localStorage.setItem('locale', 'cs');
}

i18n.use(initReactI18next).init({
  defaultNS: "common",
  lng: locale,
  resources: resources,
  interpolation: {
    escapeValue: false
  }
});

export default i18n