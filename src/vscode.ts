/**
 * VSCode utilities and wrappers
 *
 * @author Chris Pikul
 */
import * as vscode from 'vscode';

/**
 * A function that returns a string for generating new text
 */
export type OutputFunction = (...args: any[]) => string;

/**
 * If a command can have a prompt, then these are the options for that operation.
 */
export type CommandPrompt = {
    message: string;
    placeholder?: string;
    validator?: (input?: string) => boolean | string;
    errorMessage?: string;
    defaultValue?: string;
};

/**
 * Declares a command that can be registered. If the `type` field is missing,
 * than `generator` is assumed.
 */
export type Command = {
    key: string;
    category?: string;
    title: string;
    shortTitle?: string;
    func: OutputFunction;
    prompt?: CommandPrompt;
};

/**
 * Makes a command key by prefixing it with the known global prefix "mb."
 *
 * @param key command key
 * @returns new string
 */
export function makeCommandKey(key: string): string {
    return `mb.${key}`;
}

/**
 * Shortcut for showing an error message on screen.
 *
 * @param message Message to desplay
 * @param items Additional message items
 */
export function showError(message: string, ...items: string[]): void {
    vscode.window.showErrorMessage(message, ...items);
}

/**
 * Utility to calculate a new selection based on the new source text length.
 *
 * @param selection Current selection
 * @param source New text being inserted
 * @returns New selection with correct length
 */
export function getEndSelection(
    selection: vscode.Selection,
    source: string,
): vscode.Selection {
    const pos = new vscode.Position(
        selection.start.line,
        selection.start.character + source.length,
    );
    return new vscode.Selection(pos, pos);
}

/**
 * Inserts text into the current active editor, at all cursors.
 *
 * NOTE: This will insert the same text at each cursor position.
 *
 * @param source New text to be inserted
 */
export function insert(source: string): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return showError('No active text editor is available');

    const selections: vscode.Selection[] = [];
    editor
        .edit((builder) => {
            editor.selections.forEach((selection) => {
                builder.replace(selection, source);
                selections.push(getEndSelection(selection, source));
            });
        })
        .then(() => {
            editor.selections = selections;
        });
}

/**
 * Inserts text into the current active editor, at all cursors.
 *
 * NOTE: This will call the provided generator for each cursor position.
 *
 * @param func Function that returns new source text
 */
export function insertWithGenerator(
    func: OutputFunction,
    ...args: (string | undefined)[]
): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return showError('No active text editor is available');

    const selections: vscode.Selection[] = [];
    editor
        .edit((builder) => {
            editor.selections.forEach((selection) => {
                const text = func(...args);
                builder.replace(selection, text);
                selections.push(getEndSelection(selection, text));
            });
        })
        .then(() => {
            editor.selections = selections;
        });
}

/**
 * Registers a new command that will generate new source text.
 *
 * Uses the {@link insertWithGenerator} function to re-generate the text at
 * each cursor position.
 *
 * @param context VSCode extension context
 * @param cmd Given command to register
 */
export function registerGeneratorCommand(
    context: vscode.ExtensionContext,
    cmd: Command,
) {
    const handle = vscode.commands.registerTextEditorCommand(
        makeCommandKey(cmd.key),
        () => insertWithGenerator(cmd.func),
    );
    context.subscriptions.push(handle);
}

export function registerPromptGeneratorCommand(
    context: vscode.ExtensionContext,
    cmd: Command,
) {
    if (typeof cmd.prompt === 'undefined')
        throw new Error('Command is missing prompt options');

    const handle = vscode.commands.registerTextEditorCommand(
        makeCommandKey(cmd.key),
        () => {
            vscode.window
                .showInputBox({
                    title: cmd.shortTitle,
                    prompt: cmd.prompt?.message,
                    placeHolder: cmd.prompt?.placeholder,
                    value: cmd.prompt?.defaultValue,
                    validateInput: (input: string) => {
                        if (cmd.prompt && cmd.prompt.validator) {
                            const result = cmd.prompt.validator(input);
                            if (typeof result === 'string') return result;
                            else if (
                                typeof result === 'boolean' &&
                                result === false
                            )
                                return 'The value you entered is invalid, please try again';
                        }
                        return null;
                    },
                })
                .then((value?: string) => insertWithGenerator(cmd.func, value));
        },
    );
    context.subscriptions.push(handle);
}

/**
 * Registers a {@link Command} with the editor. The type is taken into
 * consideration when registering. The key will be completed for use with the
 * `package.json` keys.
 *
 * Essentially differs to the following helpers based on type:
 * - `generator` -> {@link registerGeneratorCommand}
 *
 * @param context VSCode extension context
 * @param cmd Given command to register
 */
export function registerCommand(
    context: vscode.ExtensionContext,
    cmd: Command,
) {
    if (cmd.prompt) registerPromptGeneratorCommand(context, cmd);
    else if (typeof cmd.func === 'function')
        registerGeneratorCommand(context, cmd);
    else console.error(`Invalid command "${cmd.key}"!`);
}

/**
 * Get a configuration value using the given setting key.
 * Searches globally within the workspace.
 *
 * @param key Workspace setting key
 * @returns Value at that key
 */
export function getGlobalConfigValue<T = unknown>(key: string): T {
    const lastDot = key.lastIndexOf('.');

    const section = key.substring(0, lastDot);
    const prop = key.substring(lastDot + 1);

    return vscode.workspace.getConfiguration(section).get(prop) as T;
}

/**
 * Get a configuration value within the Mockingbird settings using the
 * given sub-key. This will prefix the key for you.
 *
 * @see {@link getGlobalConfigValue} for the real implementation
 * @param key Setting key within Mockingbird
 * @returns Value at that key
 */
export function getConfigValue<T = unknown>(key: string): T {
    return getGlobalConfigValue<T>(`mockingbird.${key}`);
}
