import {useI18n} from 'vue-i18n'
import {accessPhoneNumberCodes} from '@/constants/index.js'

export function useValidator() {
    const {t} = useI18n()
    const requiredField = {
        required: true,
        message: t('validations.required_field'),
        trigger: 'blur'
    }

    const phoneNumberValidator = {
        validator: (_rule, value) => {
            if (!value) {
                return Promise.reject(t('validations.required_field'))
            }
            if (value && value.length !== 12) {
                return Promise.reject(
                    t('validations.the_phone_number_was_not_entered_completely')
                )
            }

            return Promise.resolve()
        },
        trigger: 'blur'
    }
    return {
        requiredField,
        phoneNumberValidator
    }
}
