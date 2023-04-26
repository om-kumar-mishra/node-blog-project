'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {

        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      slugName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      discription: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      satus: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cms');
  }
};