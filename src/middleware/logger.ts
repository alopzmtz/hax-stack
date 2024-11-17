import type { MiddlewareHandler } from "hono";
import chalk from 'chalk';
import { DateHelper, DateWrapper } from "../lib/date-helper.js";

const CONFIG = {
    padding: {
        path: 30,
        status: 3,    // HTTP status codes are 3 digits
        duration: 7   // Enough for '9999ms'
    },
    timestamp: true
} as const;

export const logger = (): MiddlewareHandler => {
    return async (c, next) => {
        const start = Date.now();
        await next();
        const end = Date.now();

        const method = c.req.method;
        const path = c.req.path.padEnd(CONFIG.padding.path);
        const status = c.res.status.toString().padStart(CONFIG.padding.status);
        const duration = `${end - start}ms`.padStart(CONFIG.padding.duration);
        const timestamp = DateWrapper.now().format();

        // Color mapping
        const methodColor = {
            'GET': chalk.green,
            'POST': chalk.blue,
            'PUT': chalk.yellow,
            'DELETE': chalk.red,
            'PATCH': chalk.magenta,
        }[method] || chalk.gray;

        const statusColor = 
            status >= '500' ? chalk.red :
            status >= '400' ? chalk.yellow :
            status >= '300' ? chalk.cyan :
            status >= '200' ? chalk.green :
            chalk.gray;

        // Build log parts
        const parts = [
            CONFIG.timestamp ? `[${chalk.gray(timestamp)}]` : '',
            `[${methodColor(method)}]`,
            path,
            statusColor(status),
            chalk.gray(duration)
        ].filter(Boolean); // Remove empty strings if timestamp is disabled

        console.log(parts.join(' '));
    };
};