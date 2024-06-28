

export  function getRadixSortAnimations (array) {
    const animations = [];
    if (array.length <= 1) return animations;

    const maxNum = Math.max(...array) * 10;
    let divisor = 10;

    while (divisor < maxNum) {
        // Create a bucket array for each digit (0 to 9)
        let buckets = [...Array(10)].map(() => []);

        // Distribute array elements into the respective bucket based on the current digit
        for (let i = 0; i < array.length; i++) {
            const bucketIndex = Math.floor((array[i] % divisor) / (divisor / 10));
            buckets[bucketIndex].push(array[i]);
            animations.push([i, bucketIndex, array[i]]); // Push animation info
        }

        // Flatten the bucket array back into the original array
        array = [].concat.apply([], buckets);
        animations.push([array.slice()]); // Push the entire array as animation info

        // Move to the next significant digit
        divisor *= 10;
    }

    return animations;
};