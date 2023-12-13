import React from 'react';
import main from './main.module.css';
import { Link } from 'react-router-dom';

export interface BookProps {
  title: string;
  image: string;
  price: string;
  rating: string[];
  isbn13: number;
}

const Book: React.FC<BookProps> = ({ title, image, price, rating, isbn13}) => {
  return (
    <div className={main.main__book}>
      <img className={main.main__book_image} src={image} alt={title} />
      <h2 className={main.main__book_title}>{title}</h2>
      <p className={main.main__book_authors}>by Lentin Joseph, Apress 2018</p>
      <p className={main.main__book_rating}>{rating}</p>
      <p className={main.main__book_price}>{price}</p>
      <Link to={`/books/${isbn13}`}>View Details</Link>
    </div>
  );
};
export default Book;