export default function animations(){
    const feat_prod = document.querySelector('.feat-prod');
    const feat_prod_title = document.querySelector('.feat-prod__title');
    const partners = document.querySelector('.partners');
    const partners__title = document.querySelector('.partners__title');
    const presentation = document.querySelector('.presentation');
    const presentation_title = document.querySelector('.presentation__title');
    const footer = document.footer;
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
        if(footer.classList.contains('active')){
            presentation.classList.add
        }
    });
    mutations_observer.observe(feat_prod,partners,presentation, { attributes: true, attributeFilter: ['class'] });
}