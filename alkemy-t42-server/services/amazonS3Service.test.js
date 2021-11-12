require('dotenv').config();
const { postFile, getFile, deleteFile } = require('../services/amazonS3Service');
const superagent = require('superagent');

describe('amazonS3Service tests', () => {
  jest.setTimeout(10000);
  const filename = `cat_${Math.round(Math.random() * 10000)}.jpg`;

  test('Upload a file', async () => {
    // create an object simulating a multer file upload
    const res = await superagent.get('https://cataas.com/cat');
    const fakeFileObject = {
      buffer: res.body,
      originalname: filename
    }

    const image = await postFile(fakeFileObject);
    expect(image.url).toMatch(new RegExp(`${filename}`));
  });

  test('Get a file', async () => {
    await getFile(filename);
  });

  test('Get a non-existing file - should throw', async () => {
    await expect(getFile('this_file_does_not_exist.jpg')).rejects.toThrow('NoSuchKey');
  });

  test('Delete a file', async () => {
    const result = await deleteFile(filename);
    console.log(result);
  });

  test('Delete a non-existing file - should throw', async () => {
    await expect(getFile('this_file_does_not_exist.jpg')).rejects.toThrow('NoSuchKey');
  });
});
