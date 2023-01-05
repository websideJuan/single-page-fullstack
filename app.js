//Memory Fragment
const fragment = document.createDocumentFragment()

//Mostrando menu mobil disign
const toggleMenuShow = document.getElementById('toggleMenuShow');
const nabvar__items = document.querySelector('.nabvar__items');

//Renderizando produsctos 
const wrapper__destacados = document.getElementById('wrapper__destacados');
const template__card__destacados = document.getElementById('template__card__destacados').content;
const wrapper_oferta = document.getElementById('wrapper__oferta');
const template__card__oferta = document.getElementById('template__card__oferta').content;


const pintandoCart = document.querySelector('.cart')

document.addEventListener('click', e => {

    e.stopPropagation()

    
 
    procecandoDatosdelCarito(e)

    showPopUp(e)

})


const procecandoDatosdelCarito = (e) => {
    
    let cartShopItems = []
    
    if(e.target.classList.contains('btn--product')) {

        const refElementDOM = e.target.parentElement

        const objFrom = {
            title: refElementDOM.querySelector('.card__title').textContent,
            price: refElementDOM.querySelector('.card__price > span').textContent,
            count: 1,
            id: refElementDOM.querySelector('.btn--product').dataset.id
        }



        if(Array.isArray(cartShopItems) && cartShopItems.length === 0){
            if(cartShopItems[objFrom.count] === 1 ){
                cartShopItems.push(objFrom)

            }
        }

        cartShopItems.forEach(itemCart => {
            const elementDivCreate = document.createElement('div')
            elementDivCreate.setAttribute('class', 'cart_container')
            elementDivCreate.innerHTML = `
                <h5>${itemCart.title}</h5>
                <p>${itemCart.price}</p>
                <b>Cantidad: ${itemCart.count}</b>`

            pintandoCart.appendChild(elementDivCreate)
        })
    }
}

const showPopUp = ({target:{dataset:{ctahero, closepopup}}}) => {
    const pop_up = document.querySelector('.pop-up');
    const ChildPop_up = document.querySelector('.pop-up > .pop__up');
    if(ctahero === 'true'){
        pop_up.classList.add('showPop__up')   
        ChildPop_up.classList.add('showPop__up')   
    }
    if(closepopup === 'close'){
        pop_up.classList.remove('showPop__up')
        ChildPop_up.classList.remove('showPop__up')
    }
}






window.addEventListener("DOMContentLoaded", async () => {
    const resultData = await fetchDataProduct()

    dataProductDestacado(resultData)

    dataProductOfertas(resultData)
})

const dataProductOfertas = ({productosOferta}) => {
    let numberIdOfertas = 1

    const filterDataOferta = productosOferta.filter(data => data.productId === numberIdOfertas)

    filterDataOferta.forEach(product => {
        template__card__oferta.querySelector('.card__img').setAttribute('src', product.img)
        template__card__oferta.querySelector('.card__title').textContent = product.title
        template__card__oferta.querySelector('.card__paragraph').textContent = product.description
        template__card__oferta.querySelector('.btn--product').setAttribute('data-id', product.productId)
        template__card__oferta.querySelector('.card__price span').textContent = product.price
        template__card__oferta.querySelector('.card__price .oldPrice').textContent = product.oldPrice


        const cloneOferta = template__card__oferta.cloneNode(true)

        fragment.appendChild(cloneOferta)
    })

    wrapper_oferta.appendChild(fragment)
}

const dataProductDestacado = ({productosDestacados}) => {
    let numberIdDestacados = 1

    const filterData = productosDestacados.filter(data => data.productId === numberIdDestacados)

    filterData.forEach(product => {
        template__card__destacados.querySelector('.card__img').setAttribute('src', product.img)
        template__card__destacados.querySelector('.card__title').textContent = product.title
        template__card__destacados.querySelector('.card__paragraph').textContent = product.description
        template__card__destacados.querySelector('.btn--product').setAttribute('data-id', product.productId)
        template__card__destacados.querySelector('.card__price span').textContent = product.price

        const cloneDestacados = template__card__destacados.cloneNode(true)

        fragment.appendChild(cloneDestacados)
    })

    wrapper__destacados.appendChild(fragment)

}

async function fetchDataProduct() {
    return await fetch('./api/products.json')
    .then(res => res.json())
    .catch(error => console.log(error))
}



toggleMenuShow.addEventListener('click', e => {
    if(nabvar__items){
     
        nabvar__items.classList.toggle('showMenuTransform')
    }else{
        console.log('first')
    }
})
