import { message } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

export function validateImage(file: RcFile) {
  const isValidImage = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isValidImage) {
    message.error('You can only upload a JPG/PNG file!')
  }

  const isValidSize = file.size / 1024 / 1024 < 2
  if (!isValidSize) {
    message.error('Image must be smaller than 2MB!')
  }

  return isValidImage && isValidSize
}

export const isValidName = /^[A-Za-z ]+$/
