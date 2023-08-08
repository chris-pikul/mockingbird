import { rand, randInt, withDigits } from './utils';

export function longitude(): string {
    return withDigits(rand(-179.99999, 180), 4);
}

export function latitude(): string {
    return withDigits(rand(-89.99999, 90), 4);
}

export function gpsDMS(): string {
    const east = rand(-179, 180);
    const north = rand(-90, 90);

    return `${Math.abs(Math.trunc(north))}°${randInt(60)}'${withDigits(
        rand(60),
        1,
    )}"${north >= 0 ? 'N' : 'S'} ${Math.abs(Math.trunc(east))}°${randInt(
        60,
    )}'${withDigits(rand(60), 1)}"${east >= 0 ? 'E' : 'W'}`;
}

export function gpsDMM(): string {
    const north = randInt(-90, 90);
    const east = randInt(-180, 180);

    return `${north} ${withDigits(rand(60), 4)}, ${east} ${withDigits(
        rand(60),
        4,
    )}`;
}

export function gpsDD(): string {
    const north = rand(-90, 90);
    const east = rand(-180, 180);

    return `${withDigits(north, 5)}, ${withDigits(east, 5)}`;
}
