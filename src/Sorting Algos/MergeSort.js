// ../Sorting Algos/mergeSortWithAnimations.js

export  function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  mergeSortHelper(array, auxiliaryArray, 0, array.length - 1, animations);
  return animations;
}

function mergeSortHelper(mainArray, auxiliaryArray, startIdx, endIdx, animations) {
  if (startIdx === endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, mainArray, startIdx, middleIdx, animations);
  mergeSortHelper(auxiliaryArray, mainArray, middleIdx + 1, endIdx, animations);
  doMerge(mainArray, auxiliaryArray, startIdx, middleIdx, endIdx, animations);
}

function doMerge(mainArray, auxiliaryArray, startIdx, middleIdx, endIdx, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Record comparisons and overwrites
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}