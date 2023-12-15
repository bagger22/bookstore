import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      
      <Link className={bookdetails.details__back_link} to="/">
        <svg className={bookdetails.details__back} xmlns="http://www.w3.org/2000/svg" width="45" height="24" viewBox="0 0 45 24" fill="none">
        <rect width="24" height="24" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0012 5.99897C11.0012 6.25897 10.9012 6.50897 10.7112 6.70897L6.41116 10.999L44.0012 10.999C44.5512 10.999 45.0012 11.449 45.0012 11.999C45.0012 12.549 44.5512 12.999 44.0012 12.999L6.41116 12.999L10.7112 17.289C11.1012 17.679 11.1012 18.319 10.7112 18.709C10.3212 19.099 9.68116 19.099 9.29116 18.709L3.29116 12.709C3.20116 12.619 3.13116 12.509 3.08116 12.389C3.06116 12.339 3.04116 12.299 3.04116 12.249C2.99116 12.089 2.99116 11.909 3.04116 11.749C3.04116 11.699 3.06116 11.659 3.08116 11.609C3.13116 11.489 3.20116 11.379 3.29116 11.289L9.29116 5.28897C9.68116 4.89896 10.3212 4.89896 10.7112 5.28897C10.9012 5.48897 11.0012 5.73897 11.0012 5.99897Z" fill="#313037"/>
      </svg>
      </Link>
       <h2 className={bookdetails.details__title}>{book.title}</h2>
      <div className={bookdetails.details__main_content}>
        <div className={bookdetails.details__image_wrapper}>
          <img className={bookdetails.details__image} src={book.image} alt={book.title} />
        </div>
        <div className={bookdetails.details__info_wrapper}>
          <p className={bookdetails.details__price_wrapper}>
            <span className={bookdetails.details__price}>{book.price}</span>
            <span className={bookdetails.details__rating}>
            {book.rating ? <span className={bookdetails.details__details}>{renderStars(book.rating)}</span> : 'N/A'}
            </span>
          </p>
          <p className={bookdetails.details__text}>Authors <span className={bookdetails.details__text_details}>{book.authors}</span></p>
          <p className={bookdetails.details__text}>Publisher <span className={bookdetails.details__text_details}>{book.publisher}</span></p>
          <p className={bookdetails.details__text}>Language <span className={bookdetails.details__text_details}>{book.language}</span></p>
          <p className={bookdetails.details__text}>Pages <span className={bookdetails.details__text_details}>{book.pages}</span></p>
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
        <p className={bookdetails.details__line}></p>
        <div className={bookdetails.details__content}>
          {activeTab === 'description' && <p className={bookdetails.details__description}>{book.desc}</p>}
          {activeTab === 'authors' && <p className={bookdetails.details__authors}>{book.authors}</p>}
          {activeTab === 'reviews' && <p className={bookdetails.details__reviews}>Reviews content</p>}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
