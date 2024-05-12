import { useEffect, useState } from "react";
import Bar from "./bar";
import { barNode ,barType} from "../../utils/types";

type VisualizerProp = {
   algoName:string
   arrayState:Array<barNode>|null
   setArrayState:any
}

export default function Visualizer({algoName,arrayState,setArrayState}:VisualizerProp){
    // const[arrayState,setArrayState] = useState<number[]|null>(null);
    const max = 100
    const min = 10
    const totalNumber = 10
    function getRandomNumber(){
        return Math.floor( Math.random() * (max - min) + min)
    }

    function initializeArray(){
        
        const randomArray: Array<barNode> = []; 
        for (let i=0;i<totalNumber;i++){
            console.log('testing...')
            let num = getRandomNumber();
            const node:barNode = {
                type:"idle",
                value:num
            }
            randomArray.push(node)
        }
        setArrayState(randomArray);
    }

    useEffect(()=>{
        initializeArray();
    },[]);
    return <div className="flex flex-col mx-3 w-full">
        <div className="flex justify-center mt-6 ">Selected AlGO NAME {algoName} </div>
        <div className="flex items-center min-w-full justify-center mt-10">
    <div className="flex  ">

        {
            arrayState?.map((item)=>{
                return<div key={item.value} className="flex mx-1"><Bar  color={item.type} h={item.value} /></div> 
            })
        }
    </div>
        </div>
        
    </div>
}