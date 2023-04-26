'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      modelName: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      subcategory: {
        type: Sequelize.INTEGER
      },
      childcategory: {
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING
      },
      gst: {
        type: Sequelize.INTEGER
      },
      summary: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      exchangeday: {
        type: Sequelize.STRING
      },
      returnDay: {
        type: Sequelize.STRING
      },
      paymentMode: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      sellingPrice: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      stats: {
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
    await queryInterface.dropTable('Products');
  }
};