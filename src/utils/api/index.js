import axios from 'axios'

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_VERSION}/`
})
const langObj = {
    ru: 'ru',
    en: 'en'
}

export const api = ({ url, open = false, ...props }) => {
    let lang = localStorage.getItem('lang')
    let token = localStorage.getItem('access_token')
        ? `${localStorage.getItem('access_token')}`
        : null
    if (token) token = `Bearer ${token}`
    if (!open) {
        props.headers = {
            ...props.headers,
            Authorization:
                props.headers && props.headers.Authorization
                    ? props.headers.Authorization
                    : token
        }
    }
    if ('pk' in props && props.pk) {
        url = `${url}/${props.pk}`
    }

    props.headers = {
        ...props.headers,
        hl: langObj[lang] ?? langObj.ru
    }
    return instance({
        url: url,
        ...props
    })
}

function createAxiosResponseInterceptor() {
    const interceptor = instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.data?.code === 134) {
                const access_token = localStorage.getItem('access_token')
                if (access_token) {
                    Clear()
                }
                return Promise.reject(error)
            }
            if (error.response.status !== 401) {
                return Promise.reject(error)
            }
            axios.interceptors.response.eject(interceptor)
            return refreshAccessToken(error)
        }
    )
}

function refreshAccessToken(error) {
    const refresh_token = localStorage.getItem('refresh_token')
    if (refresh_token) {
        return axios({
            url: `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_VERSION}/auth/token`,
            method: 'POST',
            data: {
                grantType: 'REFRESH_TOKEN',
                refreshToken: refresh_token
            }
        })
            .then(({ data }) => {
                localStorage.setItem('access_token', data?.access_token)
                localStorage.setItem('refresh_token', data?.refresh_token)
                return axios({
                    ...error.response.config,
                    headers: {
                        ...error.response.config.headers,
                        Authorization: `Bearer ${data?.refresh_token}`
                    }
                })
            })
            .catch((error2) => {
                Clear()
                return Promise.reject(error2)
            })
            .finally(createAxiosResponseInterceptor)
    }
    Clear()
    return Promise.reject('Error')
}

function Clear() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/'
    return null
}

createAxiosResponseInterceptor()
