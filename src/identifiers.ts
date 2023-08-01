import base32Encode from 'base32-encode';

import { randInt } from './utils';

const bit64 = BigInt('0xffffffffffffffff');

export function serial(): string {
    return randInt(0xffffffff).toString();
}

export function bigserial(): string {
    let num = BigInt(randInt(Number.MAX_SAFE_INTEGER));

    num = (num ^ (num << BigInt(13))) % bit64;
    num = (num ^ (num >> BigInt(7))) % bit64;
    num = (num ^ (num << BigInt(17))) % bit64;

    return num.toString();
}

export function guid(): string {
    const final = randInt(0xffffffff) ^ Date.now();

    let hexes = `${final}`;
    do hexes = randInt(0xffffffff).toString(16) + hexes;
    while (hexes.length < 32);

    return `${hexes.substring(0, 8)}-${hexes.substring(
        8,
        12,
    )}-${hexes.substring(12, 16)}-${hexes.substring(16, 20)}-${hexes.substring(
        20,
        32,
    )}`.toUpperCase();
}

export function uuid(): string {
    const randArr = new Uint8Array(128).map(() => randInt(0xff));
    randArr[6] = (randArr[6] & 0x0f) | 0x40;
    randArr[8] = (randArr[8] & 0x3f) | 0x80;

    let hexes = '';
    for (const byte of randArr) hexes += byte.toString(16);

    return `${hexes.substring(0, 8)}-${hexes.substring(
        8,
        12,
    )}-${hexes.substring(12, 16)}-${hexes.substring(16, 20)}-${hexes.substring(
        20,
        32,
    )}`.toLowerCase();
}

export function urid(): string {
    const id = uuid().replace(/\-/g, '');
    const text = new TextEncoder();

    return base32Encode(text.encode(id), 'RFC4648', {
        padding: false,
    })
        .toUpperCase()
        .substring(8, 8 + 26);
}
