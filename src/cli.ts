#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { validatePizza } from './validation';
import { readFileSync } from 'node:fs';

const options = {
    file: {
        type: 'string',
        short: 'f',
    },
} as const;

// parse arguments and allow positionals
const { values, positionals } = parseArgs({ options, allowPositionals: true });

const filePath = values.file || positionals[0];

// if no file provided, exit with error
if (!filePath) {
    console.error('Error: No file provided');
    process.exit(1);
}

try {
    const file = JSON.parse(readFileSync(filePath, 'utf8'));
    const result = validatePizza(file);
    // if pizza is valid, exit with success
    if (result.isPizza) {
        console.log('Pizza is valid');
        process.exit(0);
    } else {
        // if pizza is invalid, exit with error and print errors
        console.error('Error: Invalid pizza');
        console.error(result.errors);
        process.exit(1);
    }
} catch (error) {
    // if failed to read file, exit with error
    console.error('Error: Failed to read file', error);
    process.exit(1);
}
