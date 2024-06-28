export const getBubbleSortAnimations = (auxiliaryarray) => {
    const animations = [];
    if (auxiliaryarray.length <= 1) return animations;
    let sorted = false;
    let pass = 0;
    for (let i = 0; i < auxiliaryarray.length; i++) {
        sorted = false;
        for (let j = 0; j < auxiliaryarray.length - 1 - pass; j++) {
            if (auxiliaryarray[j] > auxiliaryarray[j + 1]) {
                animations.push([j, j + 1]); // Push indices for comparison
                animations.push([j, j + 1]); // Push indices again for swap
                let temp = auxiliaryarray[j];
                auxiliaryarray[j] = auxiliaryarray[j + 1];
                auxiliaryarray[j + 1] = temp;
                sorted = true;
            }
        }
        if (!sorted) break;
        pass++;
    }
    console.log(animations);
    console.log(auxiliaryarray);
    return animations;
};