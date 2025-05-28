import { previousElement, nextElement } from "./utils";
export default function scrollNavigation(){
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
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                sections.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');
                if(!isScrollbarPressed){
                    entry.target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        })
    },{threshold:0.5})
    sections.forEach(section => observer.observe(section));

    document.addEventListener('mousedown', function(e) {
        const target = e.target;
        
        const isScrollbar = target === document.documentElement ||  //Is the document root element. The scrollbar is always present.
                        window.getComputedStyle(target).overflow === 'scroll' || //Obtains the styles of the element and checks if the overflow is set to scroll.
                        window.getComputedStyle(target).overflowY === 'scroll';
        if (isScrollbar) {
            isScrollbarPressed = true;
            console.log('Scrollbar pressed');
        };
    });
    document.addEventListener('mouseup', function(){
        if(isScrollbarPressed){
            isScrollBarPressed = false;
            console.log('Scrollbar released');
        }
    })
    document.addEventListener('mouseleave', function(){
        if(isScrollbarPressed){
            isScrollbarPressed = false;
        }
    });
};
