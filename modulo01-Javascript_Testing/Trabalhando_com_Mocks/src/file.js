const { readFile } = require('fs/promises'); 
const { error } = require('./constants');
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf8');
    const validation = this.isValid(content);
    if(!validation.valid) throw new Error(validation.error);
  }
  static isValid(csvString, options = DEFAULT_OPTION) {
    const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeaderValid = headers === options.fields.join(',')

    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if(!fileWithoutHeader.length) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    console.log(headers, fileWithoutHeader)
  }
}

module.exports = File;