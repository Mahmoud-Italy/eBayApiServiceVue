import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export const i18n = new VueI18n ({
    local: 'en',
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages: {

        // feel free to add multiple languages as much as you want

        en: {
            //
        },

        es: {
            //
        },
    }
})