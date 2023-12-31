import EmailProviders from './data/email-providers.json';
import FirstNames from './data/firstNames.json';
import LastNames from './data/lastNames.json';
import { randomDigit, randomDigits } from './numbers';
import { englishAdverb, englishNoun, randomLatinLetterUpper } from './text';
import {
    clamp,
    executeOneOf,
    executeOptionally,
    executeRepeated,
    pick,
    randBMRange,
    randFromArray,
    randInt,
} from './utils';

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

export function phoneNumberUS(): string {
    return `(${randInt(1, 10)}${randomDigits('2')})${randInt(
        1,
        10,
    )}${randomDigits('2')}-${randomDigits('4')}`;
}

export function phoneNumberUK(): string {
    return `+44 0${randInt(20, 999)} ${randomDigits('4')} ${randomDigits('4')}`;
}

export function phoneNumberDE(): string {
    return `+49 ${randomDigits('3')} ${randomDigits('3')} ${randomDigits('4')}`;
}

export function phoneNumberFR(): string {
    return `+33 ${randInt(1, 10)} ${randomDigits('2')} ${randomDigits(
        '2',
    )} ${randomDigits('2')} ${randomDigits('2')}`;
}

export function phoneNumberIT(): string {
    return `+39 ${randomDigits('2')} ${randomDigits('4')} ${randomDigits('4')}`;
}

export function phoneNumberEU(): string {
    return executeOneOf(
        phoneNumberUK,
        phoneNumberDE,
        phoneNumberFR,
        phoneNumberIT,
    );
}

export function phoneNumberE164(): string {
    return `+${randInt(1, 10)}${executeRepeated(randomDigit, 5, 15)}`;
}

export function email(): string {
    return `${executeOptionally(englishAdverb)}${executeOptionally(() =>
        pick('_', '-', '.', ''),
    )}${englishNoun()}${executeOptionally(() =>
        executeRepeated(randomDigit, 1, 10),
    )}@${randFromArray(EmailProviders)}`;
}

export function age(value?: string): string {
    const min = value ? parseInt(value) : 1;
    return clamp(min, Math.trunc(randBMRange(-10, 150, 2)), 105).toString();
}

export function ssn(): string {
    return `${randomDigits('3')}-${randomDigits('2')}-${randomDigits('4')}`;
}
