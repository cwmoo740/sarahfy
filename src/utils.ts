export const styleRegex = /(-?\d+)\s*(px|%)/;
export function extractNumber(styleProp: string | null): [number, 'px' | '%'] {
    const match = styleRegex.exec(styleProp || '');
    if (match) {
        return [parseFloat(match[1]), match[2] as 'px' | '%']
    } else {
        return [0, 'px'];
    }
}