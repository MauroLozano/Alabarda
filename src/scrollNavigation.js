export default function scrollNavigation(){
    let wheelDir = null;
    document.getElementById('header').classList.add('active');
    const scroll_delay = 500;
    let last_execution = 0;

    document.addEventListener('wheel',handleWheel,{passive:false});
    //Scrolling is a passive event by default in the browser, it's necessary to change it to false to use preventDefault().
    function handleWheel(event){
        event.preventDefault();
        const now = Date.now(); //Delay function so the wheel triggers every 500ms.
        if(now-last_execution<scroll_delay){
            return;
        };
        last_execution=now;
        wheelDir = event.deltaY;//If wheelDir < 0 it is scrolling up.

        let newActive;
        const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        if(wheelDir>0){
            newActive=nextElement(currentActive, sections); //newActive gets the value of the next element in the Array.
        }else if( wheelDir<0){
            newActive=previousElement(currentActive, sections); //newActive get the value of the previous element in the Array.
        };
        const target = newActive || currentActive; //If the active section were at the extremes, newActive would be null, in that case it takes the current value.
        target.classList.add('active');
        document.querySelector('.active').scrollIntoView({behavior:'smooth'});
    };

    function nextElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the following element.
        const currentIndex = Array.from(elementsArray).indexOf(currentElement);
        if(currentIndex<elementsArray.length-1){
            return elementsArray[currentIndex+1];
        }
        return null;
    };
    function previousElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the previous element.
        const currentIndex = Array.from(elementsArray).indexOf(currentElement);
        if(currentIndex>0){
            return elementsArray[currentIndex-1]
        }
        return null;
    };
};
