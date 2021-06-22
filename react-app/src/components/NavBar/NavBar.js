import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    let setLinks;

    if (sessionUser) {
        setLinks = (
            <LogoutButton />
        )
    } else {
        setLinks = (
            <>
                <NavLink to="/login" exact={true} activeClassName="active">Login</NavLink>
                <NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div>
            <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
            {setLinks}
        </div>
    );
}

export default NavBar;
