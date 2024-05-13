import { barNode } from "./types";

export function getRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function initializeArray(
  totalNumber: number,
  setArrayState: any,
  max: number,
  min: number
) {
  const randomArray: Array<barNode> = [];
  for (let i = 0; i < totalNumber; i++) {
    console.log("testing...");
    let num = getRandomNumber(max, min);
    const node: barNode = {
      type: "idle",
      value: num,
    };
    randomArray.push(node);
  }

  setArrayState([...randomArray]);
}
