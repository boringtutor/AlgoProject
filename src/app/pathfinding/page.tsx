"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  PATH_FINDING_A_STAR,
  PATH_FINDING_BFS,
  PATH_FINDING_DFS,
  PATH_FINDING_DIJKSTRA,
  PATH_FINDING_DP,
} from "./utils/consts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PathFinding() {
  const arr: Array<algoItem> = [
    {
      index: 0,
      algo: PATH_FINDING_BFS,
    },
    {
      index: 1,
      algo: PATH_FINDING_DFS,
    },
    {
      index: 2,
      algo: PATH_FINDING_DIJKSTRA,
    },
    {
      index: 3,
      algo: PATH_FINDING_A_STAR,
    },
    {
      index: 4,
      algo: PATH_FINDING_DP,
    },
  ];

  const [currentAlgo, setCurrentAlgo] = useState<number>(0);
  const [startingVisualization, setStartingVisualization] =
    useState<boolean>(false);
  const [alreadySorted, setAlreadySorted] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full h-screen bg-background">
      <div className="flex w-full h-full bg-primary max-h-10 items-center pl-10 ">
        <strong className="text-nowrap font-serif font-bold text-background">
          PATH FINDING
        </strong>
        <MyMenuBar algos={arr} clickHandler={setCurrentAlgo}></MyMenuBar>
      </div>
      <div className="flex bg-card-foreground capitalize rounded-md text-background h-11 mx-3 mt-3 justify-center items-center">
        current algo selected is : {arr[currentAlgo].algo}
      </div>
      <div className="flex min-w-full  justify-center pt-3 pb-3">
        {startingVisualization === false ? (
          <Button
            onClick={() => {
              // startSorting();
            }}
            className="text-background hover:bg-muted"
          >
            Visualize
          </Button>
        ) : (
          <Button
            onClick={() => {
              // startSorting();
            }}
            className="cursor-not-allowed disabled:opacity-15"
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
        {/* This is where visualizer will be  */}
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
  //   reInitialize: () => void;
};

function MyMenuBar({ algos, clickHandler }: algo) {
  const [iconCloseState, setIconCloseState] = useState(false);

  return (
    <div className="flex space-x-2 items-center  w-full text-foreground justify-around ">
      <div className="select-none hover:bg-secondary-foreground p-2 rounded-sm cursor-pointer">
        <Link href="/" className="font-sans text-background">
          HOME
        </Link>
      </div>
      <div
        className="flex space-x-2 font-sans items-center select-none text-background hover:bg-secondary-foreground p-2 rounded-sm cursor-pointer"
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
          <div className="absolute w-72 rounded-md  bg-primary top-12 ">
            <div className="flex flex-col items-center w-full h-full overflow-scroll p-10">
              {algos.map((item) => {
                return (
                  <div
                    key={item.index}
                    onClick={() => clickHandler(item.index)}
                    className="hover:bg-secondary-foreground capitalize rounded p-2 font-sans  "
                  >
                    {item.algo}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex space-x-2 font-sans items-center text-background select-none hover:bg-secondary-foreground p-2 rounded-sm cursor-pointer">
        CLEAR
      </div>
      <div className="flex space-x-2 font-sans items-center text-background select-none hover:bg-secondary-foreground p-2 rounded-sm cursor-pointer">
        VISITED NODE
      </div>
      <div className="flex space-x-2 font-sans items-center text-background select-none hover:bg-secondary-foreground p-2 rounded-sm cursor-pointer">
        SHORTEST PATH NODE
      </div>
    </div>
  );
}
