import cities from './data/cities.json';
import countries from './data/countries.json';
import states from './data/states.json';
import { randomBool } from './misc';
import { randomDigit, randomDigits } from './numbers';
import { middleName } from './person';
import {
    executeRepeated,
    rand,
    randFromArray,
    randInt,
    withDigits,
} from './utils';

const stateCodes = Object.keys(states);
const stateNames = Object.values(states);

const countryCodes = Object.keys(countries);
const countryNames = Object.values(countries);

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

export function city(): string {
    return randFromArray(cities);
}

export function stateCode(): string {
    return randFromArray(stateCodes);
}

export function stateName(): string {
    return randFromArray(stateNames);
}

export function countryCode(): string {
    return randFromArray(countryCodes);
}

export function countryName(): string {
    return randFromArray(countryNames);
}

export function postZip(): string {
    return `${randInt(1, 10)}${randomDigits('4')}`;
}

export function usStreetAddress(): string {
    const numb = randInt(1, 10).toString() + executeRepeated(randomDigit, 0, 8);
    const name = middleName();
    const postfix = randFromArray([
        'St,',
        'Dr.',
        'Ave.',
        'Blvd.',
        'Ln.',
        'Circle',
    ]);

    let apart = '';
    if (randomBool()) apart = `Apt. ${randInt(1, 999)}`;

    return `${numb} ${name} ${postfix} ${apart}`.trim();
}
