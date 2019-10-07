import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_br from './translations/pt-br.json';
import en_us from './translations/en-us.json';

let resources = {};

resources = {
  pt_br,
  en_us,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt_br',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
