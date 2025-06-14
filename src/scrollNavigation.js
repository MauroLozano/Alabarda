import { previousElement, nextElement, isMobile } from "./utils.js";
export default function scrollNavigation(){
    const sections = document.querySelectorAll('.section'); //Makes an array with every element with the class .section.
    let wheelDir = null;
    document.getElementById('header').classList.add('active');
    const scroll_delay = 500;
    let last_execution = 0;
    let isScrollbarPressed = false;
    document.addEventListener('wheel',handleWheel,{passive:false});  //Scrolling is a passive event by default in the browser, it's necessary to change it to false to use preventDefault().
    const partnersSlider = document.querySelector('.partners__slider'); 
    let slideIndex = 0;
    const slides = document.querySelectorAll('.partners__slide');
    let lastSliderScroll = 0;
    const sliderCooldown = 400;
    let isVWSmall = false;
    const mobileWidth = window.innerWidth;
    if(mobileWidth<= 840){
        isVWSmall=true;
    }else{
        isVWSmall=false;
    }
    if(partnersSlider && !isMobile()){
        partnersSlider.addEventListener('wheel', (event)=>{
            event.preventDefault(); 
            const now = Date.now();
            if(now - lastSliderScroll < sliderCooldown) return;
            if(event.deltaY !== 0){
                if(event.deltaY > 0 && !isVWSmall){ //Setted for 3 Slides in the page
                    if(slideIndex==0){
                        slideIndex=slides.length-3;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }else{      
                        slideIndex=slideIndex-1;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });  
                    }
                }else if(event.deltaY < 0 && !isVWSmall){
                    if(slideIndex == slides.length-3){
                        slideIndex=0;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }else{
                        slideIndex=slideIndex+1;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }
                }
                if(event.deltaY > 0 && isVWSmall){
                    if(slideIndex==0){
                        slideIndex=slides.length-1;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }else{      
                        slideIndex=slideIndex-1;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });  
                    }
                }else if(event.deltaY < 0 && isVWSmall){
                    if(slideIndex == slides.length-1){
                        slideIndex=0;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }else{
                        slideIndex=slideIndex+1;
                        slides[slideIndex].scrollIntoView({ behavior: 'smooth' , inline: 'start', block: 'nearest' });
                    }
                }
                lastSliderScroll = now;
            }
        })
    }
    function handleWheel(event){ //Function to control the vertical scrolling of the page and giving the active class.
        if (event.target.closest('.partners__slider') || isMobile()) return; //if the event happens while being on the partners slider, return.
        event.preventDefault(); //Prevents default behaviour of the scrollbar.
        const now = Date.now(); //Delay function so the wheel triggers every 500ms.
        if(now - last_execution < scroll_delay){    //Cooldown for scrolling.
            return;
        };
        last_execution=now;
        wheelDir = event.deltaY;//If wheelDir < 0 it is scrolling up.
        let newActive;
        let currentActive = document.querySelector('.active');
        currentActive.classList.remove('active');
        if(wheelDir>0){
            newActive=nextElement(currentActive, sections); //newActive gets the value of the next element in the Array.
        }else if( wheelDir<0){
            newActive=previousElement(currentActive, sections); //newActive get the value of the previous element in the Array.
        };
        if (newActive) {
            currentActive.classList.remove('active');
            newActive.classList.add('active');
            newActive.scrollIntoView({ behavior: 'smooth' });
        }else{
            newActive= currentActive;
        };
    };
    if(!isScrollbarPressed){ //If user is mostly on a section(without using the wheel nor the scrollbar), assigns the active class to the most visible section.
        const observer = new IntersectionObserver((entries)=>{  
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                sections.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');
            }
        })},{threshold:0.5});
        sections.forEach(section => observer.observe(section));
    }
    document.addEventListener('mousedown', function(e) {
        const target = e.target;
        const isScrollbar = target === document.documentElement ||  //Is the document root element. The scrollbar is always present.
                        window.getComputedStyle(target).overflow === 'scroll' || //Obtains the styles of the element and checks if the overflow is set to scroll.
                        window.getComputedStyle(target).overflowY === 'scroll';
        if (isScrollbar) {
            isScrollbarPressed = true;
        };
    });
    document.addEventListener('mouseup', function(){
        if(isScrollbarPressed){
            isScrollbarPressed = false;
            document.querySelector('.active').scrollIntoView({ behavior: 'smooth' });
        }
    })
    document.addEventListener('mouseleave', function(){
        if(isScrollbarPressed){
            isScrollbarPressed = false;
        }
    });
};
