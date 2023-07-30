import { window } from 'vscode';

import { getContext } from './state';
import { getSelection, showError } from './vscode';

const regexTemplate = /(?<!\\){{(.+?)}}/g;

export type PatternArg = number | boolean | string;

export type PatternFunction = (...args: any[]) => string;

const directiveDB: Record<string, PatternFunction> = {
    name: () => 'Bob',
    function: (min: number, max: number) =>
        (Math.random() * (max - min) + min).toString(),
} as const;

function convertArgument(arg: string): PatternArg {
    if (arg.charAt(0) === '"') {
        const lastQuote = arg.lastIndexOf('"');
        if (lastQuote > 1) return arg.substring(1, lastQuote);
        throw new TypeError(
            `Interpreted "${arg}" as a string, but no ending quote was found`,
        );
    }

    const lower = arg.toLowerCase();
    if (lower === 'true' || lower === 'false') return lower === 'true';

    // For now, only the primitives
    return parseFloat(arg);
}

function executeDirective(directive: string): string {
    const firstParen = directive.indexOf('(');
    const lastParen = directive.lastIndexOf(')');

    let func: string = '';
    let args: string[] = [];
    if (firstParen > 1 && lastParen > 2) {
        func = directive.substring(0, firstParen).toLowerCase().trim();
        args = directive
            .substring(firstParen + 1, lastParen)
            .split(',')
            .map((arg) => arg.trim());
    } else {
        func = directive.toLowerCase().trim();
    }

    if (func in directiveDB)
        return directiveDB[func].apply(null, args.map(convertArgument));

    throw new Error(
        `No pattern directive "${func}" exists, please check the pattern and try again`,
    );
}

export function usePattern(pattern: string): string {
    let result = '';
    const matches = pattern.matchAll(regexTemplate);
    let lastEnd = 0;
    for (const match of matches) {
        const [templ] = match;
        const start = match.index ?? 0;
        const end = start + templ.length;

        result += pattern.substring(lastEnd, start);

        const directive = templ.substring(2, templ.length - 2);
        result += executeDirective(directive);

        lastEnd = end;
    }

    // Add remainder
    result += pattern.substring(lastEnd + 1);

    return result;
}

export function cachePattern(): void {
    const context = getContext();
    if (!context) return showError('No available extension context!');

    const selection = getSelection();
    if (selection && selection.length > 0) {
        context.globalState.update('mockingbird.pattern.cache', selection);
        window.showInformationMessage(`Saved pattern to cache, ready to use!`);
    } else {
        showError(
            'No pattern was provided, please select a pattern and try again',
        );
    }
}

export function useCachedPattern(length?: string): string {
    const context = getContext();
    if (!context) {
        showError('No available extension context!');
        return '';
    }

    const cached = context.globalState.get<string>('mockingbird.pattern.cache');
    if (cached) {
        const len = length ? Math.max(parseInt(length), 1) : 1;
        let result = '';
        for (let i = 0; i < len; i++) {
            result += usePattern(cached);

            if (i < len - 1) result += '\n';
        }
        return result;
    }

    showError(
        'No pattern was cached, please select a pattern and use the "Cache Selection As Pattern" command',
    );
    return '';
}
