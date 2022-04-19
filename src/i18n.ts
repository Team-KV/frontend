import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonCS from 'locales/cs/common.json'
import clientsCS from 'locales/cs/clients.json'
import calendarCS from 'locales/cs/calendar.json'


// import commonEN from 'locales/en/common.json'
// import clientsEN from 'locales/en/clients.json'

const resources = {
  cs: {
    common: commonCS,
    clients: clientsCS,
    calendar: calendarCS 
  },
  // en: {
  //   common: commonCS,
  //   clients: clientsCS
  // },
}

i18n.use(initReactI18next).init({
  defaultNS: "common",
  lng: 'cs',
  resources: resources,
  interpolation: {
    escapeValue: false
  }
});

export default i18n