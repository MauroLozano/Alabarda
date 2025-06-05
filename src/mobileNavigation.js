import { previousElement, nextElement } from "./utils.js";
export default function mobileNavigation(){
    const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
    const partnersSlider = document.querySelector('.partners__slider'); 
    const sliderPages = document.querySelectorAll('.slider__page');
    let sliderPagesIndex = 0;
    let lastSwipeScroll = 0;
    const swipeCooldown = 400;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeXLength = 50;
    let touchStartY = 0;
    let touchEndY = 0;
    partnersSlider.addEventListener('touchstart', (event)=>{
        event.preventDefault();
        touchStartX = event.changedTouches[0].screenX;
    })
    partnersSlider.addEventListener('touchend', (event)=>{
        touchEndX = event.changedTouches[0].screenX;
        if(touchEndX-touchStartX>50){
            //swipe left
            if(sliderPagesIndex==0){
            sliderPagesIndex=2;
            sliderPages[sliderPagesIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{
            sliderPagesIndex=sliderPagesIndex-1;
                sliderPages[sliderPagesIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });             
            }
        };
        if(touchEndX-touchStartX<-50){
            //swipe right
            if(sliderPagesIndex == 2){
                sliderPagesIndex=0;
                sliderPages[sliderPagesIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{
                sliderPagesIndex=sliderPagesIndex+1;
                sliderPages[sliderPagesIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }
        };
    })
    document.addEventListener('touchstart',(event)=>{ 
        touchStartY = event.changedTouches[0].screenY; //Gets the Y position when touching.
    }, { passive: true });
    document.addEventListener('touchmove', function(event) { //Prevents the scrolling while moving.
        event.preventDefault();
    }, { passive: false });
    document.addEventListener('touchend',(event)=>{
        touchEndY = event.changedTouches[0].screenY;
        let last_execution = 0;
        let scroll_delay = 500;
        const now = Date.now(); //Delay function so the wheel triggers every 500ms.
        if(now - last_execution < scroll_delay){    //Cooldown for scrolling.
            return;
        };
        last_execution = now;
        let newActive;
        let currentActive = document.querySelector('.active');
        if(touchEndY-touchStartY<-100){
            currentActive.classList.remove('active');
            newActive=nextElement(currentActive, sections); //newActive gets the value of the next element in the Array.
        }else if(touchEndY-touchStartY>100){
            currentActive.classList.remove('active');
            newActive=previousElement(currentActive, sections); //newActive get the value of the previous element in the Array.
        };
        if (newActive) {
            currentActive.classList.remove('active');
            newActive.classList.add('active');
            newActive.scrollIntoView({ behavior: 'smooth' });
        }else{
            newActive= currentActive;
        };
    })

    
}