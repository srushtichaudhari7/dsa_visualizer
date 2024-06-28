import { getBubbleSortAnimations } from "./bubbleSort";

let ANIMATION_SPEED_MS = 10;

function Changetogreen(animations, storeTimeoutId) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const timeoutId = setTimeout(() => {
            arrayBars[animations[i][0]].style.backgroundColor = 'green';
        }, i * 1);
        storeTimeoutId(timeoutId);
    }
}

export const animateBubbleSort = (array, speed, storeTimeoutId, sortingInProgress) => {
    if (!Array.isArray(array)) {
        console.error("Invalid array provided");
        return;
    }
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    const auxiliaryArray = array.slice();
    const animations = getBubbleSortAnimations(auxiliaryArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    // Execute animations
    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const isComparison = i % 2 === 0; // Every other animation is a comparison

        if (isComparison) {
            const timeoutId1 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'red';
                arrayBars[barTwoIdx].style.backgroundColor = 'red';
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS); // Revert color in the next animation step
            storeTimeoutId(timeoutId2);
        } else {
            const timeoutId1 = setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;
                arrayBars[barOneIdx].style.backgroundColor = '#af594c';
                arrayBars[barTwoIdx].style.backgroundColor = '#af594c';
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS); // Revert color in the next animation step
            storeTimeoutId(timeoutId2);
        }
    }

    // Calculate total animation time
    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;

    // Call Changetogreen after all animations are complete
    const timeoutId = setTimeout(() => {
        Changetogreen(animations, storeTimeoutId);
        // Update array to match auxiliaryArray after animations complete
        array.splice(0, array.length, ...auxiliaryArray);
        sortingInProgress(false);   
    }, totalAnimationTime);
    storeTimeoutId(timeoutId);
};