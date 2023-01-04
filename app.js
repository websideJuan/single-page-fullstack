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



window.addEventListener("DOMContentLoaded", async e => {
    e.stopPropagation()

    const resultData = await fetchDataProduct()

    dataProductDestacado(resultData.productosDestacados)
    dataProductOfertas(resultData.productosOferta)
})

const dataProductOfertas = (datas) => {
    let numberIdOfertas = 1

    const filterDataOferta = datas.filter(data => data.productId === numberIdOfertas)

    filterDataOferta.forEach(product => {
        template__card__oferta.querySelector('.card__img').setAttribute('src', product.img)
        template__card__oferta.querySelector('.card__title').textContent = product.title
        template__card__oferta.querySelector('.card__paragraph').textContent = product.description
        template__card__oferta.querySelector('.btn--product').setAttribute('data-id', product.id)
        template__card__oferta.querySelector('.card__price span').textContent = product.price
        template__card__oferta.querySelector('.card__price .oldPrice').textContent = product.oldPrice


        const cloneOferta = template__card__oferta.cloneNode(true)

        fragment.appendChild(cloneOferta)
    })

    wrapper_oferta.appendChild(fragment)
}

const dataProductDestacado = (datas) => {
    let numberIdDestacados = 1

    const filterData = datas.filter(data => data.productId === numberIdDestacados)

    filterData.forEach(product => {
        template__card__destacados.querySelector('.card__img').setAttribute('src', product.img)
        template__card__destacados.querySelector('.card__title').textContent = product.title
        template__card__destacados.querySelector('.card__paragraph').textContent = product.description
        template__card__destacados.querySelector('.btn--product').setAttribute('data-id', product.id)
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
