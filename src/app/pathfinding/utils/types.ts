export type nodeType = "wall" | "visited" | "shortest" | "idel";

export type Node = {
  nodeType: nodeType;
  value: number;
  width: number;
  height: number;
};
