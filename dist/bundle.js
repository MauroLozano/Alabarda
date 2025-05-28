function nextElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the following element.
    const currentIndex = Array.from(elementsArray).indexOf(currentElement);
    if(currentIndex<elementsArray.length-1){
        return elementsArray[currentIndex+1];
    }
    return currentElement;
}function previousElement(currentElement,elementsArray){ //It takes an array and the element of the array and returns the previous element.
    const currentIndex = Array.from(elementsArray).indexOf(currentElement);
    if(currentIndex>0){
        return elementsArray[currentIndex-1]
    }
    return currentElement;
}function isMobile(){
    return /Android|iPhone/i.test(navigator.userAgent); //Looks in the userAgent for the words Android and iPhone.
}

function headerMovement(){
    const header = document.getElementById('header');
    const background_image = document.getElementById('background-image');
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    let mousePosPercentageX = null;
    let mousePosPercentageY = null;
    let isMouseOver=false;
    if(vw>1024 && isMobile()==false){
        header.addEventListener('mouseover', ()=>{ //Detects if the mouse is over the header
            isMouseOver = true;
            background_image.style.transition = "top 0.1s ease, left 0.1s ease";
            setTimeout(()=>{
                background_image.style.transition = "none";
            },100);
        });
        header.addEventListener('mousemove', function(event) { //Get the coordinates from the mouse position.
            if(!isMouseOver && !header.classList.contains('active')) return;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            mousePosPercentageX = (mouseX*100)/vw;  //Transform the coordinates to percentages.w
            mousePosPercentageY = (mouseY*100)/vh;
            //Use the distance between the cursor and the margins of the header to calculate the distance in % of the background_image from the margins.
            currentTop = (((50-mousePosPercentageY)/50))*-1;
            currentLeft= (((mousePosPercentageX-50)/50))*1;
            background_image.style.top=`${currentTop}%`;
            background_image.style.left=`${currentLeft}%`;
        });
        header.addEventListener('mouseout', ()=>{ //Detects if the mouse is not over the header.
            isMouseOver = false;
            background_image.style.transition = 'all 0.1s ease-in';
            background_image.style.top = "0";
            background_image.style.left = "0";
        });
    }
    
}

function scrollNavigation(){
    const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
    let wheelDir = null;
    document.getElementById('header').classList.add('active');
    const scroll_delay = 500;
    let last_execution = 0;
    let isScrollbarPressed = false;
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
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        if(wheelDir>0){
            newActive=nextElement(currentActive, sections); //newActive gets the value of the next element in the Array.
        }else if( wheelDir<0){
            newActive=previousElement(currentActive, sections); //newActive get the value of the previous element in the Array.
        }        if (newActive) {
            currentActive.classList.remove('active');
            newActive.classList.add('active');
            newActive.scrollIntoView({ behavior: 'smooth' });
        }else {
            newActive= currentActive;
        }    }    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                sections.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');
                if(!isScrollbarPressed){
                    entry.target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    },{threshold:0.5});
    sections.forEach(section => observer.observe(section));

    document.addEventListener('mousedown', function(e) {
        const target = e.target;
        
        const isScrollbar = target === document.documentElement ||  //Is the document root element. The scrollbar is always present.
                        window.getComputedStyle(target).overflow === 'scroll' || //Obtains the styles of the element and checks if the overflow is set to scroll.
                        window.getComputedStyle(target).overflowY === 'scroll';
        if (isScrollbar) {
            isScrollbarPressed = true;
            console.log('Scrollbar pressed');
        }    });
    document.addEventListener('mouseup', function(){
        if(isScrollbarPressed){
            isScrollBarPressed = false;
            console.log('Scrollbar released');
        }
    });
    document.addEventListener('mouseleave', function(){
        if(isScrollbarPressed){
            isScrollbarPressed = false;
        }
    });
}

function animations(){
    const feat_prod = document.querySelector('.feat-prod');
    const feat_prod_title = document.querySelector('.feat-prod__title');
    const partners = document.querySelector('.partners');
    const partners__title = document.querySelector('.partners__title');
    const presentation = document.querySelector('.presentation');
    const presentation_title = document.querySelector('.presentation__title');
    const mutations_observer = new MutationObserver(function(mutations) { //It waits for the changes for the DOM to be made before running the code.
        if(feat_prod.classList.contains('active')){             //Otherwise the if won't find the class active.
            feat_prod_title.classList.add('slideInLeft');
        }
        if(partners.classList.contains('active')){
            partners__title.classList.add('slideInUp');
        }
        if(presentation.classList.contains('active')){
            presentation_title.classList.add('slideInDown');
        }
    });
    mutations_observer.observe(feat_prod,partners,presentation, { attributes: true, attributeFilter: ['class'] });
}

function slider(){
    const sliders = document.querySelectorAll('.slide');
    const slider_container = document.querySelector('.feat-prod__slider');
    const slider_track = document.querySelector('.slider__track');

    slider_container.addEventListener('mouseenter',()=>{
        sliders.forEach(slider => {
            slider.classList.add('slider_active');
        });
        slider_track.style.animationPlayState = "paused";
    });
    slider_container.addEventListener('mouseleave',()=>{
        setTimeout(() => {
            slider_track.style.animationPlayState = "running";
        }, 100);
        sliders.forEach(slider => {
            slider.classList.remove('slider_active');
        });
    });
}

slider();
headerMovement();
scrollNavigation();
animations();
