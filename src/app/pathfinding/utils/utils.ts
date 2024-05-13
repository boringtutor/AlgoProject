import {
  GRID_HEIGHT,
  GRID_NODE_HEIGHT,
  GRID_NODE_WIDTH,
  GRID_WIDTH,
} from "./consts";
import { Node, nodeType } from "./types";

export function getRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function getInitialGrid(
  setArrayState: React.Dispatch<React.SetStateAction<Node[][]>>,
  min: number,
  max: number
) {
  const grid: Node[][] = [];

  for (let i = 0; i < GRID_WIDTH; i++) {
    const row: Node[] = [];
    for (let j = 0; j < GRID_HEIGHT; j++) {
      const num = getRandomNumber(max, min);
      const node: Node = {
        nodeType: "idel",
        value: num,
        width: GRID_NODE_WIDTH,
        height: GRID_NODE_HEIGHT,
      };
      row.push(node);
    }
    grid.push(row);
  }

  setArrayState(grid); // Update the grid state
}
