import { getHeapSortAnimations } from "./HeapSort";

let ANIMATION_SPEED_MS = 10;

export function animateHeapSort(array, speed, storeTimeoutId ,sortingInProgress) {
    if (!Array.isArray(array)) {
        console.error("Invalid array provided");
        return;
    }
    if (speed !== undefined) {
        ANIMATION_SPEED_MS = speed;
    }
    const auxiliaryArray = array.slice();
    const animations = getHeapSortAnimations(auxiliaryArray);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const isSwap = animations[i].length === 3;
        const [barOneIdx, barTwoIdx] = animations[i];

        if (!isSwap) {
            const timeoutId1 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'red';
                arrayBars[barTwoIdx].style.backgroundColor = 'red';
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId2);
        } else {
            const timeoutId1 = setTimeout(() => {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;
                arrayBars[barOneIdx].style.backgroundColor = '#af954c';
                arrayBars[barTwoIdx].style.backgroundColor = '#af954c';
            }, i * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId1);

            const timeoutId2 = setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * ANIMATION_SPEED_MS);
            storeTimeoutId(timeoutId2);
        }
    }

    const totalAnimationTime = animations.length * ANIMATION_SPEED_MS;
    const timeoutId = setTimeout(() => {Changetogreen(animations, storeTimeoutId);array.splice(0, array.length, ...auxiliaryArray);sortingInProgress(false);}, totalAnimationTime);
    storeTimeoutId(timeoutId);
}

function Changetogreen(animations, storeTimeoutId) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const timeoutId = setTimeout(() => {
            arrayBars[animations[i][0]].style.backgroundColor = 'green';
            arrayBars[animations[i][1]].style.backgroundColor = 'green';
        }, i * 1);
        storeTimeoutId(timeoutId);
    }
}
