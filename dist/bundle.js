function headerMovement(){
    const header = document.getElementById('header');
    const background_image = document.getElementById('background-image');
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    let mousePosPercentageX = null;
    let mousePosPercentageY = null;
    let currentTOP = 0;
    let currentLeft = 0;
    let isMouseOver=false;
    
    header.addEventListener('mouseover', ()=>{ //Detects if the mouse is over the header
        
        isMouseOver = true;
        console.log(isMouseOver);
        header.addEventListener('mousemove', function(event) { //Get the coordinates from the mouse position.
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            console.log('X: ',mouseX,' Y: ',mouseY);
            mousePosPercentageX = (mouseX*100)/vw;  //Transform the coordinates to percentages.w
            mousePosPercentageY = (mouseY*100)/vh;
            // console.log('X: ',mousePosPercentageX,' Y: ',mousePosPercentageY);
            background_image.style.top=`${currentTOP}%`;
            background_image.style.left=`${currentLeft}%`;
            // console.log(currentLeft);
            // console.log(currentRight);
            //Use the distance between the cursor and the margins of the header to calculate the distance in % of the background_image from the margins.
            currentTOP = -50 + (((50-mousePosPercentageY)/50))*-1;
            currentLeft= -1+ (((mousePosPercentageX-50)/50))*1;
        });
    });
    header.addEventListener('mouseout', ()=>{ //Detects if the mouse is not over the header.
        isMouseOver = false;
        console.log(isMouseOver);
    });
}

function scrollNavigation(){
    let wheelDir = null;
    document.getElementById('header').classList.add('active');
    const section1 = document.querySelector('.section1');
    const section2 = document.querySelector('.section2');
    const section3 = document.querySelector('.section3');
    const section4 = document.querySelector('.section4');
    const scroll_delay = 500;
    let last_execution = 0;

    document.addEventListener('wheel',handleWheel,{passive:false});
    //Scrolling is a passive event by default in the browser, it's necessary to change it to false to use preventDefault().
    function handleWheel(event){
        event.preventDefault();
        
        const now = Date.now(); //Delay function so the wheel triggers every 500ms.
        if(now-last_execution<scroll_delay){
            return;
        }
        last_execution=now;
        wheelDir = event.deltaY;//If wheelDir < 0 it is scrolling up.
        if(section1.classList.contains('active')){
            if(wheelDir>0){
                section2.classList.add('active');
                section1.classList.remove('active');
            }else {
                return;
            }        }else if(section2.classList.contains('active')){
            if(wheelDir>0){
                section3.classList.add('active');
                section2.classList.remove('active');
            }else {
                section1.classList.add('active');
                section2.classList.remove('active');
            }        }else if(section3.classList.contains('active')){
            if(wheelDir>0){
                section4.classList.add('active');
                section3.classList.remove('active');
            }else {
                section2.classList.add('active');
                section3.classList.remove('active');
            }        }else if(section4.classList.contains('active')){
            if(wheelDir>0){
                return;
            }else {
                section3.classList.add('active');
                section4.classList.remove('active');
            }        }
        document.querySelector('.active').scrollIntoView({behavior:'smooth'});
    }}
new IntersectionObserver((entries)=>{
    entries.forEach;
},0.5);

headerMovement();
scrollNavigation();
