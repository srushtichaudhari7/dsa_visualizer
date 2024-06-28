export const getInsertionSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight the key element
        animations.push([i]);

        while (j >= 0 && array[j] > key) {
            animations.push([j, j + 1]);
  
            animations.push([j, j + 1, true]);
            array[j + 1] = array[j];
            j = j - 1;
        }
        
     
        array[j + 1] = key;

        animations.push([i, j + 1]);
    }
    
    return animations;
};