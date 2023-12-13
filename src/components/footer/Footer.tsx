import footer from './footer.module.css';

export function Footer() {
  return (
    <footer className={footer.footer__container}>
        <p className={footer.footer__line} />
        <p className={footer.footer__text}>©2023 Bookstore</p>
        <p className={footer.footer__text_second}>All rights reserved</p>
    </footer>
  );
}