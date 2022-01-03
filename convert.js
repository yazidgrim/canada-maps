const csvToJson = require('convert-csv-to-json');

const input = './CanadianPostalCodes.csv';
const output = './public/CanadianPostalCodes.json';

csvToJson.fieldDelimiter(',')
            .formatValueByType()
            .generateJsonFileFromCsv(input, output);