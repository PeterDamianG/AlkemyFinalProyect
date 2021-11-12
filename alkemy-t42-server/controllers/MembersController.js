const Joi = require('joi')
const { Member } = require('../models')
const log = require('../utils/logger')

module.exports = {

    async getAllMembers(req, res) {
        log.info('Sended all members')
        try {
            const allMembers = await Member.findAll();
            res.status(200).json({ allMembers })
        } catch (error) {
            log.warn(`Something went wrong. Error: [${error.message}]`)
            res.status(500).json(error.message)
        }
    },

    async createMember(req, res) {
        try {
            log.info('Creating new member');
            // Default value in image
            const newMember = {
                name: req.body.name,
                image: `${req.body.image || 'imagen.jpg'}`
            }
            const member = await Member.create(newMember);
            log.info('Member created');
            res.status(201).json({ newMember: member });
        } catch (err) {
            log.error(`Error happened trying to create a member. Error: [${err.message}]`);
            res.status(500).json({ error: err.message });
        }
    },

    async updateMember(req, res){

        log.info('updating member');
        const { id } = req.params;

        try {
            const updatingMember = await Member.findByPk(id);
            console.log(updatingMember);
            if (!updatingMember) {
                log.warn(`Try again, not found member: ${id}`);
                return res.status(404).json({ error: 'Member not found' });
              }

            const member = await updatingMember.update(req.body);
            if (member) {
                log.info(`Member: ${id}, updated`);
                return res.sendStatus(200);
            }

        } catch (error) {

            console.log(err);
            log.warn(`an error has occurred, please try again later`);
            return res.status(500).json({ message: 'Ha ocurrido un error, por favor vuelva a intentar' });
        
        }
    },

    /**
     * Delete a member
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise<void>}
     */
    async deleteMember(req, res) {
        const { id } = req.params;

        try {
            const member = await Member.findByPk(id);
            if (!member) return res.status(404).json({ error: 'member not found' });

            await member.destroy();

            log.info(`Member with id [${id}] deleted`);
            res.status(204).end();
        } catch (err) {
          log.warn(`Error deleting member: ${err.message}`)
          console.error(err);
          res.status(500).json({ error: err.message });            
        }
    }
}