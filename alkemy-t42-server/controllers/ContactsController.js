const { Contact } = require('../models');
const log = require('../utils/logger')

module.exports = {
  /**
   * Create a new contact
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async createContact(req, res) {
    
    log.info('Creating contact')
    try {
      const values = req.body;
      const contact = await Contact.create(values);

      res.status(201).json(contact);
    } catch (err) {
      if (err.details) {
        // body validation error
        log.warn(`There was validation errors in contacts. Errors: [${err.mnessage}]`)
        res.status(422).json({ errors: err.details });
      } else {
        log.error(`Error happened trying to create a contact. Error; [${err.message}]`)
        res.status(500).json({ error: err.message });
      }
    }
  },
  /**
   * Get all contacts
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  async getAllContacts(req, res) {
    try {
      const contacts = await Contact.findAll();
      log.info('Sending all contacts')
      res.status(200).json({ contacts: contacts });
    } catch (err) {
      log.error(`Èrror happened trying to send all contact. Error: [${err.message}]`)
      res.status(500).json({ error: err.message });
    }
  },

  async deleteContact(req, res) {
    try {
      const contact = await Contact.findByPk(req.params.id);

      if(!contact) return res.status(404).json({Error: "Contact not found"});

      const operation = contact.destroy();

      if(operation) return res.status(204).json("Entry successfully deleted");
    } catch(err){
      res.status(500).json({ Error: err });
    }
  }
};
