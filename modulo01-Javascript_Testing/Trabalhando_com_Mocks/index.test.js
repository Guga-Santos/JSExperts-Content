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

})()