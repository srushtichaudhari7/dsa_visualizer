export function getHeapSortAnimations (array)  {
    const animations = [];
    if (array.length <= 1) return animations;

    // Build max heap
    buildMaxHeap(array, animations);

    // Heap sort
    for (let i = array.length - 1; i > 0; i--) {
        // Swap root (max element) with last element of unsorted portion
        animations.push([0, i, true]);
        [array[0], array[i]] = [array[i], array[0]];

        // Heapify the reduced heap
        heapify(array, i, 0, animations);
    }

    // Final swap animation to highlight sorted array
    animations.push([0, 0, true]);
    console.log(animations);
    console.log(array);
    return animations;
};

const buildMaxHeap = (array, animations) => {
    const n = array.length;
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }
};

const heapify = (array, n, i, animations) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Highlight comparison between parent and largest
    if (left < n) {
        animations.push([left, largest]);
    }
    if (right < n) {
        animations.push([right, largest]);
    }

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        // Highlight swap between parent and largest
        animations.push([i, largest, true]);
        // Swap
        [array[i], array[largest]] = [array[largest], array[i]];

        // Recursively heapify the affected sub-tree
        heapify(array, n, largest, animations);
    }
};