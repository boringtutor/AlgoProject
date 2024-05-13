"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Visualizer from "./components/ui/visualizer";
import { Button } from "@/components/ui/button";
import { SortingAlgo } from "./algos/sorting";
import { sleep } from "@/lib/utils";
import { barNode } from "./utils/types";
import { initializeArray } from "./utils/utils";
import {
  MAX_NUM_BAR_HEIGHT,
  MIN_NUM_BAR_HEIGHT,
  SEARCH_BUBBLE_SORT,
  SEARCH_MERGE_SORT,
  SEARCH_RADIX_SORT,
  SEARCH_SELECTION_SORT,
  TOTAL_NUMBER_OF_BARS,
} from "./utils/consts";
import Link from "next/link";

export default function Sorting() {
  const arr = [
    {
      index: 0,
      algo: SEARCH_SELECTION_SORT,
    },
    {
      index: 1,
      algo: SEARCH_BUBBLE_SORT,
    },
    {
      index: 2,
      algo: SEARCH_MERGE_SORT,
    },
    {
      index: 3,
      algo: SEARCH_RADIX_SORT,
    },
  ];
  const [currentAlgo, setCurrentAlgo] = useState<number>(0);
  const [arrayState, setArrayState] = useState<Array<barNode> | null>(null);
  const [startingVisualization, setStartingVisualization] =
    useState<boolean>(false);
  const [alreadySorted, setAlreadySorted] = useState<boolean>(false);

  async function reInitialize() {
    console.log("reinitializing the algo");
    initializeArray(
      TOTAL_NUMBER_OF_BARS,
      setArrayState,
      MIN_NUM_BAR_HEIGHT,
      MAX_NUM_BAR_HEIGHT
    );
    setAlreadySorted(false);
  }

  async function startSorting() {
    if (!alreadySorted) {
      if (arrayState !== null) {
        setStartingVisualization(true);
        const sorter = new SortingAlgo(arrayState, {
          name: arr[currentAlgo].algo,
        });
        const animationSteps = sorter.sorting();

        for (const step of animationSteps) {
          await sleep(500); // Adjust the delay as needed
          setArrayState([...step]); // Update the array state with a copy of the step
        }
        setStartingVisualization(false);
        setAlreadySorted(true);
      }
    }
  }

  const currentState = 1;
  return (
    <div className="flex flex-col w-full h-screen bg-background">
      <div className="flex w-full h-full bg-primary text-background max-h-10 items-center pl-10">
        {/* nav bar */}
        <strong>Sorting</strong>
        <MyMenuBar
          algos={arr}
          clickHandler={setCurrentAlgo}
          reInitialize={reInitialize}
        />
      </div>
      <div className="flex min-w-full  justify-center pt-3 pb-3">
        {startingVisualization === false ? (
          <Button
            onClick={() => {
              startSorting();
            }}
            className="text-background hover:bg-muted"
          >
            Visualize
          </Button>
        ) : (
          <Button
            onClick={() => {
              startSorting();
            }}
            className="cursor-not-allowed disabled:opacity-75"
            disabled
          >
            Visualize
          </Button>
        )}
      </div>
      {alreadySorted ? (
        <div className="flex w-full bg-secondary-foreground h-10 rounded-md justify-center items-center mx-4 text-background">
          ALREADY SORTED.... PLEASE CLICK RANDOMIZE ARRAY
        </div>
      ) : (
        <></>
      )}
      <div className="flex w-full h-full">
        <Visualizer
          algoName={arr[currentAlgo].algo}
          arrayState={arrayState}
          setArrayState={setArrayState}
        />
      </div>
    </div>
  );
}

type algoItem = {
  index: number;
  algo: string;
};

type algo = {
  algos: Array<algoItem>;
  clickHandler: any;
  reInitialize: () => void;
};

function MyMenuBar({ algos, clickHandler, reInitialize }: algo) {
  const [iconCloseState, setIconCloseState] = useState(false);
  // console.log(algos)
  return (
    <div className="flex space-x-2 items-center  w-full text-background justify-around ">
      <div className="select-none hover:bg-muted p-2 rounded-sm cursor-pointer">
        <Link href="/">HOME</Link>
      </div>
      <div
        className="select-none hover:bg-muted p-2 rounded-sm cursor-pointer"
        onClick={() => {
          reInitialize();
        }}
      >
        RANDOMIZE
      </div>
      <div
        className="flex space-x-2 items-center select-none hover:bg-muted p-2 rounded-sm cursor-pointer"
        onClick={() => {
          setIconCloseState(!iconCloseState);
        }}
      >
        ALGORITHMS
        {iconCloseState ? (
          <ChevronDownIcon className=" h-3 w-3 flex " aria-hidden="true" />
        ) : (
          <ChevronUpIcon className="h-3 w-3" aria-hidden="true" />
        )}
        {iconCloseState ? (
          <div className="absolute w-44 rounded-md  bg-primary top-12 ">
            <div className="flex flex-col items-center w-full h-full overflow-scroll p-10">
              {algos.map((item) => {
                return (
                  <div
                    key={item.index}
                    onClick={() => clickHandler(item.index)}
                    className="hover:bg-muted rounded p-2 text-nowrap"
                  >
                    {item.algo}
                    <br></br>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
