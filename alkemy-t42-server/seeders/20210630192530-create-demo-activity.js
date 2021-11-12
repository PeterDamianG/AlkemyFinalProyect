'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Activities',
      [
        {
          name: 'Apoyo Escolar',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLUcYs5CiGoLNqAFGmIkbnSqZAcmlTeP9SHUgHWlFXsD6JxOTdULKco9aSeyYO_8OEk80lR5ahPw5GJVSo5qfq5rcap8MoUM8mp0REZkbGurkeD7c3Vg1mlDpDadIafICgIiVEDQiBZwPhieyJMIimmE9A=w960-h538-no?authuser=0',
          content: 'El corazón del área educativa.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tutorías',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLUtU1QidC-At0QOTCBtp9AClbndFkBicyXTrOiJgXfkomcGjvPAPLYrJgjtb8mXKbg7d2FrkHtUpDk00Xch5R8CLUjYsDmRTkF8Qc7DA7ov6o-l8SloqL1fVB7n9KA7LzgbVFVjHtKJgVFZQl4umvLNqA=w960-h538-no?authuser=0',
          content: 'Programa destinado a jóvenes',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Taller arte y cuentos',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLX4RhamNEIEN5rHZqULmOhWr_IMr23CEvXtjCH5UH_SFG8QzeGHTas1_jjnLfoDv-W_V1o_YMMkR7nJWzInBmoibzR40RXuZp4xNybJcfYCtNBWvnTflVNDY5F5dK7GZMFTdLcIBzRT3Z294LRtY7dSMg=w1067-h600-no?authuser=0',
          content: 'Taller literario y de manualidades',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Paseos recreativos',
          image: 'https://lh3.googleusercontent.com/pw/AM-JKLVW5lFf6NtF2vpEZrMlwOtgth5YUAftKgIw1MMfhRY0cCWFWebQ5STZzJOdPPlTAesdcli6RbaBXlX2H6xkvL48460tXmp0CBn9Te-HaEnKkq9YKTM8DG3O3JlRO-iiXqRH1W9FKskZ4SOtf8KEX_Ipaw=w1040-h585-no?authuser=0',
          content: 'Promover la participación',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
