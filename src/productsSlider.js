export default function productsSlider(){
    const sliders = document.querySelectorAll('.slide');
    const slider_container = document.querySelector('.feat-prod__slider');
    const slider_track = document.querySelector('.slider__track');

    slider_container.addEventListener('mouseenter',()=>{
        sliders.forEach(slider => {
            slider.classList.add('slider_active');
        });
        slider_track.style.animationPlayState = "paused";
    })
    slider_container.addEventListener('mouseleave',()=>{
        setTimeout(() => {
            slider_track.style.animationPlayState = "running";
        }, 100);
        sliders.forEach(slider => {
            slider.classList.remove('slider_active');
        });
    })
}