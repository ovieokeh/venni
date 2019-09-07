module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Notifications', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      owner: {
        type: Sequelize.UUID,
        allowNull: false
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['unread', 'read'],
        defaultValue: 'unread'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Notifications')
}
