winston = require('winston')
require('winston-daily-rotate-file');

const format = winston.format

const customFormat = format.printf(info => {
   return `${info.timestamp} | ${info.message}`
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), customFormat),
    transports: [new winston.transports.Console({level: 'info'}), new winston.transports.DailyRotateFile({filename: 'requests-rot.log', level: 'info'})]
});

module.exports.logger = logger;