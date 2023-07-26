import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
} from './real/date-time';
import { Command } from './vscode';

const commands: Command[] = [
    {
        key: 'real.currentISOTimestamp',
        title: 'Insert: Current ISO Timestamp',
        shortTitle: 'ISO Timestamp',
        func: currentISOTimestamp,
    },
    {
        key: 'real.date-time.currentISODate',
        title: 'Insert: Current ISO Date',
        shortTitle: 'ISO Date',
        func: currentISODate,
    },
    {
        key: 'real.date-time.currentISOTime',
        title: 'Insert: Current ISO Time',
        shortTitle: 'ISO Time',
        func: currentISOTime,
    },
];
export default commands;
