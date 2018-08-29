import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n
  .use(XHR)
  .init({
    fallbackLng: 'en',
    // wait: true, // globally set to wait for loaded translations in translate hoc

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    detection: {
      order: ['localStorage']
    },

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });


export default i18n;
