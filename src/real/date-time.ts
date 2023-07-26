/**
 * Generators for real data. Specifically, date and time.
 *
 * @module MockingBird
 * @author Chris Pikul
 */
import { formatISO } from 'date-fns';

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
