function headerMovement(){
    const header = document.getElementById('header');
    const background_image = document.getElementById('background-image');
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    let mousePosPercentageX = null;
    let mousePosPercentageY = null;
    let currentLeft = 0;
    let isMouseOver=false;
    
    header.addEventListener('mouseover', ()=>{ //Detects if the mouse is over the header
        console.log('mouse enter');
        isMouseOver = true;
        background_image.style.transition = "top 0.1s ease, left 0.1s ease";
        setTimeout(()=>{
            background_image.style.transition = "none";
        },100);
    });
    header.addEventListener('mousemove', function(event) { //Get the coordinates from the mouse position.
        if(!isMouseOver) return;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        mousePosPercentageX = (mouseX*100)/vw;  //Transform the coordinates to percentages.w
        mousePosPercentageY = (mouseY*100)/vh;
        //Use the distance between the cursor and the margins of the header to calculate the distance in % of the background_image from the margins.
        currentTop = -50 + (((50-mousePosPercentageY)/50))*-1;
        currentLeft= -1+ (((mousePosPercentageX-50)/50))*1;
        background_image.style.top=`${currentTop}%`;
        background_image.style.left=`${currentLeft}%`;
        console.log(currentTop,currentLeft);
    });
    header.addEventListener('mouseout', ()=>{ //Detects if the mouse is not over the header.
        console.log('mouse out');
        isMouseOver = false;
        background_image.style.transition = 'all 0.1s ease-in';
        background_image.style.top = "-50%";
        background_image.style.left = "-1%";
        setTimeout(()=>{
            console.log(background_image.style.top ,background_image.style.left);
        },300);
        
    });
}

function scrollNavigation(){
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
        }        last_execution=now;
        wheelDir = event.deltaY;//If wheelDir < 0 it is scrolling up.

        let newActive;
        const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        if(wheelDir>0){
            newActive=nextElement(currentActive, sections); //newActive gets the value of the next element in the Array.
        }else if( wheelDir<0){
            newActive=previousElement(currentActive, sections); //newActive get the value of the previous element in the Array.
        }        const target = newActive || currentActive; //If the active section were at the extremes, newActive would be null, in that case it takes the current value.
        target.classList.add('active');
        document.querySelector('.active').scrollIntoView({behavior:'smooth'});
    }
    function nextElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the following element.
        const currentIndex = Array.from(elementsArray).indexOf(currentElement);
        if(currentIndex<elementsArray.length-1){
            return elementsArray[currentIndex+1];
        }
        return null;
    }    function previousElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the previous element.
        const currentIndex = Array.from(elementsArray).indexOf(currentElement);
        if(currentIndex>0){
            return elementsArray[currentIndex-1]
        }
        return null;
    }}

headerMovement();
scrollNavigation();
