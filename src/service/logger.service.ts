/**
 * Nest and Third party imports
 */
import { Injectable } from 'injection-js';
import { createLogger, Logger, LoggerOptions } from 'winston';
import winston = require('winston');

/**
 * Define Logger level
 */
export enum LogLevel { INFO = 'info', WARN = 'warn', ERROR = 'error', DEBUG = 'debug' }


/**
 * Logger Class
 */
@Injectable()
export class LogService {

    private readonly logger: Logger;
    private contextName: string = 'NEST JS Logs';


    constructor() {

        /**
         * Initialize logger configuration for console and file
         * Write logs on console and file
         */
        this.logger = createLogger();
        this.logger.configure({

            transports: [
                new winston.transports.File({
                    level: 'info',
                    filename: './logs/all-logs.log',
                    handleExceptions: true,
                    maxsize: 5242880, //5MB
                    maxFiles: 5
                }),
            ],
            exitOnError: false
        });

        /**
         * Avoid logger in production
         * print debug log in development
         */
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.align(),
                    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                ),
                level: 'debug',
                handleExceptions: true,
            }));
        };
    }

    public configure(configuration: LoggerOptions, contextName?: string): void {
        this.logger.configure(configuration);
        this.contextName = contextName ? contextName : this.contextName;
    }

    public log(message: string): void {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }

    public error(message: string, stackTrace?: any): void {
        this.logger.log({ level: LogLevel.ERROR, message: message, meta: { context: this.contextName, stackTrace: stackTrace } });
    }

    public warn(message: string): void {
        this.logger.log({ level: LogLevel.WARN, message: message, meta: { context: this.contextName } });

    }

    public info(message: string): void {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }

    public debug(message: string): void {
        this.logger.log({ level: LogLevel.DEBUG, message: message, meta: { context: this.contextName } });
    }

}