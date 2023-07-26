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
