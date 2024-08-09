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
  }

  render();
}