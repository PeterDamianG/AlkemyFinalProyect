'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Testimonials',
      [
        {
          name: 'Testimony 1',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLVO2Mb_PLBH_jMZKY5gK4ubh37jUNkaUadbdE6nYxkflG4mbpr5kWLzoZjfWfVk4zkuOZkyAEiLe-bC1WY4_omw9KkBDpzqvR2RhpMO-avPUDgN2N1QUfw1DzKHhq6jAFE1iIgAlW7BEab7s0mmF5NLHg=w900-h600-no?authuser=0',
          content: 'Content Testimony 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testimony 2',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLX8r6jPjUBkiry_s3tjMAjU8cCulFKmSbrcz8nL56cNrxQtxLbnmd65sbdq4EWPzUDmHPc9hydvkYyDjvKFMl3kwyOSAjuVOSO9kZWMCe4dvElpBuu0782Z2mxATBkgfhJdp1icAhP_wAfvQlIU_PEJiQ=w439-h657-no?authuser=0',
          content: 'Content Testimony 2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testimony 3',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLWvuB2fALp-hSp2eYDmf-orEytcUJJ_mxKPNJ_UtThf8ke-bpWeW8qtYf4o-nR9qYrZB_aVLLsbiuBAkpEb_VUAKiopmUan2N-p_I7t1JXfRsQqsqXaBsFkAylpMt84knKkpBWX3t00yTWWodUJUdfgZQ=s225-no?authuser=0',
          content: 'Content Testimony 3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testimony 4',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLXsRwNhgTBG2p0MBdo31EEqLKzihia_FxH2lMVYjOmd1VTGbceHfML8Pv05jcbTNq7W4XrdOFCJbOPQjpmI8276hjH__sC63wkl056xRwo79lbf5DWbCHTtd-NU5QYS18zN4kdXgm5L4bdFTCOkPuTOqw=w486-h657-no?authuser=0',
          content: 'Content Testimony 4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testimony 5',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLVSCcNsp5nUES0FuxUtp37kSaCQAuXdqF2IixhBKiysYAnWUJFHmbCvYv-WT8pXhMoxJcEm6mI2Q_CaJD7Dvklzaaizgxo_iqjz97gdqTYBzLmKvgEWzGpyVuckS73eRVRiI4jkKHYFEafKXHX2PwyAFQ=w1052-h657-no?authuser=0',
          content: 'Content Testimony 5',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testimony 6',
          image:
            'https://lh3.googleusercontent.com/pw/AM-JKLW8BzLURMuyn1ooHQd9oVtHtNwk2n2UOIR1jJTscbGIyo25TmmYPxOnu8SCvQxhbpA8QDCy1cTaS1xYwyzu2AimxtQOMGoB6AsuqcOyZDdjPtUzD0z31pJVMUYBzhqFKmbAxSyC2Qr1fPwAhyTSHL8PlA=w438-h657-no?authuser=0',
          content: 'Content Testimony 6',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
