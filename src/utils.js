export function nextElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the following element.
    const currentIndex = Array.from(elementsArray).indexOf(currentElement);
    if(currentIndex<elementsArray.length-1){
        return elementsArray[currentIndex+1];
    }
    return currentElement;
};
export function previousElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the previous element.
    const currentIndex = Array.from(elementsArray).indexOf(currentElement);
    if(currentIndex>0){
        return elementsArray[currentIndex-1]
    }
    return currentElement;
};
