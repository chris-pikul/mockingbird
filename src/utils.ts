export function withDigits(value: number, digits = 6): string {
    return (
        Math.floor(value * Math.pow(10, digits)) / Math.pow(10, digits)
    ).toString();
}

export function parseRange(input: string): [number, number] {
    const clean = input.trim();
    const spaceInd = clean.indexOf(' ');
    if (spaceInd > 0) {
        return [
            Number.parseFloat(input.substring(0, spaceInd)),
            Number.parseFloat(input.substring(spaceInd + 1)),
        ];
    }
    return [Number.NaN, Number.NaN];
}

/**
 * Returns a random float within the given range, maximum not inclusive.
 *
 * @param min Minimum value
 * @param max Maximum value non-inclusive
 * @returns New float
 */
export function randRange(min: number = 0, max: number = 1): number {
    const actMin = Math.min(min, max);
    const actMax = Math.max(min, max);
    return Math.random() * (actMax - actMin) + actMin;
}

/**
 * Returns a random integer within the given range, maximum not inclusive.
 *
 * @see {@link randRange} for actual implementation
 * @param min Minimum value
 * @param max Maximum value non-inclusive
 * @returns New float
 */
export function randIntRange(min: number = 0, max: number = 100): number {
    return Math.trunc(randRange(min, max));
}

/**
 * Returns a random float with flexible argument options.
 *
 * If only 1 argument is provided, it returns a number between 0..Arg0.
 * If 2 arguments are provided, it returns within Arg0..Arg1.
 * If no arguments are given, it returns within 0..1
 *
 * @param arg0 A number
 * @param arg1 A number
 * @returns New floating point number
 */
export function rand(arg0?: number, arg1?: number): number {
    if (typeof arg1 === 'number') {
        if (typeof arg0 === 'number') return randRange(arg0, arg1);
        return randRange(0, arg1);
    } else if (typeof arg0 === 'number') {
        return randRange(0, arg0);
    }

    return randRange();
}

/**
 * Returns a random integer with flexible argument options.
 *
 * If only 1 argument is provided, it returns a number between 0..Arg0.
 * If 2 arguments are provided, it returns within Arg0..Arg1.
 * If no arguments are given, it returns within 0..1
 *
 * @param arg0 A number
 * @param arg1 A number
 * @returns New integer number
 */
export function randInt(arg0?: number, arg1?: number): number {
    return Math.trunc(rand(arg0, arg1));
}

/**
 * Combines the variadic arguments into one string.
 *
 * @param sets... any number of strings
 * @returns Single string of all strings joined
 */
export function buildCharacterSet(...sets: string[]): string {
    return sets.join('');
}

/**
 * Constructs a new closure that builds a character set from the variadic
 * argument of strings supplied. The returned function when called returns a
 * random string from that character set.
 *
 * @param sets... any number of strings
 * @returns Function that returns a single character from all sets
 */
export function buildRandomCharFromSet(...sets: string[]): () => string {
    const alpha = buildCharacterSet(...sets);

    return () => alpha[randIntRange(0, alpha.length)];
}
