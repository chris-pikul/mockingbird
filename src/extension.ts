import * as vscode from 'vscode';
import { registerCommand, type Command } from './vscode';

const commands: Command[] = [
	{
		key: 'helloWorld',
		func: () => 'Hello World',
	},
];

export function activate(context: vscode.ExtensionContext) {
	commands.forEach(cmd => registerCommand(context, cmd));
}

export function deactivate() {}
