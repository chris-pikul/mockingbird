import { ExtensionContext } from 'vscode';

let context: ExtensionContext | null = null;

export function setContext(ctx: ExtensionContext): void {
    context = ctx;
}

export function getContext(): ExtensionContext | null {
    return context;
}
