import moment from 'moment'
import bcrypt from 'bcryptjs'

import { AuthUserTypes } from '../types'
import { useAuthStore } from '../stores/authStore'
import { useGeneralStore } from '../stores/general'
import { Element } from '../types'

export const extractInner = (
  element: Element,
  innerArray: string,
  key: string
): { [name: string]: number } => {
  let extraction: { [name: string]: number } = {}

  element[innerArray].forEach((object) => {
    const name = object[key] as string // Type assertion to ensure name is a string
    // if (extraction[name]) {
    //   extraction[name] += object.quantity;
    // } else {
    extraction[name] = object.quantity
    // }
  })

  return extraction
}
interface ProductSold {
  [productName: string]: number
}

export const sortObjectByValues = (obj: ProductSold): ProductSold => {
  // Convert the object into an array of key-value pairs
  const entries = Object.entries(obj)
  // Sort the array based on the values
  entries.sort((a, b) => b[1] - a[1])
  const top_five = entries.slice(0, 6)

  // Convert the sorted array back into an object
  // console.log({ top_five });
  const sortedObj: ProductSold = {}
  top_five.forEach(([key, value]) => {
    sortedObj[key] = value
  })

  return sortedObj
}

export const convertDate = (storedTime: any, single = true) => {
  if (!storedTime) {
    return
  }
  const date = moment(storedTime)
  if (single) {
    return date.format('DD/MM/yyyy')
  } else {
    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
      day_of_week: date.day(),
      hour: date.hour(),
      minute: date.minute(),
      day_in_word: String(date.format('dddd')),
      month_in_word: date.format('MMMM')
    }
  }
}

export const generateDayStartEnd = (day: Date) => {
  if (!day) return
  const dayStart = new Date(day)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(day)
  dayEnd.setHours(23, 59, 59, 999)

  return { dayStart, dayEnd }
}

export const convertStringToDateTime = (dateString: string) => {
  const dateTime = moment(dateString, 'YYYY-MM-DD')
  return dateTime.toDate()
}
export const stringToBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'
  } else if (typeof value === 'boolean') {
    return value
  }
  // Optional: handle invalid input case (e.g., return a default value or throw an error)
  throw new Error('Invalid input: expected a string or boolean.')
}

export const hashPassword = (password: string) => {
  if (!password) return
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export const unhashPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const checkOwner = (val: boolean) => {
  if (!val) {
    return
  } else {
    const setIsOwner = useGeneralStore.getState().setIsOwner
    setIsOwner(val)
  }
}

export const setUserStore = (data: AuthUserTypes) => {
  if (!data) {
    return
  } else {
    const setUser = useAuthStore.getState().setUser
    setUser(data)
  }
}

interface ObjType {
  [key: string]: any
}

export const arrayToObject = <T extends ObjType>(
  array: T[],
  keyField: keyof T
): { [key: string]: T } => {
  return array.reduce(
    (obj, item) => {
      obj[item[keyField]] = item
      return obj
    },
    {} as { [key: string]: T }
  )
}

export const _splitFloat = (number: number) => {
  if (!number) return
  const whole = Math.floor(number)
  const unit_quantity = Math.round((number - whole) * 10)

  return [whole, unit_quantity]
}

export const splitFloat = (number: string) => {
  if (!number) return
  let parts = number.toString().split('.')
  const whole = parts[0]
  const unit_quantity = parts[1] || 0
  return [whole, unit_quantity]
}
// npx prisma format
// npx prisma migrate deploy
// npx prisma migrate dev --name init --create-only
// npx prisma migrate dev
