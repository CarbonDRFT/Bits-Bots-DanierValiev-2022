import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ContentWrapper from '../../elements/ContentWrapper';
import { ReactComponent as Logo } from '../../../images/logo-icon.svg';
import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import { toggleDarkTheme } from '../../../redux/slices/uiSlice';

import type { RootState } from '../../../redux/store';

import './PageNavigation.style.scss';

const PageNavigation = (): JSX.Element => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { user } = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isLoggedIn = Boolean(user);
  const { cartItems } = useSelector((state: RootState) => state.shopping);
  const { darkThemeEnabled } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemsCount = cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleScroll = () => setIsSticky(window.scrollY > 0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`page-navigation ${isSticky ? 'page-navigation--sticky' : ''}`}
    >
      <ContentWrapper>
        <Link to="/">
          <div className="page-navigation__branding">
            <Logo className="page-navigation__logo" />
            <h2 className="page-navigation__title">Bits&Bots</h2>
          </div>
        </Link>
        <ul className="page-navigation__items">
          {isLoggedIn ? (
            <>
              <li className="page-navigation__item">
                <Link to="/">Home</Link>
              </li>
              <li className="page-navigation__item">
                <Link to="/admin">Admin</Link>
              </li>
              <li
                className="page-navigation__item page-navigation__item--spaced"
                onClick={() => dispatch(toggleDarkTheme())}
              >
                <Icon name={darkThemeEnabled ? 'sun' : 'moon'} type="fas" />
              </li>
              <li className="page-navigation__item">
                <Icon name="user" type="fas" />
                <span className="page-navigation__item-text">{user.email}</span>
              </li>
              <li
                onClick={handleLogout}
                className="page-navigation__item page-navigation__item"
              >
                <Icon name="right-from-bracket" type="fas" />
                <span className="page-navigation__item-text">Logout</span>
              </li>
              <li className="page-navigation__item">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="page-navigation__item page-navigation__cart-button">
                <Link to="/cart">
                  <Button
                    text="Cart"
                    icon={<Icon name="shopping-cart" type="fas" />}
                    counter={cartItemsCount}
                  />
                </Link>
              </li>
            </>
          ) : null}
        </ul>
        <div
          className="page-navigation__nav-hider"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="page-navigation__hider-bar" />
          <div className="page-navigation__hider-bar" />
          <div className="page-navigation__hider-bar" />
        </div>
        <div
          className={`page-navigation__mobile-menu ${
            !isMobileMenuOpen ? 'page-navigation__mobile-menu--hidden' : ''
          }`}
        >
          <div
            className="page-navigation__nav-hider-cross"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name="times" type="fas" />
          </div>
          <ul className="page-navigation__mobile-items">
            {isLoggedIn ? (
              <>
                <li className="page-navigation__mobile-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="page-navigation__mobile-item">
                  <Link to="/admin">Admin</Link>
                </li>
                <li
                  className="page-navigation__mobile-item page-navigation__mobile-item--spaced"
                  onClick={() => dispatch(toggleDarkTheme())}
                >
                  <Icon name={darkThemeEnabled ? 'sun' : 'moon'} type="fas" />
                </li>
                <li className="page-navigation__mobile-item">
                  <Icon name="user" type="fas" />
                  <span className="page-navigation__item-text">
                    {user.email}
                  </span>
                </li>
                <li
                  onClick={handleLogout}
                  className="page-navigation__mobile-item"
                >
                  <Icon name="right-from-bracket" type="fas" />
                  <span className="page-navigation__item-text">Logout</span>
                </li>
                <li className="page-navigation__mobile-item">
                  <Link to="/orders">Orders</Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </ContentWrapper>
    </nav>
  );
};

export default PageNavigation;
