import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {
  log(message) {
    console.log('LOGGER:', message);
  }
}
