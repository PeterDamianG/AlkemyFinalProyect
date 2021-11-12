const { Activity } = require('../models');
const log = require('../utils/logger');

module.exports = {
  /**
   * Get all activities
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getAllActivities(req, res) {
    try {
      const activities = await Activity.findAll();
      log.info('Sending all the activities');
      res.status(200).json({ activities: activities });
    } catch (err) {
      log.error(
        `Error happened trying to send all the activities. Error: [${err.message}]`
      );
      res.status(500).json({ Error: err.message });
    }
  },
  /**
   * Get one acitivity
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getOneActivity(req, res) {
    try {
      const activity = await Activity.findOne({ where: { id: req.params.id } });
      if (activity) {
        log.info('Sending one activity');
        res.status(200).json({ Activity: activity });
      } else {
        log.error('Activity Not Found.');
        res.sendStatus(404);
      }
    } catch (err) {
      log.error(
        `Error happened trying to send the activity. Error: [${err.message}]`
      );
      res.status(500).json({ Error: err.message });
    }
  },
  /**
   * Delete one acitivity
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async deleteActivity(req, res) {
    try {
      const response = await Activity.destroy({ where: { id: req.params.id } });
      log.info('Deleting one activity');
      if (response === 1) res.sendStatus(204);
      else res.sendStatus(404);
    } catch (err) {
      log.error(
        `Error happened trying to delete the activity. Error: [${err.message}]`
      );
      res.status(500).json({ Error: err.message });
    }
  },
  /**
   * Edit specific activity by id
   * @param {import('express').Request} req
   * @param {import('express'.Response)} res
   * @returns {Promise<void>}
   */
  async editActivity(req, res) {
    const id = req.params.id;
    log.info(`Editing activity with id [${id}]`);
    try {
      const specificActivity = await Activity.findByPk(id);

      if (specificActivity === null) {
        log.warn(`Activity with id [${id}] does not exist`);
        res.status(404).end();
      }

      log.info(`Activity with id [${id}] was edited`);
      await specificActivity.update(req.body);
      res.status(200).json(specificActivity);
    } catch (err) {
      log.error(
        `Error happened trying to edit activity with id [${id}]. Error: [${err.message}] `
      );
      res.status(500).json({ Error: err.message });
    }
  },
  /**
   * Create a new Activity
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async createActivity(req, res) {
    log.info('Creating new activity');
    try {
      const value = req.body;
      const newActivity = await Activity.create(value);
      res.status(201).json(newActivity);
      log.info('Activity created');
    } catch (error) {
      log.error(
        `Error happened trying to create a activity. Error: [${error.message}]`
      );
      res.status(500).json({ message: error.message });
    }
  }
};
