import { randexp } from 'randexp';

import { showError } from './vscode';

export function randomBool(): string {
    return Math.random() >= 0.5 ? 'true' : 'false';
}

export function fromRegex(pattern?: string): string {
    if (!pattern) return '';

    let patrn = pattern.trim();
    let flags = '';

    if (patrn.charAt(0) === '/') {
        const lastInd = patrn.lastIndexOf('/');
        console.log(lastInd);

        if (lastInd > 1) {
            if (lastInd < patrn.length - 1)
                flags = patrn.substring(lastInd + 1);
            patrn = patrn.substring(1, lastInd);
        }
    }

    let results = '';
    try {
        results = randexp(patrn, flags);
    } catch (err: unknown) {
        console.error(
            `Error generating from RegEx using pattern "${patrn}" and flags "${flags}" from original input "${pattern}"`,
        );
        showError(
            `Cannot generate text using the RegEx you supplied`,
            err as string,
        );
    }
    return results;
}
