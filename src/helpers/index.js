import dayjs from 'dayjs'

export const formatPhoneNumber = (phone_number) => {
  const v = phone_number?.replace(/[^0-9]/g, '')?.slice(0, 9)
  const l = v?.length
  let lastValue
  if (l < 3) {
    const reg = new RegExp(`^([0-9]{2})`)
    lastValue = v?.replace(reg, '$1')
  } else if (l < 6) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{${l - 2}})`)
    lastValue = v?.replace(reg, '$1 $2')
  } else if (l < 8) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{${l - 5}})`)
    lastValue = v?.replace(reg, '$1 $2-$3')
  } else {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${l - 7}})`)
    lastValue = v?.replace(reg, '$1 $2-$3-$4')
  }

  return lastValue
}

export const reformatPhoneNumber = (value) => {
  return `998${value?.replace(/[^0-9]/g, '').slice(0, 9)}`
}

export const formatDate = (date) => {
  return dayjs(date).format('DD.MM.YYYY')
}

export function infinityScroll(event, totalPages, page, loading, callback) {
  const clientH = event.target.clientHeight
  const scrollTop = event.target.scrollTop
  const scrollH = event.target.scrollHeight
  if (
    Math.ceil(clientH + scrollTop + 1) >= scrollH &&
    page + 1 < totalPages &&
    !loading
  ) {
    callback(page + 1)
  }
}

export const formatAccount = (account) => {
  let value = account?.replace(/\D/g, '')
  return value?.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 24)
}

const timeouts = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key, fn, timeout) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}
