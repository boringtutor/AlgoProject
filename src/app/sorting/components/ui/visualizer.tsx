import { useEffect, useState } from "react";
import Bar from "./bar";
import { barNode, barType } from "../../utils/types";
import { initializeArray } from "../../utils/utils";
import {
  MAX_NUM_BAR_HEIGHT,
  MIN_NUM_BAR_HEIGHT,
  TOTAL_NUMBER_OF_BARS,
} from "../../utils/consts";

type VisualizerProp = {
  algoName: string;
  arrayState: Array<barNode> | null;
  setArrayState: any;
};

export default function Visualizer({
  algoName,
  arrayState,
  setArrayState,
}: VisualizerProp) {
  useEffect(() => {
    initializeArray(
      TOTAL_NUMBER_OF_BARS,
      setArrayState,
      MIN_NUM_BAR_HEIGHT,
      MAX_NUM_BAR_HEIGHT
    );
  }, []);
  return (
    <div className="flex flex-col mx-3 w-full">
      <div className="flex justify-center mt-6 ">
        Selected AlGO NAME {algoName}{" "}
      </div>
      <div className="flex items-center min-w-full justify-center mt-10">
        <div className="flex  ">
          {arrayState?.map((item) => {
            return (
              <div key={item.value} className="flex mx-1">
                <Bar color={item.type} h={item.value} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
