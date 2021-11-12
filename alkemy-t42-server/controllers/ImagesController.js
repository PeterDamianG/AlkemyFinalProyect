const { postFile, getFile, deleteFile } = require('../services/amazonS3Service');
const log = require('../utils/logger');

module.exports = {
  /**
   * Store an image in S3
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>} 
   */
  async postImage(req, res) {
    if (!req.file) return res.status(400).json({
      error: 'Ha habido un error. Por favor, envíe una imagen en la petición.'
    });

    try {
      const image = await postFile(req.file);

      log.info(`Image uploaded: ${req.file.originalname}`);
      return res.status(201).json(image);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  /**
   * Get an image from S3
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>} 
   */
  async getImage(req, res) {
    if (!req.params.id) return res.status(400).json({
      error: 'Por favor, provea el id del archivo'
    });

    try {
      const image = await getFile(req.params.id);


      return res.status(200).json({url: image.url})
    } catch (err) {
      if (err.message === 'NoSuchKey') {
        return res.status(404).json({ error: 'File not found' });
      } else {
        return res.status(500).json({ error: err.message });        
      }
    }
  },

  /**
   * Delete an image from S3
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>} 
   */
  async deleteImage(req, res) {
    if (!req.params.id) return res.status(400).json({
      error: 'Por favor, provea el id del archivo'
    });

    try {
      const result = await deleteFile(req.params.id);

      if (result) {
        log.info(`Image deleted: ${req.params.id}`);
        return res.status(204).end();
      } else {
        return res.status(500).json({ success: false })
      }
    } catch (err) {
      if (err.message === 'NoSuchKey') {
        return res.status(404).json({ error: 'File not found' });
      } else {
        return res.status(500).json({ error: err.message });        
      }
    }
  }
}
