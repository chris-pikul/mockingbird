/**
 * VSCode utilities and wrappers
 * 
 * @author Chris Pikul
 */
import * as vscode from 'vscode';

/**
 * Specifies the type of command, essentially how it is expected to be used.
 * 
 * Options (for now) include:
 * - `generator` the function generates new source code
 * 
 */
export type ECommandType = 'generator';

/**
 * A function that returns a string for generating new text
 */
export type OutputFunction = () => string;

/**
 * Declares a command that can be registered. If the `type` field is missing,
 * than `generator` is assumed.
 */
export type Command = {
    key: string;
    type?: ECommandType;
    func: OutputFunction;
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
export function getEndSelection(selection: vscode.Selection, source: string): vscode.Selection {
    const pos = new vscode.Position(selection.start.line, selection.start.character + source.length);
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
    if(!editor)
        return showError("No active text editor is available");

    const selections: vscode.Selection[] = [];
    editor.edit(builder => {
        editor.selections.forEach(selection => {
            builder.replace(selection, source);
            selections.push(getEndSelection(selection, source));
        });
    }).then(() => {
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
export function insertWithGenerator(func: OutputFunction): void {
    const editor = vscode.window.activeTextEditor;
    if(!editor)
        return showError("No active text editor is available");

    const selections: vscode.Selection[] = [];
    editor.edit(builder => {
        editor.selections.forEach(selection => {
            const text = func();
            builder.replace(selection, text);
            selections.push(getEndSelection(selection, text));
        });
    }).then(() => {
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
export function registerGeneratorCommand(context: vscode.ExtensionContext, cmd: Command) {
    const handle = vscode.commands.registerCommand(makeCommandKey(cmd.key), () => insertWithGenerator(cmd.func));
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
export function registerCommand(context: vscode.ExtensionContext, cmd: Command) {
    switch(cmd.type ?? 'generator') {
        case 'generator':
            registerGeneratorCommand(context, cmd);
            break;
        default:
            console.error(`Unknown command type "${cmd.type}"!`);
    }
}
