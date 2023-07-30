import { QuickPickItem, window, workspace } from 'vscode';

import { fromRegex } from './misc';
import { getSelection, insertWithGenerator, showError } from './vscode';

export type RegExPreset = {
    key: string;
    name: string;
    pattern: string;
};

export type RegExPresetQuickPick = QuickPickItem & RegExPreset;

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
        key,
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
