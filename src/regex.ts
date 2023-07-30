import { randexp } from 'randexp';
import { QuickPickItem, window, workspace } from 'vscode';

import { getSelection, insertWithGenerator, showError } from './vscode';

export type RegExPreset = {
    name: string;
    pattern: string;
};

export type RegExPresetQuickPick = QuickPickItem & RegExPreset;

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

export function saveRegexPreset(name?: string): void {
    if (!name) return;

    const selection = getSelection();
    if (!selection || selection.length === 0) {
        return showError(
            'Cannot save an empty selection as a Regular Expression preset!',
        );
    }

    const key = name.toLowerCase().replace(/[^\w\d]*/gi, '');

    const preset: RegExPreset = {
        name,
        pattern: selection,
    };

    console.error('Saving preset', preset);

    const section = workspace.getConfiguration('mockingbird.presets');
    const dict =
        section.get<Record<string, RegExPreset>>('regularExpression') ?? {};
    dict[key] = preset;

    const isGlobal = !!!workspace.name;

    section.update('regularExpression', dict, isGlobal);

    window.showInformationMessage(
        `Saved${
            isGlobal ? ' global ' : ' '
        }RegularExpression preset "${name}" as "${selection}"`,
    );
}

export function useRegexPreset(): void {
    const section = workspace.getConfiguration('mockingbird.presets');
    const dict =
        section.get<Record<string, RegExPreset>>('regularExpression') ?? {};

    if (Object.keys(dict).length > 0) {
        const options: RegExPresetQuickPick[] = Object.values(dict).map(
            (preset) => ({
                ...preset,
                label: preset.name,
                detail: preset.pattern,
            }),
        );
        window
            .showQuickPick(options, {
                canPickMany: false,
                title: 'Regular Expression Preset',
            })
            .then((opt?: RegExPresetQuickPick) => {
                if (!opt) return;

                insertWithGenerator(fromRegex, opt.pattern);
            });
    } else {
        showError(`There are no saved Regular Expression presets!`);
    }
}
