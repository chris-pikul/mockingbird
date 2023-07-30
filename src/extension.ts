import * as vscode from 'vscode';

import commands from './commands';
import { setContext } from './state';
import { registerCommand } from './vscode';

export function activate(context: vscode.ExtensionContext) {
    setContext(context);
    commands.forEach((cmd) => registerCommand(context, cmd));
}

export function deactivate() {}
