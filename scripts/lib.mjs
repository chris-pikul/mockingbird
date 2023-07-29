import FS from 'fs/promises';
import Path from 'path';

export async function compileCommands() {
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
            .replaceAll(/validator\:.+,/gi, '')
            .replaceAll(/PROMPT_.+,/gi, 'null,');

        /* eslint-disable no-new-func */
        const array = new Function(`return ${clean};`)();
        console.log(array);

        return array;
    }
    throw new Error('Could not extract array!');
}

export function toTitle(str) {
    return str
        .split('_')
        .filter((part) => part.length >= 2)
        .map((part) => part.charAt(0).toUpperCase() + part.substring(1))
        .map((part) => {
            if (part === 'Ascii') return 'ASCII';
            return part;
        })
        .map((part) => part.replace('-', ' & '))
        .join(' ');
}
