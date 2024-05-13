import {
  SEARCH_BUBBLE_SORT,
  SEARCH_MERGE_SORT,
  SEARCH_RADIX_SORT,
  SEARCH_SELECTION_SORT,
} from "../utils/consts";
import { barNode } from "../utils/types";

type algoName = {
  name: string;
};

export class SortingAlgo {
  private array;
  private algorithm;
  private animationArray: Array<Array<barNode>>;

  constructor(array: Array<barNode>, { name = "selection" }: algoName) {
    this.array = [...array];
    this.algorithm = name;
    this.animationArray = [];
  }

  public sorting() {
    if (this.algorithm === SEARCH_SELECTION_SORT) {
      this.selectionSort();
    } else if (this.algorithm === SEARCH_BUBBLE_SORT) {
      this.BubbleSort();
    } else if (this.algorithm === SEARCH_MERGE_SORT) {
      this.MergeSort();
    } else if (this.algorithm === SEARCH_RADIX_SORT) {
      this.RadixSort();
    }

    return this.animationArray;
  }

  private selectionSort() {
    const n = this.array.length; // Get array length for efficiency

    for (let i = 0; i < n - 1; i++) {
      // Outer loop: controls the sorted part
      let minIndex = i; // Assume current element is the minimum

      for (let j = i + 1; j < n; j++) {
        // Inner loop: finds the true minimum
        this.array[j].type = "comparing"; // Visualize comparison
        this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot

        if (this.array[j].value < this.array[minIndex].value) {
          this.array[minIndex].type = "idle"; // Reset previous minimum
          minIndex = j; // Update minimum index
        }
      }

      // Swap the found minimum element with the first unsorted element
      this.swap(i, minIndex);
      this.array[i].type = "sorted"; // Visualize sorted elements
      this.array[minIndex].type = "sorted";
      this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot after swap
    }
    for (let i = 0; i < n; i++) {
      this.array[i].type = "sorted";
      this.animationArray.push(this.array.map((bar) => ({ ...bar })));
    }
  }

  private BubbleSort() {
    const n = this.array.length; // Get array length for efficiency

    for (let i = 0; i < n - 1; i++) {
      // Outer loop: controls the number of passes
      for (let j = 0; j < n - i - 1; j++) {
        // Inner loop: compares and swaps
        this.array[j].type = "comparing"; // Visualize comparison
        this.array[j + 1].type = "comparing";
        this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot before swap

        if (this.array[j].value > this.array[j + 1].value) {
          this.swap(j, j + 1); // Swap elements
          this.array[j].type = "sorted"; // Visualize sorted
          this.array[j + 1].type = "sorted";
          this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot after swap
        }
      }

      for (let i = 0; i < this.array.length; i++) {
        this.array[i].type = "sorted";
      }
      this.animationArray.push(this.array.map((bar) => ({ ...bar })));
    }
  }

  private MergeSort() {
    this.mergeSortHelper(0, this.array.length - 1);
  }

  private mergeSortHelper(start: number, end: number) {
    if (start >= end) return; // Base case: single element or empty array

    const mid = Math.floor((start + end) / 2);

    // Recursively sort left and right halves
    this.mergeSortHelper(start, mid);
    this.mergeSortHelper(mid + 1, end);

    // Merge the sorted halves
    this.merge(start, mid, end);
  }

  private merge(start: number, mid: number, end: number) {
    const left = this.array.slice(start, mid + 1).map((bar) => ({ ...bar }));
    const right = this.array.slice(mid + 1, end + 1).map((bar) => ({ ...bar }));

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      this.array[k].type = "comparing"; // Visualize comparison
      this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot

      if (left[i].value <= right[j].value) {
        this.array[k] = left[i];
        i++;
      } else {
        this.array[k] = right[j];
        j++;
      }

      this.array[k].type = "sorted"; // Visualize sorted elements
      k++;
    }

    // Copy any remaining elements from left or right arrays
    while (i < left.length) {
      this.array[k] = left[i];
      this.array[k].type = "sorted"; // Visualize sorted elements
      i++;
      k++;
    }
    while (j < right.length) {
      this.array[k] = right[j];
      this.array[k].type = "sorted"; // Visualize sorted elements
      j++;
      k++;
    }

    this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Final snapshot
  }
  private RadixSort() {
    let maxDigit = this.getMaxDigits();

    for (let exp = 1; maxDigit / exp > 0; exp *= 10) {
      this.countingSort(exp);
    }
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].type = "sorted";
    }
  }

  private getMaxDigits() {
    let maxDigits = 0;
    for (const bar of this.array) {
      maxDigits = Math.max(
        maxDigits,
        Math.floor(Math.log10(Math.abs(bar.value))) + 1
      );
    }
    return maxDigits;
  }

  private countingSort(exp: number) {
    const output = new Array(this.array.length);
    const count = new Array(10).fill(0);

    // Store count of occurrences in count array
    for (const bar of this.array) {
      count[Math.floor((bar.value / exp) % 10)]++;
    }

    // Change count[i] so that count[i] now contains actual position of this digit in output array
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = this.array.length - 1; i >= 0; i--) {
      output[count[Math.floor((this.array[i].value / exp) % 10)] - 1] =
        this.array[i];
      count[Math.floor((this.array[i].value / exp) % 10)]--;
    }

    // Copy the output array to the original array
    for (let i = 0; i < this.array.length; i++) {
      this.array[i] = output[i];
      this.array[i].type = "comparing"; // Visualize sorting
    }

    this.animationArray.push(this.array.map((bar) => ({ ...bar }))); // Snapshot after each radix pass
  }

  private swap(i: number, j: number) {
    let temp = this.array[i].value;
    this.array[i].value = this.array[j].value;
    this.array[j].value = temp;
  }
}
