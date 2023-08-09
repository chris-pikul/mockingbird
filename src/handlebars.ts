import { formatISO } from 'date-fns';
import Handlebars, { Exception } from 'handlebars';
import { window } from 'vscode';

import commands from './commands';
import { getContext } from './state';
import {
    type Command,
    type OutputFunction,
    getSelection,
    showError,
} from './vscode';

interface CompileOptions {
    data?: boolean;
    compat?: boolean;
    knownHelpers?: KnownHelpers;
    knownHelpersOnly?: boolean;
    noEscape?: boolean;
    strict?: boolean;
    assumeObjects?: boolean;
    preventIndent?: boolean;
    ignoreStandalone?: boolean;
    explicitPartialContext?: boolean;
}

const CACHE_KEY = 'mockingbird.template.cache';

const options: CompileOptions = {
    data: false,
    noEscape: true,
    strict: true,
};

function makeContext(): Record<string, any> {
    const date = new Date();
    return {
        now: {
            timestamp: {
                iso: formatISO(date, {
                    format: 'extended',
                    representation: 'complete',
                }),
                locale: date.toLocaleString(),
                unix: Date.now(),
            },
            date: {
                iso: formatISO(date, {
                    format: 'extended',
                    representation: 'date',
                }),
                locale: date.toLocaleDateString(),
            },
            time: {
                iso: formatISO(date, {
                    format: 'extended',
                    representation: 'time',
                }),
                locale: date.toLocaleTimeString(),
            },
        },
        pi: Math.PI,
        e: Math.E,
        epsilon: Number.EPSILON,
    };
}

function bindHelper(name: string, func: OutputFunction) {
    const cleanName = name.trim().toLowerCase();
    Handlebars.registerHelper(cleanName, func);
}

export function instantiateHandlebars() {
    commands.forEach((cmd: Command) => {
        if (
            cmd.templateName &&
            typeof cmd.func === 'function' &&
            !cmd.isCommand
        ) {
            if (typeof cmd.templateName === 'string') {
                bindHelper(cmd.templateName, cmd.func as OutputFunction);
            } else if (Array.isArray(cmd.templateName)) {
                cmd.templateName.forEach((name) =>
                    bindHelper(name, cmd.func as OutputFunction),
                );
            }
        }
    });
}

export function executeTemplateImmediate(template: string): string {
    try {
        const templ = Handlebars.compile(template, options);
        return templ(makeContext());
    } catch (err: unknown) {
        if (err instanceof Exception) {
            const badName = err.message.substring(
                1,
                err.message.indexOf('"', 1),
            );
            showError(
                `Failed to execute your template. Helper "${badName}" does not exist!`,
            );
        } else {
            console.error('Unknown error occured trying to execute template');
            showError(
                `Something went wrong trying to execute your template:\n${err}`,
            );
        }
    }
    return '';
}

export function cacheTemplate(): void {
    const context = getContext();
    if (!context) return showError('No available extension context!');

    const selection = getSelection();
    if (selection && selection.length > 0) {
        try {
            // Check validation
            Handlebars.precompile(selection, options);
        } catch (err: unknown) {
            if (err instanceof Exception) {
                const badName = err.message.substring(
                    1,
                    err.message.indexOf('"', 1),
                );
                showError(
                    `Failed to parse your template. Helper "${badName}" does not exist!`,
                );
            } else {
                console.error('Unknown error occured trying to cache template');
                showError(
                    `Something went wrong trying to validate your template:\n${err}`,
                );
            }
        }

        context.globalState.update(CACHE_KEY, selection);
        window.showInformationMessage(`Saved template to cache, ready to use!`);
    } else {
        showError(
            'No template was provided, please select template text and try again',
        );
    }
}

export function useCachedTemplate(length?: string): string {
    const context = getContext();
    if (!context) {
        showError('No available extension context!');
        return '';
    }

    const cached = context.globalState.get<string>(CACHE_KEY);
    if (cached) {
        try {
            const template = Handlebars.compile(cached, options);

            const len = length ? Math.max(parseInt(length), 1) : 1;
            let result = '';
            for (let i = 0; i < len; i++) {
                result += template(makeContext());

                if (i < len - 1) result += '\n';
            }
            return result;
        } catch (err: unknown) {
            if (err instanceof Exception) {
                const badName = err.message.substring(
                    1,
                    err.message.indexOf('"', 1),
                );
                showError(
                    `Failed to execute your template. Helper "${badName}" does not exist!`,
                );
            } else {
                console.error(
                    'Unknown error occured trying to use cached template',
                );
                showError(
                    `Something went wrong trying to use your cached template:\n${err}`,
                );
            }
        }
    } else {
        showError(
            'No template was cached, please select template text and use the "Cache Selection As Template" command',
        );
    }

    return '';
}
