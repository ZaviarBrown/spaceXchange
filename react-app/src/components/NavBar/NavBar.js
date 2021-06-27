import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import { getAllPlanets } from '../../store/planet';
import searchIcon from '../../assets/outline_search_white_24dp.png';
import styles from './NavBar.module.css';

const NavBar = () => {
    const dispatch = useDispatch();
    
    const [search, setSearch] = useState('');
    const planets = useSelector((state) => Object.values(state.planet));
    console.log(planets);
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

    useEffect(() => {
        dispatch(getAllPlanets());
        }, []);

    const filterPlanets = (planets, search) => {
        if (!search) {
            return planets;
        }

        return planets.filter((planetName) => {
            let data = [];
            let lowerSearch = search.toLowerCase()
            const planet = planetName.name.toLowerCase();
            const ticker = planetName.ticker.toLowerCase();
            data.push(planet)
            data.push(ticker)

            return data.includes(lowerSearch) || ticker.includes(lowerSearch)
        })
    }

    const searchFilter = filterPlanets(planets, search)

    console.log()

    return (
        <div className={styles.navContainer}>
            <div className={styles.navA}>
                    <NavLink to="/dashboard" exact={true} activeClassName="active">
                        spaceXchange
                    </NavLink>
                </div>
            <div className={styles.searchBar}>
                <div className={styles.inputContainer}>
                    <form action='/' method='GET'>
                        <input type="text" 
                        value={search}
                        onChange={((e) => setSearch(e.target.value))}/>
                    <img src={searchIcon} className={styles.searchIcon} />
                    </form>
                    <div className={styles.searchList}>
                        <ul> {(search.length > 0) ? 
                            searchFilter.map((planet) => (
                                <div className={styles.searchItem}>
                                    <NavLink to={`/planet/${planet.id}`}>
                                        <li key={planet.id} onClick={(e) => setSearch('')}>{ planet.name }</li>
                                    </NavLink>
                                </div>
                            ))
                        : null }
                        </ul>
                    </div>
                </div>
            </div>
            {setLinks}
        </div>
    );
}

export default NavBar;
