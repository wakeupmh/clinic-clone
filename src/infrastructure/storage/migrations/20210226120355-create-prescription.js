'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      physician_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      text: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prescriptions');
  }
};
