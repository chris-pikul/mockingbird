import Primes from './data/primes.json';
import {
    executeRepeated,
    parseArgumentsRange,
    parseLength,
    rand,
    randChar,
    randInt,
    randPerc,
    withDigits,
} from './utils';
import { getConfigValue } from './vscode';

const hexAlpha = '0123456789ABCDEF';

function randSigned(mult: number): number {
    return (Math.random() - 0.5) * 2 * mult;
}

export function getPI(): string {
    return withDigits(Math.PI);
}

export function getE(): string {
    return withDigits(Math.E);
}

export function getEpsilon(): string {
    return Number.EPSILON.toString();
}

export function randomUnit(): string {
    return withDigits(Math.random());
}

export function randomPositiveFloat(): string {
    return withDigits(rand(Number.MAX_SAFE_INTEGER));
}

export function randomNegativeFloat(): string {
    return withDigits(rand(Number.MIN_SAFE_INTEGER));
}

export function randomFloat(): string {
    return randSigned(Number.MAX_SAFE_INTEGER).toString();
}

export function randomSimpleFloat(): string {
    return withDigits(randSigned(Number.MAX_SAFE_INTEGER));
}

export function randomFloatRange(_arg0?: string, _arg1?: string): string {
    const [min, max] = parseArgumentsRange(
        arguments,
        0,
        Number.MAX_SAFE_INTEGER,
    );
    return withDigits(rand(min, max));
}

export function randomPositiveInteger(): string {
    return Math.trunc(rand(Number.MAX_SAFE_INTEGER)).toString();
}

export function randomNegativeInteger(): string {
    return Math.trunc(rand(Number.MIN_SAFE_INTEGER)).toString();
}

export function randomInteger(): string {
    return Math.trunc(randSigned(Number.MAX_SAFE_INTEGER)).toString();
}

export function randomInteger32(): string {
    return Math.trunc(randSigned(0xffffffff)).toString();
}

export function randomIntegerRange(_arg0?: string, _arg1?: string): string {
    const [min, max] = parseArgumentsRange(
        arguments,
        0,
        Number.MAX_SAFE_INTEGER,
    );
    return randInt(min, max).toString();
}

export function randomByte(): string {
    return randInt(0xff).toString();
}

export function randomSignedByte(): string {
    return Math.trunc(randSigned(0xff)).toString();
}

export function randomShort(): string {
    return randInt(0xffff).toString();
}

export function randomSignedShort(): string {
    return Math.trunc(randSigned(0xffff)).toString();
}

export function randomHexInteger16(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${randInt(0xffff).toString(16).toUpperCase()}`;
}

export function randomHexInteger24(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${randInt(0xffffff).toString(16).toUpperCase()}`;
}

export function randomHexInteger32(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${randInt(0xffffffff).toString(16).toUpperCase()}`;
}

export function hex(length?: number | string): string {
    const len = parseLength(length);
    return executeRepeated(() => randChar(hexAlpha), len);
}

export function randomDigit(): string {
    return randInt(10).toString();
}

export function randomOctalInteger16(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${randInt(0xffff).toString(8)}`;
}

export function randomOctalInteger24(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${randInt(0xffffff).toString(8)}`;
}

export function randomOctalInteger32(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${randInt(0xffffffff).toString(8)}`;
}

export function randomBinaryInteger8(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${randInt(0xff).toString(2)}`;
}

export function randomBinaryInteger16(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${randInt(0xffff).toString(2)}`;
}

export function randomBinaryInteger24(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${randInt(0xffffff).toString(2)}`;
}

export function randomBinaryInteger32(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${randInt(0xffffffff).toString(2)}`;
}

export function randomPrime(): string {
    return Primes[randInt(Primes.length)].toString();
}

export function randomPercentage(): string {
    return randPerc();
}

export function randomDigits(len: string): string {
    const length = parseInt(len);
    let result = '';
    for (let i = 0; i < length; i++) result += randomDigit();
    return result;
}

export function degree(): string {
    return randInt(0, 360).toString();
}

export function radians(): string {
    return withDigits(rand(0, 2 * Math.PI), 2);
}
