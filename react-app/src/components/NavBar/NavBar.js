import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
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
                    <NavLink to ="/allPlanets" exact={true} activeClassName="active">
                        Tradeable Planets
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
            {setLinks}
        </div>
    );
}

export default NavBar;
