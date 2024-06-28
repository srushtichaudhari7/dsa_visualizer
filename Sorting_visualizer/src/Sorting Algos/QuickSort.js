export const getQuickSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;
console.log(array)
    quickSort(array, 0, array.length - 1, animations);
console.log(array)
console.log(animations)
    return animations;
};

const quickSort = (array, low, high, animations) => {
    if (low < high) {
        let pi = partition(array, low, high, animations);

        quickSort(array, low, pi - 1, animations); // Sort left partition
        quickSort(array, pi + 1, high, animations); // Sort right partition
    }
};

const partition = (array, low, high, animations) => {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        // Highlight comparison between current element and pivot
        animations.push([j, high]);

        if (array[j] < pivot) {
            i++;
            // Highlight swap between elements at i and j
            animations.push([i, j, true]);
            // Swap elements at i and j 
            [array[i], array[j]] = [array[j], array[i]];
        } else {
            // Highlight comparison revert
            animations.push([j, high]);
        }
    }

    // Highlight final swap between pivot and element at i+1
    animations.push([i + 1, high, true]);
    // Swap pivot with element at i+1
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1; // Return the partition index
};