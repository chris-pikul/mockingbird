import {
    currentISODate,
    currentISOTime,
    currentISOTimestamp,
    currentLocaleDate,
    currentLocaleTime,
    currentLocaleTimestamp,
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
    {
        key: 'date-time.currentLocaleTimestamp',
        title: 'Insert: Current Timestamp Using Local Locale',
        shortTitle: 'Timestamp Local Locale',
        func: currentLocaleTimestamp,
    },
    {
        key: 'date-time.currentLocaleDate',
        title: 'Insert: Current Date Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleDate,
    },
    {
        key: 'date-time.currentLocaleTime',
        title: 'Insert: Current Time Using Local Locale',
        shortTitle: 'Date Local Locale',
        func: currentLocaleTime,
    },
];
export default commands;
