import axios from 'axios';
import { FetchBooks } from './fetchBooks';
import photoAmazon from '../images/amazon_x3.png'
import photoAppleBook from '../images/white_book_x3.png'
import photoBlackBook from '../images/black_book_x3.png'

const modal = document.querySelector('.modal');
const modalMarkup = document.querySelector('.modal-markup');
const addbook = document.querySelector('.addbook');
const backdrop = document.getElementById('backdrop');
const closeModalBtn = document.querySelector('.modal-book-close');
let idbook;

async function getBooks(id){
  try {
    const response = await axios.get(`https://books-backend.p.goit.global/books/${id}`);
    console.log(response.data);
    booksCard(response.data);
    modal.classList.remove('hidden');
    backdrop.classList.add('backdrop_open');
    document.removeEventListener('click', onBookClick);
    return response.data;
  }
  catch (error) {
    console.log(error);
  };
}


function onBookClick(event) {
  const bookCard = event.target;
  const id = bookCard.parentNode.parentNode.parentNode.parentNode.getAttribute('data-book-id');
  getBooks(id);
};

addbook.addEventListener('click', () => {
  changeBtn();
  addLocalStor();
});

document.addEventListener('click', onBookClick);

async function getBookinModal(id){
  try {
    const response = await axios.get(`https://books-backend.p.goit.global/books/${id}`);
    // idbook = document.querySelector('.idbook');
    // const id2 = idbook.textContent;

    // if (id2 === response.data._id) {
    //   localStorage.setItem('bookInfo', JSON.stringify(response.data));
    // }

    const bookInfo = localStorage.getItem('bookInfo');
    // console.log(bookInfo);
    // const bookdata = JSON.parse(localStorage.getItem('bookInfo'));

    if (bookInfo === null) {
      localStorage.setItem('bookInfo', JSON.stringify(response.data));
    } else if (bookInfo !== null) {
    localStorage.removeItem('bookInfo');
    }
    // else if (bookdata === bookdata) {
    //   localStorage.setItem('bookInfo2', JSON.stringify(response.data));
    // }
  }
  catch (error) {
    console.log(error);
  };
}


function addLocalStor() {
  idbook = document.querySelector('.idbook');
  const id = idbook.textContent;

  getBookinModal(id);
}

function changeBtn() {
  // localStorage.getItem('bookInfo');
  // addLocalStor();

  if (addbook.textContent === 'add to shoping list') {
    setTimeout(() => { addbook.textContent = 'remove from the shopping list' }, 150);
    addbook.classList.add('addbook-change-size');
    modal.classList.add('modal-change-size');
    const text = document.createElement('p');
    text.textContent = 'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
    text.classList.add('add-book-info');
    modal.appendChild(text);
  } else if (addbook.textContent === 'remove from the shopping list') {
    addbook.textContent = 'add to shoping list';
    addbook.classList.remove('addbook-change-size');
    modal.classList.remove('modal-change-size');
    const p = document.querySelector('.add-book-info');
    p.remove();
    // localStorage.removeItem('bookInfo');
  }
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  backdrop.classList.remove('backdrop_open');
  document.addEventListener('click', onBookClick);
  modalMarkup.innerHTML = '';
  addbook.textContent = 'add to shoping list';
  const p = document.querySelector('.add-book-info');
  p.remove();
  modal.classList.remove('modal-change-size');
});

function closeModal(event) {
  if (event.key === 'Escape' || event.target === backdrop) {
    modal.classList.add('hidden');
    backdrop.classList.remove('backdrop_open');
    document.addEventListener('click', onBookClick);
    modalMarkup.innerHTML = '';
    addbook.textContent = 'add to shoping list';
    const p = document.querySelector('.add-book-info');
    p.remove();
    modal.classList.remove('modal-change-size');
  };
}
document.addEventListener('keydown', closeModal);

document.addEventListener('click', closeModal);

function booksCard(book) {
  const markup = `<div class='book-card'>
    <img class="book-img" src="${book.book_image}"  alt="photo_of_book " loading="lazy">
    <h2 class="book-title">${book.title}</h2>
    <p class="book-author">${book.author}</p>
    <p class="book-descr">${book.description}</p>
    <p class="idbook">${book._id}</p>
    <ul class="online-shops-list">
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[0].url}"><img src="${photoAmazon}" width="62px" heigth="19px"/></a></li>
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[1].url}"><img src="${photoAppleBook}" width="32px" heigth="32px"/></a></li>
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[4].url}"><img src="${photoBlackBook}" width="38px" heigth="36px"/></a></li>    
    </ul>
    </div>`;
  return modalMarkup.insertAdjacentHTML('afterbegin', markup)
}

  export { booksCard }