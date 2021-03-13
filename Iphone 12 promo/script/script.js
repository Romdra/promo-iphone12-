document.addEventListener('DOMContentLoaded', () => {

   const getData = (url, cb) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);

      request.addEventListener('readystatechange', () => {
         if (request.readyState !== 4) return;
         if (request.status == 200) {
            const response = JSON.parse(request.response);
            cb(response);
         } else {
            console.log(new Error('Ошибка:' + request.status));
         }
      });

      request.send();
   };

   const tabs = () => {

      const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
      const cardDetailsTitleElem = document.querySelector('.card-details__title');
      const cardImageItemElem = document.querySelector('.card__image_item');
      const cardDetailsPriceElem = document.querySelector('.card-details__price');
      const descriptionMemoryElem = document.querySelector('.description__memory');

      const data = [
         {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
            img: 'img/iPhone-graphite.png',
            price: 95990,
            memoryROM: 128,
         },
         {
            name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
            img: 'img/iPhone-silver.png',
            price: 120090,
            memoryROM: 256,
         },
         {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
            img: 'img/iPhone-blue.png',
            price: 99990,
            memoryROM: 128,
         },
      ];

      const deactive = () => {
         cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
      };

      cardDetailChangeElems.forEach((btn, i) => {
         btn.addEventListener('click', () => {
            if (!btn.classList.contains('active')) {
               deactive();
               btn.classList.add('active');
               cardDetailsTitleElem.textContent = data[i].name;
               cardImageItemElem.src = data[i].img;
               cardImageItemElem.alt = data[i].name;
               cardDetailsPriceElem.textContent = data[i].price + '₽';
               descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
            };
         });
      });

   };

   const accordion = () => {
      const characteristicsListElem = document.querySelector('.characteristics__list');
      const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

      characteristicsItemElems.forEach(elem => {
         if (elem.children[1].classList.contains('active')) {
            elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
         }
      });

      const open = (button, dropDown) => {
         closeAllDrops();
         dropDown.style.height = `${dropDown.scrollHeight}px`;
         button.classList.add('active');
         dropDown.classList.add('active');          
      };

      const close = (button, dropDown) => {
         button.classList.remove('active');
         dropDown.classList.remove('active');
         dropDown.style.height = '';       
      };

      const closeAllDrops = (button, dropDown) => {
         characteristicsItemElems.forEach((elem) => {
            if (elem.children[0] !== button && elem.children[1] !== dropDown) {
               close(elem.children[0], elem.children[1])
            }
         })
      };

       characteristicsListElem.addEventListener('click', (event) => {
         const target = event.target;
         if (target.classList.contains('characteristics__title')) {
            const parent = target.closest('.characteristics__item');
            console.log(parent)
             const decription = parent.querySelector('.characteristics__description');
            decription.classList.contains('active') ? 
               close(target, decription) : 
                  open (target, decription); 
         }
      }); 

   };

   const modal = () => {
      const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
      const modal = document.querySelector('.modal');
      const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
      const modalTitleElem = document.querySelector('.modal__title');
      const cardDetailsTitle = document.querySelector('.card-details__title');

      cardDetailsButtonBuy.addEventListener('click', () => {
         modal.classList.add('open');
         modalTitleElem.textContent = cardDetailsTitle.textContent;
      })

       document.addEventListener('keydown', (event) => {
         if (event.code == 'Escape') {
            modal.classList.remove('open')
         }
      }) 

      modal.addEventListener('click', (event) => {
         const target = event.target;
         if (target.classList.contains('modal__close') || target === modal) {
            modal.classList.remove('open')
         }
      }) 

      cardDetailsButtonDelivery.addEventListener('click', () => {
         modal.classList.add('open');
         modalTitleElem.textContent = cardDetailsTitle.textContent;
      })

       document.addEventListener('keydown', (event) => {
         if (event.code == 'Escape') {
            modal.classList.remove('open')
         }
      }) 

      modal.addEventListener('click', (event) => {
         const target = event.target;
         if (target.classList.contains('modal__close') || target === modal) {
            modal.classList.remove('open')
         }
      }) 
   };

   const renderCrossSell = () => {
      const crossSellList = document.querySelector('.cross-sell__list');
      const crossSellAdd = document.querySelector('.cross-sell__add');
      const allGoods = [];

      const shuffle = arr => arr.sort(() => Math.random() - 0.5);

      const createCrossSellItem = (good) => {
         const liItem = document.createElement('li');
         liItem.innerHTML = `
            <article class="cross-sell__item">
               <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
               <h3 class="cross-sell__title">${good.name}</h3>
               <p class="cross-sell__price">${good.price}₽</p>
               <button class="button button_buy cross-sell__button">Купить</button>
            </article>
         `;
         return liItem;
      };

      const render = arr => {
         arr.forEach(item => {
            crossSellList.append(createCrossSellItem(item));
         })
      }

      const wrapper = (fn, count) => {
         let counter = 0;
         return (...args) => {
            if (counter === count) return;
            counter++;
            return fn(...args)
         };
      };

      const wrapRender = wrapper(render, 2);

      

      const createCrossSellList = (goods = []) => {
         allGoods.push(...shuffle(goods))
         const fourItem = allGoods.splice(0, 4);
         wrapRender(fourItem);
      };

      crossSellAdd.addEventListener('click', () => {
         wrapRender(allGoods);
      })

      getData('cross-sell-dbase/dbase.json', createCrossSellList)
   }



   tabs();
   accordion();
   modal();
   renderCrossSell();
   amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});