import { scrambleColors } from './colors';
import { runAway } from './cursor';
import { moveRandomElements } from './elements';
function main(
    root: Node = document.body,
    classes: Partial<Record<'colors' | 'elements' | 'cursor', string[]>> = {},
    probability: number = 0.5
) {
    if (Math.random() < probability) {
        scrambleColors(root, classes.colors, probability);
    }
    if (Math.random() < probability) {
        moveRandomElements(root, classes.elements, probability);
    }
    if (Math.random() < probability) {
        runAway(root, classes.cursor, probability);
    }
}
export { runAway, scrambleColors, moveRandomElements };
export default main;