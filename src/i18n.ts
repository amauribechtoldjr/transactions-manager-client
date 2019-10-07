import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_br from './translations/pt-br.json';
import en_us from './translations/en-us.json';

const resources = {
  pt_br,
  en_us,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_us',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
