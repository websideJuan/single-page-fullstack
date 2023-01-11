
const bodyHero = document.getElementById('bodyHero');
const templateHero = document.getElementById('template-hero').content;
const fragmentTwo = document.createDocumentFragment();




async function clgForExport () {
    return await fetch("../api/body.json")
    .then(res => res.json())
    .catch(error => console.log(error))
}

const dataBody = async () => {

    const data = await clgForExport()

    const body = data.dataBody

    // body.forEach(cardBody => {
    //     const sectionHero = document.createElement('section')

    //     sectionHero.setAttribute('data-id', cardBody.id)
    //     sectionHero.setAttribute('class', 'hero-front hero-front--show')
    //     sectionHero.innerHTML=`
        
    //         <picture class="container__imgHero">
    //             <source media="max-width: 768px" srcset="./assets/hd-wallpaper-g40ae1b32f_640.jpg">
    //             <img src=${cardBody.img} width="100%" height="100%" alt="check" class="img__hero">
    //         </picture>
            
    //         <div class="hero__content">
    //             <h1 class="hero__title">${cardBody.title}</h1>
    //             <p class="hero__paragraph">${cardBody.paragraph}</p>
    //             <a href="#" class=${cardBody.ctaBTN.class} data-ctaHero="true">${cardBody.ctaBTN.text}</a>
    //         </div>
    //     `


    //     bodyHero.appendChild(sectionHero)
    // })

    body.forEach(cardBody => {

        templateHero.querySelector('.hero-front').setAttribute('data-id', cardBody.id)
        templateHero.querySelector('.hero-front').setAttribute('class', cardBody.classShowCards)
        templateHero.querySelector('img.img__hero').setAttribute('src', cardBody.img)
        templateHero.querySelector('.hero__content .hero__title').textContent = cardBody.title
        templateHero.querySelector('.hero__content .hero__paragraph').textContent = cardBody.paragraph
        const btnCard = templateHero.querySelector('.hero__content .cta--hero')
        btnCard.textContent = cardBody.ctaBTN.text
        btnCard.setAttribute('class', cardBody.ctaBTN.class)
        

        const cloneNodeTwo = templateHero.cloneNode(true)

        fragmentTwo.appendChild(cloneNodeTwo)

        
    });
    
    bodyHero.appendChild(fragmentTwo)
    
    const sliders = [...templateHero.querySelectorAll('.hero-front')]
    console.log(sliders)



}
export default dataBody