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
    const booksContainer = document.querySelector(select.containerOf.bookList);
    booksContainer.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const imgLink = event.target.offsetParent;
      if (imgLink.classList.contains('book__image') &&
        !imgLink.classList.contains('favorite')) {
        imgLink.classList.add('favorite');
        const favoriteBook = imgLink.getAttribute('data-id');
        favoriteBooks.push(favoriteBook);
      } else if (imgLink.classList.contains('book__image')){
        imgLink.classList.remove('favorite');
        const removedBook = favoriteBooks.indexOf(imgLink.getAttribute('data-id'));
        favoriteBooks.splice(removedBook, 1);
      }
      console.log(favoriteBooks);
    });
  }
}