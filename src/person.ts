import FirstNames from './data/firstNames.json';
import LastNames from './data/lastNames.json';
import { randomLatinLetterUpper } from './text';
import { randFromArray, randInt } from './utils';

const allNames = [...FirstNames, ...LastNames];

export function firstName(): string {
    return randFromArray(FirstNames);
}

export function lastName(): string {
    return randFromArray(LastNames);
}

export function middleName(): string {
    return randFromArray(allNames);
}

export function middleInitial(): string {
    return randomLatinLetterUpper();
}

export function fullName(): string {
    // Use Middle Name
    if (randInt(0, 10) <= 3) {
        if (randInt(0, 10) <= 1)
            return `${firstName()} ${middleName()} ${middleName()} ${lastName()}`;
        return `${firstName()} ${middleName()} ${lastName()}`;
    }

    return `${firstName()} ${lastName()}`;
}
