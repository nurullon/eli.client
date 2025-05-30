export const ApiUrls = Object.freeze({
    // Patient
    PATIENT_LOGIN_URL: '/api/patients/login',
    PATIENT_REGISTER_URL: '/api/patients/register',
    VERIFY_EMAIL_URL : '/api/patients/verify-email',
    SEND_OTP_URL: '/api/patients/send-otp',

    //doctors
    DOCTOR_FILTER_URL: '/api/doctors/filter',
    DOCTOR_BY_ID_URL: '/api/doctors/:id',

    //specializations
    SPECIALIZATIONS_URL: '/api/specializations',
    SPECIALIZATIONS_FILTER_URL: '/api/specializations/filter',

    //patients
    PATIENT_URL: '/api/patients',
    PATIENT_BY_ID_URL: '/api/patients/:id',

    //doctor rating
    DOCTOR_RATING_URL: '/api/doctor-rating/add',
    DOCTOR_RATING_BY_PATIENT_URL: '/api/doctor-rating/patient',

    //appointments
    APPOINTMENTS_URL: '/api/appointments',
    ACTIVE_APPOINTMENTS_URL : '/api/appointments/patient/active',
    PREVIEWS_APPOINTMENTS_URL : '/api/appointments/patient/previews',

    //diseases
    DISEASES: '/api/diseases',
    DISEASES_FILTER: '/api/diseases/filter',

    //prescriptions
    PRESCRIPTIONS_FILTER: '/api/prescriptions/filter',
});