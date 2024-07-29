/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
  },
  localePath: require('path').resolve('./resources/languages'),
  ns: ['common'],
};
