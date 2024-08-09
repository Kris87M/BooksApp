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
      // console.log(favoriteBooks);
    });
    const filters = [];
    const filtersForm = document.querySelector('.filters');
    // console.log(filtersForm)
    filtersForm.addEventListener('click', function (event) {
      // console.log(event.target);
      const val = event.target.value;
      // console.log(val);
      if (event.target.checked) { filters.push(val); }
      else { filters.splice(filters.indexOf(val), 1); }
      // console.log(filters);
      filterBooks(filters);
    });
  }
  function filterBooks(filters) {
    for (const book of dataSource.books) {
      // console.log(book);
      let shouldBeHidden = false;
      const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      for (const filter of filters) {
        // console.log(filter)
        if (!book.details[filter]) {
          // console.log(!book.details[filter]);
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden === true) {
        filterBook.classList.add('hidden');
      } else {
        filterBook.classList.remove('hidden');
      }
    }
  }
}