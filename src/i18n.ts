import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import translationCS from 'locales/cs/translation.json'
import translationEN from 'locales/en/translation.json'


i18n.use(initReactI18next).init({
  lng: 'cs',
  resources: {
    cs: {
      translation: translationCS
    },
    en: {
      translation: translationEN
    },
  }
});

export default i18n