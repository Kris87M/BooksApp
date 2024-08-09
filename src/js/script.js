/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    }
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
    
  function render(){
    for (let book of dataSource.books) {
      // console.log(book);
      /* generate HTML based on template */
      const generatedHTML = templates.books(book);
      // console.log(generatedHTML);
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      // console.log(element);
      /* find book-list container */
      const booksContainer = document.querySelector(select.containerOf.bookList);
      // console.log(booksContainer);
      /* add element to menu */
      booksContainer.appendChild(element);
    }
    initActions();
  }

  render();

  
  function initActions() {
    const favoriteBooks = [];
    const images = document.querySelectorAll('.book__image');
    console.log(images);
    for (const img of images) {
      img.addEventListener('dblclick', function (event) {
        event.preventDefault();
        img.classList.add('favorite');
        const favoriteBook = img.getAttribute('data-id');
        console.log(favoriteBook);
        favoriteBooks.push(favoriteBook);
        console.log(favoriteBooks);
      });
    }
  }
}