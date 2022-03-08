import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import translations_cs from './cs/translations'


i18n.use(initReactI18next).init({
  lng: 'cs',
  resources: {
    cs: {
      translation: translations_cs
    },
  }
});

export default i18n