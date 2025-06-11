import { previousElement, nextElement } from "./utils.js";
export default function mobileNavigation(){
    const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
    const partnersSlider = document.querySelector('.partners__slider'); 
    const slides = document.querySelectorAll('.partners__slide');
    const mobileWidth = window.innerWidth;
    let slideIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isVWSmall = false;
    if(mobileWidth<= 840){
        isVWSmall=true;
    }else{
        isVWSmall=false;
    }
    partnersSlider.addEventListener('touchstart', (event)=>{
        event.preventDefault();
        touchStartX = event.changedTouches[0].screenX;
    })
    
    partnersSlider.addEventListener('touchend', (event)=>{
        touchEndX = event.changedTouches[0].screenX;
        if(touchEndX-touchStartX>50 && !isVWSmall){
            //swipe left
            if(slideIndex==0){
                slideIndex=slides.length-3;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{      
                slideIndex=slideIndex-1;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });  
            }
        };
        if(touchEndX-touchStartX<-50 && !isVWSmall){
            //swipe right
            if(slideIndex == slides.length-3){
                slideIndex=0;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{
                slideIndex=slideIndex+1;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }
        };
        if(touchEndX-touchStartX>50 && isVWSmall){
            //swipe left
            if(slideIndex==0){
                slideIndex=slides.length-1;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{      
                slideIndex=slideIndex-1;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });  
            }
        };
        if(touchEndX-touchStartX<-50 && isVWSmall){
            //swipe right
            if(slideIndex == slides.length-1){
                slideIndex=0;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }else{
                slideIndex=slideIndex+1;
                slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
            }
        };
        
    })
    document.addEventListener('touchstart',(event)=>{ 
        touchStartY = event.changedTouches[0].screenY; //Gets the Y position when touching.
    }, { passive: true });
    document.addEventListener('touchmove', function(event) { //Prevents the scrolling while moving.
        let currentActive = document.querySelector('.active');
        if(currentActive.id === "header" && event.touches[0].clientY-touchStartY > 0) { //If the active section is the header and the scroll is upwards, return so the user can refresh the page.
            return;
        }
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