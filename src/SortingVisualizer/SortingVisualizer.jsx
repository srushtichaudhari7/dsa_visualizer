import React, { useState, useRef } from 'react';
import { animateMergeSort } from '../Sorting Algos/MergesortAnimation';
import { animateBubbleSort } from '../Sorting Algos/BubblesortAnimation';
import { animateSelectionSort } from '../Sorting Algos/SelectionSortAnimation';
import { animateQuickSort } from '../Sorting Algos/QuickSortAnimation';
import { animateHeapSort } from '../Sorting Algos/HeapSortAnimations';
import { animateRadixSort } from '../Sorting Algos/RadixSortAnimation';
import { animateInsertionSort } from '../Sorting Algos/InsertionSortAnimation';
import './SortingVisualizer.css';


const ALGORITHMS = {
  'Merge Sort': {
    complexity: 'Time: O(n log n), Space: O(n)',
  },
  'Bubble Sort': {
    complexity: 'Time: O(n^2), Space: O(1)',
  },
  'Selection Sort': {
    complexity: 'Time: O(n^2), Space: O(1)',
  },
  'Quick Sort': {
    complexity: 'Time: O(n log n), Space: O(log n)',
  },
  'Heap Sort': {
    complexity: 'Time: O(n log n), Space: O(1)',
  },
  'Insertion Sort': {
    complexity: 'Time: O(n^2), Space: O(1)',
  },
  'Radix Sort': {
    complexity: 'Time: O(n*Digits of number), Space: O(n+no.of digits in max number)',
  },
};

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(10); // Default animation speed in milliseconds
  const [arraySize, setArraySize] = useState(10); // Default number of bars in the array
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const timeoutIds = useRef([]);

  const generateRandomArray = (size = arraySize, min = 5, max = 500) => {
    clearAllTimeouts();
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = 'turquoise'; // Reset to original color
    }
    const randomArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1) + min)
    );
    setArray(randomArray);
    setSelectedAlgorithm('');
    console.log(randomArray);
  };

  const handleAlgorithmClick = (algorithm, animationFunction) => {
    clearAllTimeouts();
    setSortingInProgress(true);
    setSelectedAlgorithm(algorithm);
    animationFunction(array, 101 - speed, storeTimeoutId ,setSortingInProgress);
  };

  const handleSpeedChange = (e) => {
    clearAllTimeouts();
    setSpeed(parseInt(e.target.value));
  };

  const handleArraySizeChange = (e) => {
    clearAllTimeouts();
    setArraySize(parseInt(e.target.value));
    generateRandomArray();
  };

  const storeTimeoutId = (id) => {
    timeoutIds.current.push(id);
  };

  const clearAllTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setSortingInProgress(false);
  };
  const buttonClass =  sortingInProgress ? 'button-normal' : 'button-sorting';

  return (
    <div className="app">
      <header className="app-header">
        <div className="sidebar">
          <div>
            <label>Speed:</label>
            <input
              type="range"
              value={speed}
              onChange={handleSpeedChange}
              min="1"
              max="100"
              className="slider"
              disabled = {sortingInProgress}
            />
            <br />
            <label>Number of Bars:</label>
            <input
              type="range"
              value={arraySize}
              onChange={handleArraySizeChange}
              min="5"
              max="200"
              className="slider"
              disabled = {sortingInProgress}
            />
            <br />
          </div>
          <button className= "button" onClick={() => generateRandomArray()}>
          {sortingInProgress ? "Stop Sorting" : "Generate Array"}
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Merge Sort', animateMergeSort)}
            disabled={sortingInProgress}
          >
            Merge Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Bubble Sort', animateBubbleSort)}
            disabled={sortingInProgress}
          >
            Bubble Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Selection Sort', animateSelectionSort)}
            disabled={sortingInProgress}
          >
            Selection Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Quick Sort', animateQuickSort)}
            disabled={sortingInProgress}
          >
            Quick Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Heap Sort', animateHeapSort)}
            disabled={sortingInProgress}
          >
            Heap Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Insertion Sort', animateInsertionSort)}
            disabled={sortingInProgress}
          >
            Insertion Sort
          </button>
          <button
            className='button ${buttonClass}'
            onClick={() => handleAlgorithmClick('Radix Sort', animateRadixSort)}
            disabled={sortingInProgress}
          >
            Radix Sort
          </button>
        </div>
        {selectedAlgorithm && (
          <div className="description">
            <h2>{selectedAlgorithm}</h2>
            <p>{ALGORITHMS[selectedAlgorithm].complexity}</p>
          </div>
        )}
        <div className="array-container">
          {array.map((value, idx) => (
            <div key={idx} className="array-bar" style={{ height: `${value}px` }}></div>
          ))}
        </div>
      </header>
    </div>
  );
}