import { createI18n } from 'vue-i18n'

import enMessage from './en'
import viMessage from './vi'

export const i18n = createI18n({
    locale: 'vi',
    messages: {
        en: enMessage,
        vi: viMessage
    }
})