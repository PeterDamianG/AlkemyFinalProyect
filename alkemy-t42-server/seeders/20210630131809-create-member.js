'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Members',
      [
        {
          name: 'María García',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLUyE5n9HY9Jrqwzd93gZeJdanWoGfd6BL3ii5eAvazp0stw7vtFR_sWlSUns76jnZleGUS6T_Sq_STYPnPWg2UbV4y-ekGbepnf-JVJA9Vn1RQUWp2kmgR7Adhfl5X-N5e99coDQLFvyA2Z0tu7IrD-CQ=w960-h600-no?authuser=0',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rodrigo Fuente',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLVO2Mb_PLBH_jMZKY5gK4ubh37jUNkaUadbdE6nYxkflG4mbpr5kWLzoZjfWfVk4zkuOZkyAEiLe-bC1WY4_omw9KkBDpzqvR2RhpMO-avPUDgN2N1QUfw1DzKHhq6jAFE1iIgAlW7BEab7s0mmF5NLHg=w900-h600-no?authuser=0',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cecilia Mendez',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLX482r0XMlAls4qK6GbXZVeG12PZ_-XkKzGN5aPx48Lhy6iS85rq6iOVQM2UwMD9CZIPoSDu-0w4mEte14g3OZ2Lji6SbJlvGd7ZZy0WtnEFeaSmeflUDHur4-HSxB4m7W45d1wOZWAcFO0tiF_WvcBXg=w960-h600-no?authuser=0',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
