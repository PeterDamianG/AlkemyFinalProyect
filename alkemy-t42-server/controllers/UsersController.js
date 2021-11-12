const { User } = require('../models');
const log = require('../utils/logger')

module.exports = {
  /**
   * Get all users
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      log.info('Sended all the users');
      res.json({ users });
    } catch (err) {
      log.error(`Error happened trying sending the users. Error: [${err.message}]`)
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Get details of a specific user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getUser (req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });

      if (user) {
        res.status(200).json(user);
        log.info(`Sent user with id ${req.params.id}`);
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (err) {
      log.error(`Error happened trying to send the users. Error: [${err.message}]`);
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Update details of a user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async updateUser (req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (user) {
        Object.entries(req.body).forEach((item) => {
          const [key, value] = item;
          if (['first_name', 'last_name', 'email'].includes(key)) {
            // convert key from snake_case to camelCase
            const camelCaseKey = key
              .toLowerCase()
              .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
            user[camelCaseKey] = value;
          }
        });

        if (req.user?.roleId === 1 && req.body.roleId) {
          user.roleId = req.body.roleId;
        }

        await user.save();

        const { password, ...sentValues } = user.dataValues; // exclude password
        res.status(200).json(sentValues);
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Delete a user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (user) {
        await user.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Get details about the currently logged-in user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getCurrentUser (req, res) {
    const { user } = req;
    const { password, ...sentValues } = user.dataValues; // exclude password
    res.status(200).json(sentValues);    
  },

  /**
   * Update the account details of the currently logged-in user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async updateCurrentUser (req, res) {
    const { user } = req;

    try {
      Object.entries(req.body).forEach((item) => {
        const [key, value] = item;
        if (['first_name', 'last_name', 'email'].includes(key)) {
          // convert key from snake_case to camelCase
          const camelCaseKey = key
            .toLowerCase()
            .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
          user[camelCaseKey] = value;
        }
      });

      if (req.user?.roleId === 1 && req.body.roleId) {
        user.roleId = req.body.roleId;
      }

      await user.save();

      const { password, ...sentValues } = user.dataValues; // exclude password
      res.status(200).json(sentValues);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }   
  },

  /**
   * Delete the account of the currently logged-in user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async deleteCurrentUser (req, res) {
    const { user } = req;

    try {
      await user.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
