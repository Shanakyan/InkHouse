import {data as art} from './data.js';
let newData = art.filter(el => el.country.toLowerCase() === 'England');
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
<button type="submit" class="card__btn btn">В корзину</button>
`;


container.append(card);//выводим карточку
card.append(img,card_text);//выводим картинку
}


for(let el of countrys){
    el.addEventListener('click', function(){
        let CountryId = el.getAttribute('id')
        let filteredCountry = art.filter(el => el.country.toLowerCase() === CountryId)
        cards.innerHTML = ''
        for(let btn of countrys) {
            btn.classList.remove('active')
        }
        el.classList.add('active')
        renderCard(filteredCountry)
    })
}
