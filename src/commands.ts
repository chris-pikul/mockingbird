import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
} from './real/date-time';
import { Command } from './vscode';

const commands: Command[] = [
    {
        key: 'date-time.currentISOTimestamp',
        title: 'Insert: Current ISO Timestamp',
        shortTitle: 'ISO Timestamp',
        func: currentISOTimestamp,
    },
    {
        key: 'date-time.currentISODate',
        title: 'Insert: Current ISO Date',
        shortTitle: 'ISO Date',
        func: currentISODate,
    },
    {
        key: 'date-time.currentISOTime',
        title: 'Insert: Current ISO Time',
        shortTitle: 'ISO Time',
        func: currentISOTime,
    },
];
export default commands;
