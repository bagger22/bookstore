import React, { useState } from 'react';
import Book, { BookProps } from './Book';
import main from './main.module.css';

interface BookListProps {
  books: BookProps[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [value, setValue] = useState('');

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Введите название книги"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className={main.main__books_container}>
        {filteredBooks.map((book, index) => (
          <Book key={index} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;