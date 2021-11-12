'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Entries',
      [
        {
          name: 'Demo',
          content: 'Demo',
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          categoryId: 1,
          type: 'Event',
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Encuentro de organizaciones',
          content: 'Un nuevo encuentro que estrecha lazos y refuerza la unión',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLWVpgPXTFsMe1Ue6cYMzP1iFw14TOBmqdANBahDK76gwkMK5V54L8KjQ8k6AxTFLbIn-9TUJiiq1KJMR37reG51ohHnwenoZ_BhdQ2lWdbp5rzUe4ikupmXIuT9rJWKwmgpuUv9-0WMzQd2I40kgyda6A=w900-h600-no?authuser=0',
          categoryId: 1,
          type: 'news',
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Más derechos para los niños',
          content: 'Acciones para mejorar la situación de vulnerabilidad en la niñez',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLUTjOfUWt5JncEh9M24xsY82cf3qCkbE0UJOZ0I_RxiVb1cKNDN621K0LviC3lTkhGY9VwqH6jBFXDu0knSIs_zrRcUY_BkU_8dkWXAh5KRj5oN3IXk-tFKexkuO9zsu_B9zOnTiNEsdKqwWCxwNPtcPA=w900-h600-no?authuser=0',
          categoryId: 1,
          type: 'news',
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Protección al medioambiente',
          content: 'Se concreto un nuevo encuentro para dialogar sobre el cuidado del medioambiente',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLVp8NPG6FdvQbxzaZyAV-BU6aVmXhNoA7ElPZdyarRypthEBElXLh4BLY83xlL44P-mLVZ8Ms_b4Z7C_hwV7H0BRYT2fo_dzAS5_X-f2cRuUzFDZYFyWdKeTvyQTG2_vCc8RfZnR9P5foCZ90HkEdOk8A=w900-h600-no?authuser=0',
          categoryId: 1,
          type: 'news',
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
