import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
} from './real/date-time';
import { Command } from './vscode';

const commands: Command[] = [
    {
        key: 'real.currentISOTimestamp',
        func: currentISOTimestamp,
    },
    {
        key: 'real.currentISODate',
        func: currentISODate,
    },
    {
        key: 'real.currentISOTime',
        func: currentISOTime,
    },
];
export default commands;
