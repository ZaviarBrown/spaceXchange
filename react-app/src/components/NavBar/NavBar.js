import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import searchIcon from '../../assets/outline_search_white_24dp.png';
import styles from './NavBar.module.css';

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    let setLinks;

    if (sessionUser) {
        setLinks = (
            <>
                <div className={styles.navC}>
                    <NavLink to="/dashboard" exact={true} activeClassName="active">
                        Dashboard
                    </NavLink>
                    <LogoutButton />
                </div>
            </>
        )
    } else {
        setLinks = (
            <div className={styles.navC}>
                <NavLink to="/login" className={styles.navlogin} exact={true} activeClassName="active">Login
                </NavLink>
                <NavLink to="/sign-up" className={styles.navsignup} exact={true} activeClassName="active">Sign Up
                </NavLink>
            </div>
        );
    }

    return (
        <div className={styles.navContainer}>
            <div className={styles.navA}>
                    <NavLink to="/dashboard" exact={true} activeClassName="active">
                        spaceXchange
                    </NavLink>
                </div>
            <div className={styles.searchBar}>
                <div className={styles.inputContainer}>
                    <input type="text" />
                    <img src={searchIcon} className={styles.searchIcon} />
                </div>
            </div>
            {setLinks}
        </div>
    );
}

export default NavBar;
