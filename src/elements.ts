import { extractNumber } from './utils';
export function moveElement(elem: HTMLElement, distance: number = 20): void {
    const { top, right, bottom, left } = elem.style;
    Object.entries({ top, right, bottom, left })
        .forEach(([key, value]) => {
            const [number, unit] = extractNumber(value);
            elem.style[key as any] = `${Math.round((Math.random() - 0.5) * distance + number)}${unit}`;
        });
    if (elem.style.position === '' || elem.style.position === 'static') {
        elem.style.position = 'relative';
    }
}
export function rotateElement(elem: HTMLElement, degrees = 2) {
    elem.style.transform = `rotate(${(Math.random() - 0.5) * degrees}deg)`
}
export function moveRandomElements(root: Node, classes?: string[], probability: number = 0.5): void {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node: Node): number{
                const elem = node as HTMLElement;
                if (classes && classes.length) {
                    return classes.some(cls => elem.classList.contains(cls)) ?
                        NodeFilter.FILTER_ACCEPT :
                        NodeFilter.FILTER_REJECT;
                } else if (Math.random() < probability) {
                    return NodeFilter.FILTER_ACCEPT;
                } else {
                    return NodeFilter.FILTER_REJECT;
                }
            }
        }
    );
    while (walker.nextNode()) {
        moveElement(walker.currentNode as HTMLElement);
        rotateElement(walker.currentNode as HTMLElement);
    }
}