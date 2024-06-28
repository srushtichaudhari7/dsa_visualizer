import { getMergeSortAnimations } from "../Sorting Algos/MergeSort";

function Changetogreen(animations ,ANIMATION_SPEED_MS) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            arrayBars[animations[i][0]].style.backgroundColor = 'green';
        }, i * 1);
    }
}

export const animateMergeSort = (array, speed, storeTimeoutId, sortingInProgress) => {
    const auxiliaryArray = array.slice();
    const animations = getMergeSortAnimations(auxiliaryArray);
    let ANIMATION_SPEED_MS = 10;
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;

        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const color = i % 3 === 0 ? 'red' : 'turquoise';
            const timeoutId = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = color;
                arrayBars[barTwoIdx].style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId);
        } else {
            const [barOneIdx, newHeight] = animations[i];
            const timeoutId = setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId);
        }
    }

    // Call Changetogreen after all animations are complete
    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;
    const timeoutId = setTimeout(() => {
        Changetogreen(animations,ANIMATION_SPEED_MS);
        // Update array to match auxiliaryArray after animations complete
        array.splice(0, array.length, ...auxiliaryArray);
        sortingInProgress(false);
    }, totalAnimationTime);
    storeTimeoutId(timeoutId);
};