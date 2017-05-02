import { extractNumber } from './utils';
export function moveElement(elem: HTMLElement, distance: number = 100): void {
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
export function rotateElement(elem: HTMLElement) {
    elem.style.transform = `rotate(${(Math.random() - 0.5) * 10}deg)`
}
export function moveRandomElements(root: Node, classes?: string[]): void {
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
                } else {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        }
    );
    while (walker.nextNode()) {
        moveElement(walker.currentNode as HTMLElement);
        rotateElement(walker.currentNode as HTMLElement);
    }
}