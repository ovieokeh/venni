import { Model, DataTypes, BuildOptions } from 'sequelize'
import sequelize from './index'
import { NotificationModel } from './Notification'
import { UserDetails } from '../../interfaces'

interface UserModel extends UserDetails, Model {
  dataValues: any
  addInvite(id: string): UserDetails[]
  removeInvite(id: string): void
}

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel
}

export const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}) as UserModelStatic

UserModel.belongsToMany(UserModel, {
  through: 'Friends',
  as: 'friends',
  foreignKey: 'userId'
})

UserModel.belongsToMany(UserModel, {
  through: 'FriendInvites',
  as: 'invites',
  foreignKey: 'userId'
})

UserModel.belongsToMany(UserModel, {
  through: 'FriendInvites',
  as: 'sentInvites',
  foreignKey: 'inviteId'
})

UserModel.hasMany(NotificationModel, { foreignKey: 'owner' })

NotificationModel.belongsTo(UserModel, {
  as: 'notifications',
  foreignKey: 'owner'
})
