const { response } = require('express');
const { Testimony } = require('../models');
const log = require('../utils/logger');

module.exports = {
  async getTestimonials(req, res) {
    try {
      const testimonials = await Testimony.findAll();

      log.info('Sended all testimonials');
      return res.status(200).json({ Testimonials: testimonials });
    } catch (err) {
      log.error(`Error happened trying sending the users. Error: [${err.message}]`)
      res.status(500).json("Ha ocurrido un error. Por favor, inténtelo nuevamente.");
    }
  },

  async getTestimony(req, res)
  {
    const id = req.params.id;
    try {
      const testimony = await Testimony.findByPk(id);

      if(testimony) return res.status(200).json(testimony);

      log.warn(`Entry with id [${id}] does not exist`);
      return res.status(404).json({Error: "Entry not found"});
    }catch {
      return res.status(505).json("Ha ocurrido un error. Por favor, inténtelo nuevamente");
    }
  },
  /**
   * Create a testimonial
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async createTestimonial(req, res) {
    try {
      const response = await Testimony.create(req.body);
      log.info('Testimonial created');
      res.status(201).json(response);
    } catch (err) {
      log.error(
        `There was an error creating a testimonial. Error [${err.message}]`
      );
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Edit a testimonial
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @returns {Promise<void>}
   */
  async putTestimonial(req, res) {
    log.info('Editing an testimonial');
    const id = req.params.id;

    try {
      const testimonial = await Testimony.findByPk(id);

      if (!testimonial) {
        log.warn(`Entry with id [${id}]`);
        return res.status(404).json('Testimonial not found');
      }

      await testimonial.update(req.body);

      log.info(`Testimonial with id [${id}] was edited`);
      return res.status(200).json(testimonial);
    } catch (err) {
      console.log(err);
      log.error(
        `Error happened trying to edit a testimonial. Error: [${err.message}]`
      );
      return res
        .status(500)
        .json('Ha ocurrido un error. Por favor, inténtelo nuevamente');
    }
  },
  /**
   * Create a testimonial
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async deleteTestimonial(req, res) {
    log.info('Deleting a testimonial');
    const { id } = req.params;
    try {
      const testimonial = await Testimony.findByPk(id);
      // If testimonial don't exist.
      if (!testimonial) {
        log.warn(`Tried to delete non-existing testimonial: [${id}]`);
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      // Result is correct.
      await testimonial.destroy();
      log.info(`Testimonial with id [${id}] deleted`);
      res.status(204).end();
    } catch (err) {
      log.warn(`Error ${err.message}`);
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};
