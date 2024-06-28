

import {getRadixSortAnimations} from "./RadixSort";



let ANIMATION_SPEED_MS = 10;

function changeToGreen(arrayBars, storeTimeoutId) {
    for (let i = 0; i < arrayBars.length; i++) {
        const timeoutId = setTimeout(() => {
            arrayBars[i].style.backgroundColor = 'green';
        }, i * 10);
        storeTimeoutId(timeoutId);
    }
}

export  const animateRadixSort = (array, speed, storeTimeoutId, sortingInProgress) => {
    if (!Array.isArray(array)) {
        console.error("Invalid array provided");
        return;
    }
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    const auxiliaryArray = array.slice();
    const animations = getRadixSortAnimations(auxiliaryArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const isArray = Array.isArray(animations[i]);

        if (isArray) {
            const newArray = animations[i][0];
            const timeoutId = setTimeout(() => {
                for (let j = 0; j < newArray.length; j++) {
                    arrayBars[j].style.height = `${newArray[j]}px`;
                }
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId);
        } else {
            const [barOneIdx, bucketIndex, value] = animations[i];
            const timeoutId1 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'red';
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId2);
        }
    }

    // Calculate total animation time
    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;

    // Call changeToGreen after all animations are complete
    const timeoutId = setTimeout(() => {
        changeToGreen(arrayBars, storeTimeoutId);
        // Update array to match auxiliaryArray after animations complete
        array.splice(0, array.length, ...auxiliaryArray);
        sortingInProgress(false);
    }, totalAnimationTime);
    storeTimeoutId(timeoutId);
};