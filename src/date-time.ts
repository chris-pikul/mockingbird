/**
 * Generators for real data. Specifically, date and time.
 *
 * @module MockingBird
 * @author Chris Pikul
 */
import { format, formatISO } from 'date-fns';

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
