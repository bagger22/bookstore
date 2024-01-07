import React, { ChangeEvent, useEffect, useState } from 'react';
import BookList from './BookList';
import { BookProps } from './Book';
import main from './main.module.css';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import footer from '../footer/footer.module.css';
import Pagination from '../pagination/Pagination';
import { fetchNewBooks } from '../../shared/api/api';
const MainApp: React.FC = () => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useLocalStorage('buttonText', 'SUBSCRIBE');
  const [buttonDisabled, setButtonDisabled] = useLocalStorage('buttonDisabled', false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const booksPerPage = 9;
  const totalBooksToShow = 50;


  useEffect(() => {const fetchData = async () => {
    try {
      setLoading(true);
  
      if (totalBooks >= totalBooksToShow) {
        return;
      }
  
      const response = await fetchNewBooks(currentPage, booksPerPage);
  
      setTotalBooks((prevTotal) => prevTotal + response.books.length);
      setBooks((prevBooks) => [...prevBooks, ...response.books] as BookProps[]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

    fetchData();
  }, [currentPage, totalBooks]);

  const totalPages = Math.ceil(totalBooksToShow / booksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const toggleContent = () => {
    if (email.trim() === '') {
      setErrorMessage('Please enter your email.');
    } else if (isValidEmail(email)) {
      setButtonText('Good!');
      setButtonDisabled(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid email.');
    }
  };

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };



  return (
  <main className={main.container}>
    <h1 className={main.main__title}>New Releases Books</h1>
    {loading ? (
      <div className={main.main__loader}>
        <div className={main.main__spinner}></div>
      </div>
    ) : (
      <>
        <BookList books={books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    )}

<div className={footer.footer__frame}>
        <h2 className={footer.footer__title}>subscribe to newsletter</h2>
        <p className={footer.footer__description}>
          Be the first to know about new IT books, upcoming releases, exclusive offers and more.
        </p>
        <div className={footer.footer__form_group}>
          <input
            className={footer.footer__input}
            placeholder="Your email"
            type="text"
            value={email}
            onChange={handleInputChange}
          />
          <button
            disabled={buttonDisabled}
            onClick={toggleContent}
            className={footer.footer__input_button}
          >
            {buttonText}
          </button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </main>
  );
};

export default MainApp;
