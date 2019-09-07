module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  })
  User.associate = models => {
    User.belongsToMany(models.User, {
      through: 'Friends',
      as: 'friends',
      foreignKey: 'userId'
    })
    User.belongsToMany(models.User, {
      through: 'FriendInvites',
      as: 'invites',
      foreignKey: 'userId'
    })
    User.belongsToMany(models.User, {
      through: 'FriendInvites',
      as: 'sentInvites',
      foreignKey: 'inviteId'
    })
    User.hasMany(models.Notification, { foreignKey: 'owner' })
  }
  return User
}
