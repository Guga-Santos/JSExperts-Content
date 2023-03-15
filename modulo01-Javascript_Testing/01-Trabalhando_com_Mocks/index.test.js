const File = require('./src/file');
const { error } = require('./src/constants');
const assert = require('assert');

// IFEE
;(async () => {
  
  // Variaveis criadas nesse bloco, só são válidas durante sua execução.
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/fiveItems-invalid.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const expected = [
      {
        id: 1,
        name: 'Cacau Noel',
        profession: 'sleeper',
        age: 1
      },
      {
        id: 2,
        name: 'Amanda Lucena',
        profession: 'Biologist',
        age: 30
      },
      {
        id: 3,
        name: 'Gustavo Santos',
        profession: 'HouseKeeper',
        age: 39
      }
    ]
    const result = await File.csvToJSON(filePath);
    assert.deepEqual(result, expected);
  }

})()