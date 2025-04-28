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
        header.addEventListener('mousemove', function(event) { //Get the coordinates from the mouse position.
            const mouseX = event.clientX;
            const mouseY = event.clientY;
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
    });
};
