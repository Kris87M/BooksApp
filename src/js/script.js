/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
    class: {
      favorite: 'favorite',
      image: 'book__image',
      hidden: 'hidden',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      // console.log('This Book List:', thisBookList);
      
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }
    
    initData() {
      this.data = dataSource.books;
    } 
    
    getElements() {
      const thisBookList = this;
      thisBookList.dom = {};
      thisBookList.dom.container = document.querySelector(select.containerOf.bookList);
    }
    
    render() {
      const thisBookList = this;
      for (let book of dataSource.books) {
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;
        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.books(book);
        // console.log(generatedHTML);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBookList.dom.container.appendChild(element);
      }
    }
    
    initActions() {
      const thisBookList = this;
      const booksContainer = document.querySelector(select.containerOf.bookList);
      booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const imgLink = event.target.offsetParent;
        if (imgLink.classList.contains(select.class.image) &&
        !imgLink.classList.contains(select.class.favorite)) {
          imgLink.classList.add(select.class.favorite);
          const favoriteBook = imgLink.getAttribute('data-id');
          thisBookList.favoriteBooks.push(favoriteBook);
        } else if (imgLink.classList.contains(select.class.image)){
          imgLink.classList.remove(select.class.favorite);
          const removedBook = thisBookList.favoriteBooks.indexOf(imgLink.getAttribute('data-id'));
          thisBookList.favoriteBooks.splice(removedBook, 1);
        }
        // console.log(thisBookList.favoriteBooks);
      });
      const filtersForm = document.querySelector(select.containerOf.filters);
      filtersForm.addEventListener('click', function (event) {
        // console.log(event.target);
        const val = event.target.value;
        // console.log(val);
        if (event.target.checked) { thisBookList.filters.push(val); }
        else { thisBookList.filters.splice(thisBookList.filters.indexOf(val), 1); }
        // console.log(thisBookList.filters);
        const filters = thisBookList.filters;
        thisBookList.filterBooks(filters);
      });
    }

    filterBooks(filters) {
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
          filterBook.classList.add(select.class.hidden);
        } else {
          filterBook.classList.remove(select.class.hidden);
        }
      }
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear - gradient(to bottom, #fefcea 0 %, #f1da36 100 %);'; 
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);'; 
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);'; 
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);'; 
      }
    }
  }

  const app = new BooksList();

}