import { getInsertionSortAnimations } from "./InsertionSort";

let ANIMATION_SPEED_MS = 10;

export function animateInsertionSort(array, speed, storeTimeoutId , sortingInProgress) {
    if (!Array.isArray(array)) {
        console.error("Invalid array provided");
        return;
    }
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    const auxiliaryArray = array.slice();
    const animations = getInsertionSortAnimations(auxiliaryArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const isSwap = animations[i].length === 3;
        const [barOneIdx, barTwoIdx] = animations[i];

        if (!isSwap) {
            const color = i % 3 === 0 ? 'red' : 'turquoise'; // Change color for comparisons
            const timeoutId = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = color;
                if (barTwoIdx !== undefined) {
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId);
        } else {
            const timeoutId = setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId);
        }
    }

    // Call Changetogreen after all animations are complete
    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;
    const timeoutId = setTimeout(() => {
        Changetogreen(animations);
        // Update array to match auxiliaryArray after animations complete
        array.splice(0, array.length, ...auxiliaryArray);
        sortingInProgress(false);
    }, totalAnimationTime);
    storeTimeoutId(timeoutId);
}

function Changetogreen(animations) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            if (animations[i].length === 1) {
                arrayBars[animations[i][0]].style.backgroundColor = 'green';
            } else {
                arrayBars[animations[i][0]].style.backgroundColor = 'green';
                arrayBars[animations[i][1]].style.backgroundColor = 'green';
            }
        }, i * 1);
    }
}