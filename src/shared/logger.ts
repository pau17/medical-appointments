import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),  
        new transports.File({ filename: 'application.log' })  
    ]
});

export const logInfo = (message: string): void => {
    logger.info(message);
};

export const logError = (message: string): void => {
    logger.error(message);
};

export const logWarning = (message: string): void => {
    logger.warn(message);
};

export const logDebug = (message: string): void => {
    logger.debug(message);
};
