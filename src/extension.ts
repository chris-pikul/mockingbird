import * as vscode from 'vscode';

import commands from './commands';
import { registerCommand } from './vscode';

export function activate(context: vscode.ExtensionContext) {
    commands.forEach((cmd) => registerCommand(context, cmd));
}

export function deactivate() {}
