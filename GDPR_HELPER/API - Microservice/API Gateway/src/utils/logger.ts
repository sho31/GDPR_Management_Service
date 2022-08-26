import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import Transport from 'winston-transport';
import { LOG_DIR } from '@config';
import { MESSAGE } from 'triple-beam';

// logs dir
//const logDir: string = join(dirname(require.main.filename), LOG_DIR);
const logDir = './logs';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const level = process.env.LOG_LEVEL || 'info';
class SimpleConsoleTransport extends Transport {
  log = (info: any, callback: any) => {
    setImmediate(() => this.emit('logged', info));

    console.log(info[MESSAGE]);

    if (callback) {
      callback();
    }
  };
}
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
    new SimpleConsoleTransport(),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);
const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};
export { logger, stream };
