import bunyan from 'bunyan';

export const logger = bunyan.createLogger({ name: 'myapp', level: 'info' });