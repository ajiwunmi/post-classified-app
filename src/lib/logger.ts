// src/lib/logger.ts

import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty', // make logs look nice in dev
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});
