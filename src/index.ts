import { scrambleColors } from './colors';
import { runAway } from './cursor';
import { moveRandomElements } from './elements';
function main(root: Node = document.body, classes: Partial<Record<'colors' | 'elements' | 'cursor', string[]>>) {
    scrambleColors(root, classes.colors);
    moveRandomElements(root, classes.elements);
    runAway(root, classes.cursor);
}
export { runAway, scrambleColors, moveRandomElements };
export default main;