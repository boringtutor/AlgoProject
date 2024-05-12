import { barNode } from "../utils/types";

type algoName = {
    name:string
}


export default class SortingAlgo{
    private array ;
    private algorithm;
    private animationArray:Array<Array<barNode>>;

    constructor(array:Array<barNode>,{name="selection"}:algoName){
        this.array = [...array]
        this.algorithm = name
        this.animationArray = []
    }   

    public sorting(){
        if(this.algorithm === 'selection'){
            this.selectionSort();
        }else if(this.algorithm === "bubble"){
            this.BubbleSort();
        }else if (this.algorithm === 'merge'){
            this.MergeSort();
        }else if(this.algorithm==="radix"){
            this.RadixSort();
        }
        return this.animationArray;
    }

    private selectionSort(){
        
    }

    private BubbleSort() {
        let swapped: boolean;
        do {
          swapped = false;
          for (let i = 0; i < this.array.length - 1; i++) {
            this.array[i].type = "comparing"
            this.array[i+1].type = "comparing"
            this.animationArray.push([...this.array]); // Push a copy of the array
            if (this.array[i].value > this.array[i + 1].value) {
              this.swap(i, i + 1);
              this.animationArray.push([...this.array]); // Push a copy of the array
              swapped = true;
            }
          }
        } while (swapped);
        for(let i = 0;i<this.array.length;i++){
          this.array[i].type="sorted";
        }
        this.animationArray.push([...this.array])
      }

    private MergeSort(){

    }
    private RadixSort(){

    }

    private swap(i: number, j: number) {
        [this.array[i].value, this.array[j].value] = [this.array[j].value, this.array[i].value];
      }


}