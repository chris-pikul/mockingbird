import Primes from './primes.json';
import { parseRange, withDigits } from './utils';
import { getConfigValue } from './vscode';

function rand(mult: number): number {
    return Math.random() * mult;
}

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

export function randomFloatRange(range: string): string {
    const [min, max] = parseRange(range);
    const actMin = Math.min(min, max);
    const actMax = Math.max(min, max);

    return withDigits(Math.random() * (actMax - actMin) + actMin);
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

export function randomIntegerRange(range: string): string {
    const [min, max] = parseRange(range);
    const actMin = Math.min(min, max);
    const actMax = Math.max(min, max);
    return Math.trunc(Math.random() * (actMax - actMin) + actMin).toString();
}

export function randomByte(): string {
    return Math.trunc(rand(0xff)).toString();
}

export function randomSignedByte(): string {
    return Math.trunc(randSigned(0xff)).toString();
}

export function randomShort(): string {
    return Math.trunc(rand(0xffff)).toString();
}

export function randomSignedShort(): string {
    return Math.trunc(randSigned(0xffff)).toString();
}

export function randomHexInteger16(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${Math.trunc(rand(0xffff)).toString(16).toUpperCase()}`;
}

export function randomHexInteger24(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${Math.trunc(rand(0xffffff)).toString(16).toUpperCase()}`;
}

export function randomHexInteger32(): string {
    const prefix = getConfigValue<string>('numbers.hexPrefix');
    return `${prefix}${Math.trunc(rand(0xffffffff))
        .toString(16)
        .toUpperCase()}`;
}

export function randomDigit(): string {
    return Math.trunc(Math.random() * 10).toString();
}

export function randomOctalInteger16(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${Math.trunc(rand(0xffff)).toString(8)}`;
}

export function randomOctalInteger24(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${Math.trunc(rand(0xffffff)).toString(8)}`;
}

export function randomOctalInteger32(): string {
    const prefix = getConfigValue<string>('numbers.octalPrefix');
    return `${prefix}${Math.trunc(rand(0xffffffff)).toString(8)}`;
}

export function randomBinaryInteger8(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${Math.trunc(rand(0xff)).toString(2)}`;
}

export function randomBinaryInteger16(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${Math.trunc(rand(0xffff)).toString(2)}`;
}

export function randomBinaryInteger24(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${Math.trunc(rand(0xffffff)).toString(2)}`;
}

export function randomBinaryInteger32(): string {
    const prefix = getConfigValue<string>('numbers.binaryPrefix');
    return `${prefix}${Math.trunc(rand(0xffffffff)).toString(2)}`;
}

export function randomPrime(): string {
    const ind = Math.trunc(Math.random() * Primes.length);
    return Primes[ind].toString();
}
