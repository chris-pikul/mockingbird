#!/usr/bin/env node
import FS from 'fs/promises';
import Path from 'path';

/* eslint-disable */
const commands = [];

const menus = {
    'editor/context': [
        {
            submenu: 'mockingbird',
            group: 'navigation',
            when: 'config.mockingbird.contextMenu.enabled',
        },
    ],
    'mockingbird': [],
};

const subMenus = [
    {
        id: 'mockingbird',
        label: 'Mockingbird',
    },
];

const tree = {};
/* eslint-enable */

async function compileCommands() {
    // Compile the commands file so we can get the "manifest"
    const pathCommands = Path.resolve(process.cwd(), 'src', 'commands.ts');

    const content = (await FS.readFile(pathCommands)).toString();
    const startBracket = content.indexOf('[');
    const endBracket = content.lastIndexOf(']');

    if (startBracket > 0 && endBracket > startBracket) {
        const nextBracket = content.indexOf('[', startBracket + 2);
        if (nextBracket === -1)
            throw new Error('Could not find start of array!');

        const clean = content
            .substring(nextBracket, endBracket + 1)
            .replaceAll(/func\:.+,/gi, '')
            .replaceAll(/validator\:.+,/gi, '');

        /* eslint-disable no-new-func */
        const array = new Function(`return ${clean};`)();
        console.log(array);

        return array;
    }
    throw new Error('Could not extract array!');
}

function toTitle(str) {
    return str
        .split('-')
        .filter((part) => part.length >= 2)
        .map((part) => part.charAt(0).toUpperCase() + part.substring(1))
        .join(' ');
}

function processCommand(cmd) {
    const newCommand = {
        command: `mb.${cmd.key}`,
        title: cmd.title,
    };
    if (cmd.shortTitle) newCommand.shortTitle = cmd.shortTitle;
    commands.push(newCommand);

    const parts = cmd.key.split('.');
    if (parts.length > 1) {
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            const path = parts.slice(0, i + 1).join('/');

            if (!(path in tree)) {
                const titleCase = toTitle(part);
                console.log(
                    `Adding tree entry for "${path}" being "${titleCase}"`,
                );
                tree[path] = titleCase;
            }
        }
    }
}

function constructMenus() {
    for (const [path, label] of Object.entries(tree)) {
        const realPath = `mockingbird/${path}`;
        subMenus.push({
            id: realPath,
            label,
        });

        const lastPathInd = realPath.lastIndexOf('/');
        if (lastPathInd) {
            const prevPath = realPath.substring(0, lastPathInd);

            if (prevPath in menus) {
                menus[prevPath].push({
                    submenu: realPath,
                });
            } else {
                menus[prevPath] = [
                    {
                        submenu: realPath,
                    },
                ];
            }
        }

        if (!(realPath in menus)) menus[realPath] = [];
    }
}

function populateMenus() {
    commands.forEach((cmd) => {
        let path = cmd.command.substring(3).replaceAll('.', '/');
        path = path.substring(0, path.lastIndexOf('/'));

        const newPath = `mockingbird/${path}`;

        if (newPath in menus) {
            console.log(`Adding ${cmd.command} to ${newPath}`);
            menus[newPath].push({
                command: cmd.command,
            });
        } else {
            console.error(`No place for ${newPath} to go`);
        }
    });
}

/**
 * Copies the package.json file and replaces the commands from our ts-list
 */
async function run() {
    const dir = Path.resolve(process.cwd());

    const pathPackage = Path.resolve(dir, 'package.json');
    const pathPackageBak = Path.resolve(dir, 'package.json.bak');

    console.log('Reading current package.json file...');
    const pkg = JSON.parse(await FS.readFile(pathPackage));

    console.log('Making backup of package.json...');
    await FS.copyFile(pathPackage, pathPackageBak);

    if (!pkg.contributes)
        throw new Error('Missing contributes object, something is wrong');

    // Compile the commands file so we can import it
    console.log('Compiling commands.ts to get a manifest...');
    const manifest = await compileCommands();
    manifest.forEach(processCommand);

    console.log('Building new sub-menus...');
    constructMenus();

    console.log('Populating menus with commands...');
    populateMenus();

    // Remove previous information
    console.log('Dumping old data...');
    delete pkg.contributes.commands;
    delete pkg.contributes.menus;
    delete pkg.contributes.submenus;

    console.log('Moving in new data...');
    pkg.contributes.commands = commands;
    pkg.contributes.menus = menus;
    pkg.contributes.submenus = subMenus;

    console.log('Writing new package.json...');
    await FS.writeFile(pathPackage, JSON.stringify(pkg, null, 4), 'utf-8');
}

run()
    .then(() => console.log('\nSuccessful\n'))
    .catch((err) => console.error('Failed', err))
    .finally(() => console.log('Exiting'));
