import { parseRange, withDigits } from './utils';

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
    return withDigits(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function randomNegativeFloat(): string {
    return withDigits(Math.random() * Number.MIN_SAFE_INTEGER);
}

export function randomFloat(): string {
    return ((Math.random() - 0.5) * 2 * Number.MAX_SAFE_INTEGER).toPrecision(6);
}

export function randomSimpleFloat(): string {
    return withDigits(
        Math.floor((Math.random() - 0.5) * 2 * 0xffffff * 1000000) / 1000000,
    );
}

export function randomFloatRange(range: string): string {
    const [min, max] = parseRange(range);
    const actMin = Math.min(min, max);
    const actMax = Math.max(min, max);

    return withDigits(Math.random() * (actMax - actMin) + actMin);
}

export function randomPositiveInteger(): string {
    return Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}

export function randomNegativeInteger(): string {
    return Math.trunc(Math.random() * Number.MIN_SAFE_INTEGER).toString();
}

export function randomInteger(): string {
    return Math.trunc(
        (Math.random() - 0.5) * 2 * Number.MAX_SAFE_INTEGER,
    ).toString();
}

export function randomIntegerRange(range: string): string {
    const [min, max] = parseRange(range);
    const actMin = Math.min(min, max);
    const actMax = Math.max(min, max);
    return Math.trunc(Math.random() * (actMax - actMin) + actMin).toString();
}

export function randomByte(): string {
    return Math.trunc(Math.random() * 0xff).toString();
}

export function randomSignedByte(): string {
    return Math.trunc((Math.random() - 0.5) * 0xff).toString();
}

export function randomHexInteger16(): string {
    return `0x${Math.trunc(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()}`;
}

export function randomHexInteger24(): string {
    return `0x${Math.trunc(Math.random() * 0xffffff)
        .toString(16)
        .toUpperCase()}`;
}

export function randomHexInteger32(): string {
    return `0x${Math.trunc(Math.random() * 0xffffffff)
        .toString(16)
        .toUpperCase()}`;
}
