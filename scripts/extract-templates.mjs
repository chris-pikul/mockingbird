#!/usr/bin/env node
import FS from 'fs/promises';
import Path from 'path';

import { compileCommands } from './lib.mjs';

async function run() {
    console.log('Compiling commands.ts to get a manifest...');
    const manifest = await compileCommands();

    const md = manifest
        .filter(
            (cmd) =>
                typeof cmd.templateName === 'string' ||
                typeof cmd.templateName === 'object',
        )
        .reduce((acc, cmd) => {
            const funcs =
                typeof cmd.templateName === 'string'
                    ? cmd.templateName
                    : cmd.templateName
                          .reduce((acc2, cur2) => `${acc2} | ${cur2}`, '')
                          .substring(2)
                          .trim();

            return `${acc}* \`${funcs}\` ${
                typeof cmd.prompt === 'undefined' ? '' : '__(accepts input)__ '
            }${cmd.title}\n`;
        }, '');

    const outPath = Path.resolve('.', 'TEMPLATES.md');
    await FS.writeFile(outPath, md, 'utf-8');

    console.log(md);
}

run()
    .then(() => console.log('\nSuccessful\n'))
    .catch((err) => console.error('Failed', err))
    .finally(() => console.log('Exiting'));
