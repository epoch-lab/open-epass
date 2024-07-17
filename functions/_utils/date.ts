import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Shanghai')

export const $dayjs = dayjs

export function formatDate(date?: dayjs.ConfigType) {
  return $dayjs(date).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
}
