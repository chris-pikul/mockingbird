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
