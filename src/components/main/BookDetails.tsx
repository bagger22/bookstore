import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../../shared/api/api';
import { BookProps } from '../../shared/api/types';
import main from '../main/main.module.css';
import bookdetails from '../main/bookDetails.module.css';

const BookDetails: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13?: string }>();
  const [book, setBook] = useState<BookProps | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'authors' | 'reviews'>('description');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof isbn13 === 'string') {
          const response = await fetchBookDetails(isbn13);
          setBook(response);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchData();
  }, [isbn13]);

  if (!book) {
    return (
      <div className={main.main__loader}>
        <div className={main.main__spinner}></div>
      </div>
    );
  }

  const renderStars = (rating: number): string => {
    const fullStars = '★'.repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? '½' : '';
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
    return `${fullStars}${halfStar}${emptyStars}`;
  };

  const handleTabClick = (tab: 'description' | 'authors' | 'reviews') => {
    setActiveTab(tab);
  };

  return (
    <div className={bookdetails.details__container}>
       <h2 className={bookdetails.details__title}>{book.title}</h2>
      <div className={bookdetails.details__main_content}>
        <div className={bookdetails.details__image_wrapper}>
          <img className={bookdetails.details__image} src={book.image} alt={book.title} />
        </div>
        <div className={bookdetails.details__wrapper}>
          <p>
            <span className={bookdetails.details__price}>{book.price}</span>
            <span className={bookdetails.details__rating}>
            {book.rating ? <span className={bookdetails.details__details}>{renderStars(book.rating)}</span> : 'N/A'}
            </span>
          </p>
          <p className={bookdetails.details__text}>Authors <span className={bookdetails.details__text_details}>{book.authors}</span></p>
          <p className={bookdetails.details__text}>Publisher <span className={bookdetails.details__text_details}>{book.publisher}</span></p>
          <p className={bookdetails.details__text}>Language <span className={bookdetails.details__text_details}>{book.language}</span></p>
          <p className={bookdetails.details__text}>Pages {book.pages}</p>
          <button type="submit" className={bookdetails.details__button}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={bookdetails.details__info}>
        <p
          className={`${bookdetails.details__tab} ${activeTab === 'description' ? bookdetails.details__active_tab : ''}`}
          onClick={() => handleTabClick('description')}
        >
          Description
        </p>
        <p
          className={`${bookdetails.details__tab} ${activeTab === 'authors' ? bookdetails.details__active_tab : ''}`}
          onClick={() => handleTabClick('authors')}
        >
          Authors
        </p>
        <p
          className={`${bookdetails.details__tab} ${activeTab === 'reviews' ? bookdetails.details__active_tab : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </p>
        <div className={bookdetails.details__content}>
          {activeTab === 'description' && <p className={bookdetails.details__description}>{book.desc}</p>}
          {activeTab === 'authors' && <p className={bookdetails.details__authors}>{book.authors}</p>}
          {activeTab === 'reviews' && <p className={bookdetails.details__reviews}>Reviews content goes here</p>}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
