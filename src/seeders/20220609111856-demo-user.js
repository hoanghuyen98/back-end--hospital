'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '12345678',
      firstName: 'admin',
      lastName: '1',
      address: 'VNAM',
      gender: 0,
      roleId: 'R1',
      phonenumber: "02456256",
      positionId: 'doctor',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
