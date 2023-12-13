import React from 'react';
import Book, { BookProps } from './Book';
import main from './main.module.css';

interface BookListProps {
  books: BookProps[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    
    <div className={main.main__books_container}>
      {books.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </div>
  );
};

export default BookList;