import { ConsoleLogger, Logger, LogLevel } from '@nestjs/common';
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export class CustomLogger extends ConsoleLogger {
  private level: LogLevel[] = [];
  private maxFileSize: number;
  private counters: Map<LogLevel, number> = new Map();

  constructor(name?: string) {
    super();
    this.maxFileSize = +process.env.LOGGER_FILE_SIZE
    let envLevels = process.env.LOGGER_LEVEL
      .replace('[', '')
      .replace(']', '')
      .split(', ');

    if (Array.isArray(envLevels)) {
      envLevels.forEach(level => {
        if (['log', 'error', 'warn', 'debug', 'verbose', 'fatal'].includes(level)) {
          this.level.push(level as LogLevel);
          this.counters.set(level as LogLevel, 1);
        }
      });

    }

    process.on('unhandledRejection', (reason: unknown) => {
      this.error('unhandled Rejection', reason);
    });

    process.on('uncaughtException', (error: Error) => {
      this.error('uncaught Exception', error.stack);
    });

  }

  log(message: any) {
    if (!this.level.includes('log')) return;
    this._writeLogs('log', this._logMessage(message));
  }
  error(message: any, stack?: any) {
    if (!this.level.includes('error')) return;
    this._writeLogs('error', this._logMessage(message, stack));
  }
  warn(message: any) {
    if (!this.level.includes('warn')) return;
    this._writeLogs('warn', this._logMessage(message));
  }
  debug(message: any) {
    if (!this.level.includes('debug')) return;
    this._writeLogs('debug', this._logMessage(message));
  }
  verbose(message: any) {
    if (!this.level.includes('verbose')) return;
    this._writeLogs('verbose', this._logMessage(message));
  }
  fatal(message: any) {
    if (!this.level.includes('fatal')) return;
    this._writeLogs('fatal', this._logMessage(message));
  }

  private async _writeLogs(logType: LogLevel, data: string) {
    data += '\n'
    const logFolderPath = path.resolve('/app/dist', 'logs')
    await fs.mkdir(logFolderPath, { recursive: true });

    let counter = this.counters.get(logType) ?? 0;

    let logFilePath = path.resolve(logFolderPath, `${logType}_${counter}.txt`)

    fs.access(logFilePath)
      .then(() => {
        fs.stat(logFilePath)
          .then(stats => {
            if (stats.size > this.maxFileSize) {
              counter += 1;
              this.counters.set(logType, counter);
              logFilePath = path.resolve(logFolderPath, `${logType}_${counter}.txt`)
            }
          })
      })
      .catch(err => { })


    await fs.writeFile(logFilePath, data, { flag: 'a' });

  }

  private _logMessage(message: string, stack?: any) {

    let msg = `${new Date().toISOString()}: ${message}`

    if (stack) {
      msg += `_${stack instanceof Error ? stack.stack : stack}`
    }
    return msg;
  }
}
