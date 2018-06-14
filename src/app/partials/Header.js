import React from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {

    return (
        <header>
            <nav>
                <div className="nav-wrapper">
                    <div className='container'>
                        <span className='center'><Link to='/'>BitBook</Link></span>
                        <a href="!#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/feed'>Feed</Link></li>
                            <li><Link to='/people'>People</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to='/feed'>Feed</Link></li>
                <li><Link to='/people'>People</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
            </ul>
        </header>
    )
}