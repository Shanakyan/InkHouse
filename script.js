import {data as art} from './data.js';

let arr = [];
let LS = window.localStorage;

let catalogArt = document.querySelector(".catalogArt");
let cart = document.querySelector(".cart");

let openModal = document.querySelector("#openModal");
let modalWindow  = document.querySelector(".modalWindow");


catalogArt.addEventListener("click", function (event) {
    if(event.target.classList.contains("card__btn")){
    event.target.classList.toggle("addBasket");

    if(event.target.classList.contains("addBasket")){
        event.target.textContent = "Добавлено";
        modalWindow.classList.remove("d-none");
        let text = event.target.closest(".card__text").querySelector(".card__title").textContent;
        let price = event.target.closest(".card__text").querySelector(".card__price").textContent;
        let obj = {
            title: text,
            price: price,
            atBasket: false,
        }
        arr.push(obj);
        LS.setItem("artBasket", JSON.stringify(arr));

    }
    else{
        event.target.textContent = "В корзину"
    }
}
})

let newData = art.filter(el => el.country.toLowerCase() === 'france');
let countrys = document.querySelectorAll(".reproduction__list_link")
let cards = document.querySelector(".cards");
// рендер карточки
renderCard(newData);

// передать данные из БД в карточки
function renderCard(obj){
    obj.forEach(el => {
       createCard(el); 
    });
}

// отобразить карточки на странице
function createCard(obj){
const container = document.querySelector('.catalogArt');
const card = document.createElement('article');
card.className ='card';

// создаем картинку
const img = document.createElement('img');
img.setAttribute("src", obj.image);
card.className ='card__img';


// создаем текстовый блок
let card_text = document.createElement('div');
card_text.className="card__text";
card_text.innerHTML =`<p class="card__autor">${obj.artist}</p>
<h3 class="card__title">${obj.title}</h3>
<p class="card__material">${obj.material}</p>
<p class="card__price">${obj.price} руб</p>
<button type="submit" id = "btnId" class="card__btn  btn">В корзину</button>
`;


container.append(card);//выводим карточку
card.append(img,card_text);//выводим картинку
}
for(let el of countrys){
    el.addEventListener('click', function(){
        let CountryId = el.getAttribute('id')
        let filteredCountry = art.filter(el => el.country.toLowerCase() === CountryId)
        cards.innerHTML = ''
        // for(let btn of countrys) {
        //     btn.classList.remove('active')
        // }
        el.classList.add('active')
        renderCard(filteredCountry)
    })
}


// jQuery( function( $ ) {
//     // Цепляемся за событие adding_to_cart
//     $( document.body ).on( 'adding_to_cart', function( event, button ) {
//         // Выцепляем инициатора события (ссылка/кнопка)
//         var $btn = $( button[0] );
 
//         // Пытаемся найти в вёрстке название товара
//         var product_title = $btn.parents( 'li.product' ).find( '.woocommerce-loop-product__title' ).text();
 
//         if ( product_title ) {
//             // Формируем шаблон попапа
//             var tpl = '';
//             tpl += '<p>Товар "' + product_title + '" добавлен в корзину</p>';
//             tpl += '<div>';
//             tpl += '<a class="button" onclick="jQuery.unblockUI();">Продолжить</a>';
//             tpl += '<a href="/shop/cart/" class="button alt">Оформить</a>';
//             tpl += '</div>';
 
//             // Выводим шаблон в модальное окно.
//             // Используем blockUI из WooCommerce
//             $.blockUI({
//                 message: tpl,
//                 timeout: 4000,
//                 css: {
//                     width: '300px',
//                     border: 0,
//                     padding: 30
//                 }
//             } );
//         }
//     } );
// } );