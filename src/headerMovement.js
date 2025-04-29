export default function headerMovement(){
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
    });
    header.addEventListener('mouseout', ()=>{ //Detects if the mouse is not over the header.
        isMouseOver = false;
        background_image.style.transition = 'all 0.1s ease-in';
        background_image.style.top = "-50%";
        background_image.style.left = "-1%";
        
    });
};
