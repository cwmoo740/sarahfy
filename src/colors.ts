type RGB = [number, number, number];
function randomColor(color: RGB): string {
    return color
        .map<number>(c => Math.min(Math.max(0, Math.floor((Math.random() * 64)) + c), 255))
        .join(', ')
}

export const rgb = /rgb\((\d+),\s?(\d+),\s?(\d+)\s?\)/;
export const rgba = /rgba\((\d+),\s?(\d+),\s?(\d+),\s?(\d+\.?\d+)\s?\)/;
/**
 * returns a new color that's slightly wrong
 * @param color rgba(x,y,z,a) or rgb(x,y,z)
 */
export function alterColor(color: string): string {
    const rgbMatch = rgb.exec(color);
    if (rgbMatch) {
        return `rgb(${randomColor(rgbMatch.slice(1).map<number>(val => parseInt(val)) as RGB)})`;
    }

    const rgbaMatch = rgba.exec(color);
    if (rgbaMatch) {
        return `rgba(${randomColor(rgbaMatch.slice(1, 4).map<number>(val => parseInt(val)) as RGB)}, ${rgbaMatch[4]})`;
    }

    return color;
}
export function scrambleColors(root: Node, classes?: string[]) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node: Node): number{
                const elem = node as HTMLElement;
                let result = elem.tagName !== 'P' &&
                    !elem.tagName.includes('H') &&
                    elem.tagName !== 'DIV' &&
                    elem.tagName !== 'DIV' &&
                    elem.tagName !== 'A';
                if (result && classes && classes.length) {
                    result = classes.some(cls => elem.classList.contains(cls));
                }
                return result ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_SKIP;
            }
        }
    );
    const map = new Map<HTMLElement, CSSStyleDeclaration>();
    while (walker.nextNode()) {
        const node = walker.currentNode as HTMLElement;
        if (
            node.tagName !== 'P' &&
            !node.tagName.includes('H') &&
            node.tagName !== 'DIV' &&
            node.tagName !== 'DIV' &&
            node.tagName !== 'A'
        ) {
            continue;
        }
        const style = { ...window.getComputedStyle(node) };
        map.set(node, style);
    }
    map.forEach((style, node) => {
        if (style.backgroundColor) {

            node.style.backgroundColor = alterColor(style.backgroundColor);
            if (node.tagName === 'P') {
                console.log(node, style.backgroundColor);
                console.log(node.style.backgroundColor);
            }
        }
        if (style.color) {
            node.style.color = alterColor(style.color);
        }
    });
    map.clear();
}