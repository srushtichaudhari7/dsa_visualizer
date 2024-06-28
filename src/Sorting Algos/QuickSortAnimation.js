import { getQuickSortAnimations } from "./QuickSort";

let ANIMATION_SPEED_MS = 10;

export function animateQuickSort(array, speed, storeTimeoutId, sortingInProgress) {
    if (!Array.isArray(array)) {
        console.error("Invalid array provided");
        return;
    }
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    const auxiliaryArray = array.slice();
    const animations = getQuickSortAnimations(auxiliaryArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    // Function to animate each step of the Quick Sort algorithm
    const animateStep = (i) => {
        const isSwap = animations[i].length === 3;
        const [barOneIdx, barTwoIdx] = animations[i];

        if (!isSwap) {
            const color = i % 3 === 0 ? 'red' : 'turquoise'; // Change color for comparisons
            const timeoutId1 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = color;
                arrayBars[barTwoIdx].style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS);
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
            }, (i + 1) * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId2);
        }
    };

    // Execute animations
    for (let i = 0; i < animations.length; i++) {
        animateStep(i);
    }

    // Call Changetogreen after all animations are complete
    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;
    const timeoutId = setTimeout(() => {
        Changetogreen(animations, auxiliaryArray);
        // Update array to match auxiliaryArray after animations complete
        array.splice(0, array.length, ...auxiliaryArray);
        sortingInProgress(false);
    }, totalAnimationTime);
    storeTimeoutId(timeoutId);
}

function Changetogreen(animations, auxiliaryArray) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            arrayBars[animations[i][0]].style.backgroundColor = 'green';
            arrayBars[animations[i][1]].style.backgroundColor = 'green';
        }, i * 1);
    }
}