'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn(
      'user_apis',
      'password',
      {
        type: Sequelize.STRING
      })
      ,
      queryInterface.addColumn(
        'user_apis',
        'image',
        {
          type: Sequelize.STRING
        })
  

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('user_apis', 'password'),
    queryInterface.removeColumn('user_apis', 'image')

  }
};
