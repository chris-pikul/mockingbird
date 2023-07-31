import { CommandPrompt } from './vscode';

export const PROMPT_LENGTH: CommandPrompt = {
    message: 'Supply a length to generate as an integer',
    placeholder: '10',
    validator: (input?: string) => {
        if (!input) return false;
        const check = parseInt(input);
        return Number.isFinite(check) && check > 0;
    },
    errorMessage: 'Please provide an integer number above 0',
} as const;

export const PROMPT_SAVE_REGEX: CommandPrompt = {
    message:
        'Please provide a name for the Regular Expression preset. (minimum of 2 characters)',
    placeholder: 'My Preset',
    validator: (input?: string) => !!(input && input.length > 1),
    errorMessage: 'Please provide a name consisting of at least 2 characters',
} as const;

export const PROMPT_PATTERN: CommandPrompt = {
    message: 'Enter your pattern bellow and it will be used to generate once.',
    placeholder: 'The room is {{colorName}}',
    validator: (input?: string) => !!(input && input.length > 1),
    errorMessage:
        'Please provide a pattern consisting of at least 2 characters',
} as const;
