/**
 * Generators for real data. Specifically, date and time.
 *
 * @module MockingBird
 * @author Chris Pikul
 */
import { format, formatISO } from 'date-fns';

import { parseRange, randInt } from './utils';
import { getConfigValue } from './vscode';

function adjustISOTimezone(str: string): string {
    if (getConfigValue<boolean>('date-time.randomTimezone') === false)
        return str;

    const timePos = Math.max(
        str.lastIndexOf('Z'),
        str.lastIndexOf('+'),
        str.lastIndexOf('-'),
    );
    const newTZ = randInt(-11, 12);

    const start = str.substring(0, timePos);
    if (newTZ === 0) return `${start}Z`;
    return `${start}${Math.sign(newTZ) > 0 ? '+' : '-'}${Math.abs(newTZ)
        .toString()
        .padStart(2, '0')}:00`;
}

export function currentISOTimestamp(): string {
    return formatISO(new Date(), {
        format: 'extended',
        representation: 'complete',
    });
}

export function currentISODate(): string {
    return formatISO(new Date(), {
        format: 'extended',
        representation: 'date',
    });
}

export function currentISOTime(): string {
    return formatISO(new Date(), {
        format: 'extended',
        representation: 'time',
    });
}

export function currentLocaleTimestamp(): string {
    return new Date().toLocaleString();
}

export function currentLocaleDate(): string {
    return new Date().toLocaleDateString();
}

export function currentLocaleTime(): string {
    return new Date().toLocaleTimeString();
}

export function currentTimestampFormatted(fmtStr: string): string {
    return format(new Date(), fmtStr);
}

export function randomYear(range?: string): string {
    let min = 1900;
    let max = new Date().getFullYear();
    if (range) [min, max] = parseRange(range);

    return randInt(min, max + 1).toString();
}

export function randomMonth(): string {
    return randInt(1, 13).toString();
}

export function randomDay(): string {
    return randInt(1, 31).toString();
}

export function randomISOTimestamp(): string {
    const unix = randInt(Date.now());
    return adjustISOTimezone(
        formatISO(unix, { format: 'extended', representation: 'complete' }),
    );
}

export function randomISODate(): string {
    const unix = randInt(Date.now());
    return formatISO(unix, { format: 'extended', representation: 'date' });
}

export function randomISOTime(): string {
    const unix = randInt(0xffffffff);
    return adjustISOTimezone(
        formatISO(unix, {
            format: 'extended',
            representation: 'time',
        }),
    );
}
