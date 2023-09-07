// plugins/vue-i18n.js
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en', // Set your desired locale
  messages: {
    en: {
      currency: {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      }
    }
  }
});

export default i18n;
