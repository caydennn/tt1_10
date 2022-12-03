import chalk from 'chalk';

export const logSuccess = (message) => (console.log(chalk.greenBright.bgBlackBright(message)))

export const logDelete = (message) => (console.log(chalk.cyanBright.bgBlackBright(message)))

export const logWarn = (message) => (console.log(chalk.yellowBright.bgBlackBright(message)))

export const logError = (message) => (console.log(chalk.redBright.bgWhite(message)))