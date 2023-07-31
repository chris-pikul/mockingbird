import { randomBool } from './misc';
import { OutputFunction } from './vscode';

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
 * Returns a random fraction with up to 2 digits in the decimal place.
 *
 * @returns New float
 */
export function randFrac(): number {
    return Math.floor(Math.random() * 100) / 100;
}

/**
 * Returns a random whole integer percentage with sign at the end.
 *
 * @returns New string
 */
export function randPerc(): string {
    return `${Math.floor(Math.random() * 100).toString()}%`;
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

export type RandRange = [number, number];

/**
 * Takes variadic amount of range tuples `[min, max]` and finds a random index
 * that uniformaly sits within the given ranges.
 *
 * Useful if you want a random number between a set of ranges that have gaps
 * between them (think Unicode blocks).
 *
 * @param ranges... `[min, max]` tuples.
 * @returns Number that lies within one of the given ranges' range.
 */
export function randFromRanges(...ranges: RandRange[]): number {
    const cleanRanges = ranges.map(([min, max]) => [
        Math.min(min, max),
        Math.max(min, max),
    ]);
    const totalRange = cleanRanges.reduce(
        (acc, [min, max]) => acc + (max - min),
        0,
    );
    const target = randInt(totalRange + 1);

    let walkTotal = 0;
    for (let i = 0; i < cleanRanges.length; i++) {
        const [min, max] = cleanRanges[i];
        const size = max - min;

        if (target >= walkTotal && target <= walkTotal + size)
            return min + (target - walkTotal);

        walkTotal += size;
    }

    console.error(
        `Attempted to find random value ${target} within ranges but failed to find match`,
    );
    return ranges[0][0];
}

/**
 * Returns a random entry from the given array.
 *
 * @param arr Array of items
 * @returns Item from array
 */
export function randFromArray<T = string>(arr: T[]): T {
    return arr[randInt(arr.length)];
}

/**
 * Given variadic arguments of functions, will execute one of them randomly.
 *
 * @param args... Output functions returning a string
 * @returns String from running one of the supplied functions.
 */
export function executeOneOf(...args: OutputFunction[]): string {
    return randFromArray(args)();
}

/**
 * Execute the given function a number of times and concat the results then
 * return them.
 *
 * @param func Function to execute that returns a string
 * @param arg0 Optional minimum number of executions
 * @param arg1 Optional maximum number of executions
 * @returns Concated string of function results
 */
export function executeRepeated<T extends OutputFunction>(
    func: T,
    arg0?: number,
    arg1?: number,
): string {
    let results: string = '';

    for (let i = 0; i < randInt(arg0, arg1); i++) results += func();

    return results;
}

/**
 * Optionally execute the function and return. Could happen, could not.
 * @param func Function to execute that returns a string
 * @returns Results from the function, or an empty string
 */
export function executeOptionally<T extends OutputFunction>(func: T): string {
    if (randomBool()) return func();
    return '';
}

/**
 * Return one of the given options in the variadic arguments
 * @param args... Strings to pick from
 * @returns One of the provided strings
 */
export function pick(...args: string[]): string {
    return randFromArray(args);
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

/**
 * Constructs a new closure that takes in a length argument and repeats the
 * given generator function for that length to build a new string and return
 * it.
 *
 * @param func Generator function to run
 * @returns New string accepting a length string parameter
 */
export function buildLengthRepeater(
    func: () => string,
): (length?: string) => string {
    return (length?: string) => {
        const len = Math.max(parseInt(length ?? '1'), 1);
        let result = '';
        for (let i = 0; i < len; i++) result += func();
        return result;
    };
}

const SQRT_2PI = Math.sqrt(Math.PI * 2);

/**
 * Samples a normal distribution (Gaussian) using the provided sample point and
 * mean/deviation parameters
 *
 * @returns Number
 */
export function normal(
    sample: number,
    mean: number,
    deviation: number,
): number {
    return (
        (1 / (deviation * SQRT_2PI)) *
        Math.pow(Math.E, -0.5 * Math.pow((sample - mean) / deviation, 2))
    );
}

/**
 * Random number using Box-Mueller transform for normal distribution.
 *
 * @see https://stackoverflow.com/a/49434653
 * @returns Number between 0..1
 */
export function randBM(): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5;
    if (num > 1 || num < 0) return randBM();
    return num;
}

/**
 * Random number using Box-Mueller transform for normal distribution.
 *
 * @see https://stackoverflow.com/a/49434653
 * @returns Number between 0..1
 */
export function randBMRange(min: number, max: number, skew = 1): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5;
    if (num > 1 || num < 0) {
        num = randBMRange(min, max, skew);
    } else {
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
    }
    return num;
}

export function clamp(min: number, value: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}
