import { Model, DataTypes, BuildOptions } from 'sequelize'
import sequelize from './index'

export interface NotificationInterface {
  id: string
  owner: string
  type: string
  message: string
  status: any
  createdAt: string
}

interface NotificationModel extends NotificationInterface, Model {
  dataValues: any
}

type NotificationModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationModel
}

export const NotificationModel = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  owner: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['unread', 'read'],
    defaultValue: 'unread'
  }
}) as NotificationModelStatic
