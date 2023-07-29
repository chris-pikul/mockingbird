#!/usr/bin/env node
import FS from 'fs/promises';
import Path from 'path';

import { compileCommands } from './lib.mjs';

async function run() {
    console.log('Compiling commands.ts to get a manifest...');
    const manifest = await compileCommands();

    const md = manifest.reduce(
        (acc, cmd) =>
            `${acc}* \`mb.${cmd.key}\` ${cmd.category}: ${cmd.title}\n`,
        '',
    );

    const outPath = Path.resolve('.', 'COMMANDS.md');
    await FS.writeFile(outPath, md, 'utf-8');

    console.log(md);
}

run()
    .then(() => console.log('\nSuccessful\n'))
    .catch((err) => console.error('Failed', err))
    .finally(() => console.log('Exiting'));
