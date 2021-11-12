const { Category } = require('../models');
const log = require('../utils/logger');
const { Entry } = require('../models');

module.exports = {
  /**
   * Get all categories
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getAllCategories(req, res) {
    try {
      const categoriesQuery = await Category.findAll();
      const categories = categoriesQuery.map((category) => {
        return {
          id: category.id,
          name: category.name
        };
      });
      log.debug(categories);
      res.status(200).json({ categories });
    } catch (err) {
      res.status(500).json({ error: err.message });
      log.error(`Error happened trying to getting categories. Error; [${err.message}]`)
    }
  },

  /**
   * Get all categories
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
   async getCategory(req, res) {
    try {
      const category = await Category.findOne({ where: { id: req.params.id } });
      if (category) {
        log.info('Sending one category');
        res.status(200).json({ category: category });
      } else {
        log.error('Category Not Found.');
        res.sendStatus(404);
      }
    } catch (err) {
      log.error(
        `Error happened trying to send the category. Error: [${err.message}]`
      );
      res.status(500).json({ error: err.message });
    }
  },
  /**
   * Create a new category
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async createCategory(req, res) {
    try {
      const values = req.body;
      const category = await Category.create(values);
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  /**
   * Update a category
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async updateCategory(req, res) {
    log.info('Try updating an category');
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        log.warn(`Tried to update non-existing category: [${id}]`);
        return res.status(404).json({ error: 'Category not found' });
      }
      const update = await Category.update(req.body, {
        where: { id }
      });
      if (update) {
        log.info(`Category with id [${id}] updated`);
        res.status(202).end();
      }
      res.status(406).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  /**
   * Delete a category
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        log.warn(`Tried to delete non-existing category: [${id}]`);
        return res.status(404).json({ error: 'Category not found' });
      }

      //If you wanna delete a category, you should delete all entries with that cateogories first yeah ;)
      const entries = await Entry.findAll({ where: { categoryId: id } });
      entries.map(async (entry) => {
        await entry.destroy();
      })


      await category.destroy();
      log.info(`Category with id [${id}] deleted`);
      res.status(204).end();
    } catch (err) {
      log.warn(`Error ${err.message}`)
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};
