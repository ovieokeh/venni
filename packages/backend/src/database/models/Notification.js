module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
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
  })
  Notification.associate = models => {
    Notification.belongsTo(models.User, {
      as: 'notifications',
      foreignKey: 'owner'
    })
  }
  return Notification
}
