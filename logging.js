winston = require('winston')

const format = winston.format

const customFormat = format.printf(info => {
   return `${info.timestamp} | ${info.message}`
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), customFormat),
    transports: [new winston.transports.Console({level: 'info'}), new winston.transports.File({filename: 'requests.log', level: 'info'})]
});

module.exports.logger = logger;