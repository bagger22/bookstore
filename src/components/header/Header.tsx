import header from './header.module.css'
import logo from '../../assets/logo-bookstore.svg'
import favorite from '../../assets/heart-icon.svg'
import cart from '../../assets/cart-icon.svg'
import profile from '../../assets/profile-icon.svg'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header className={header.header__container}>
            <Link to="/"><img className={header.header__logo} src={logo} alt="logo" /></Link>
            <input className={header.header__input} type="search" placeholder="Search"  />
            <img className={header.header__icon} src={favorite} alt="favorite books" />
            <img className={header.header__icon} src={cart} alt="shopping cart" />
            <Link to="/login"><img className={header.header__icon} src={profile} alt="profile" /></Link>
        </header>
    );
}