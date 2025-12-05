// src/lib/logger.ts
import { createLogger, format, transports, addColors } from 'winston';

const customLevels = {
	levels: { error: 0, warn: 1, info: 2, debug: 3 },
	colors: { error: 'red', warn: 'yellow', info: 'cyan', debug: 'green' }
};

addColors(customLevels.colors);

const logger = createLogger({
	levels: customLevels.levels,
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: format.combine(
		format.colorize({ all: true }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.splat(), // enable interpolation / metadata support
		format.printf((info) => {
			// Jika ada metadata selain message, tampilkan juga
			const { timestamp, level, message, ...meta } = info;
			const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
			return `[${timestamp}] ${level}: ${message} ${metaString}`;
		})
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'logs/app2.log', level: 'info' })
	],
	exitOnError: false
});

export default logger;
