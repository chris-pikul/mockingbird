import { parseRange, withDigits } from './utils';

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
    return `0x${Math.trunc(rand(0xffff)).toString(16).toUpperCase()}`;
}

export function randomHexInteger24(): string {
    return `0x${Math.trunc(rand(0xffffff)).toString(16).toUpperCase()}`;
}

export function randomHexInteger32(): string {
    return `0x${Math.trunc(rand(0xffffffff)).toString(16).toUpperCase()}`;
}

export function randomDigit(): string {
    return Math.trunc(Math.random() * 10).toString();
}
