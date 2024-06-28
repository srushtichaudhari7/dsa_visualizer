export const getSelectionSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;

    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            // Highlight comparison
            animations.push([j, minIdx]);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        // Swap if a smaller element is found
        if (minIdx !== i) {
            animations.push([i, minIdx, true]); // Highlight swap
            // Perform swap
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;
        }

        // Revert colors after comparison
        animations.push([i, minIdx]);
    }

    return animations;
};