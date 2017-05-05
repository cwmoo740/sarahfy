import { moveElement } from './elements';
const cache = new WeakMap<HTMLElement, Pick<CSSStyleDeclaration, 'top' | 'left' | 'right' | 'bottom' | 'position'>>();
export function mouseOver(event: MouseEvent) {
    const elem = (event.target as HTMLElement);
    const { top, right, bottom, left, position } = elem.style;
    if (!cache.has(elem)) {
        cache.set(elem, { top, right, bottom, left, position });
    }
    moveElement(elem);
    window.setTimeout(() => {
        if (cache.has(elem)) {
            const style = cache.get(elem);
            Object.assign(elem.style, style);
            cache.delete(elem);
        }
    }, 1000);
}
export function runAway(root: Node, classes?: string[], probability = 0.5) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node: Node): number {
                const elem = node as HTMLElement;
                let result = elem.tagName === 'A' ||
                    elem.tagName === 'BUTTON' ||
                    elem.tagName === 'INPUT';
                if (result && classes && classes.length) {
                    result = classes.some(cls => elem.classList.contains(cls));
                }
                result = result && Math.random() > probability;
                return result ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_REJECT;
            }
        }
    );
    while (walker.nextNode()) {
        const node = walker.currentNode as HTMLElement;
        node.addEventListener<'mouseover'>('mouseover', mouseOver);
    }
}