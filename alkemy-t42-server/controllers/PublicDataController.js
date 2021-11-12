const { PublicData } = require('../models');
const log = require('../utils/logger');

module.exports = {
  /**
   * Get publicData
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getPublicData(req, res) {
    try {
      const publicData = await PublicData.findOne({
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        }
      });
      log.info('Sending Public Data');
      res.status(200).json({ publicData: publicData });
    } catch (error) {
      log.error(
        `Error happened trying to send public data. Error: [${error.message}]`
      );
      res.status(500).json({ error: error.message });
    }
  },
  async editPublicData(req, res) {
    try {
      const publicData = await PublicData.findByPk(1);
      await publicData.update(req.body);
      res.status(200).json(publicData);
      log.info('Public Data Updated');
    } catch (error) {
      log.error(
        `Error happened trying edit public data. Error: [${error.message}] `
      );
      res.status(500).json({ error: error.message });
    }
  }
};
