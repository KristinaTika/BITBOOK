import React from "react";
import PropTypes from 'prop-types';

export const SearchUsers = (props) => {

    return (
        <div className="container">
            <div className="row">
            <nav className="people-search">
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" value={props.searchInputValue} onChange={props.handlerSearchUsers} required />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons" onClick={props.closeSearch}>close</i>
                        </div>
                    </form>
                </div>
                </nav>
            </div>
        </div>
    );
} 
SearchUsers.propTypes = {
    searchInputValue: PropTypes.string,
    handlerSearchUsers: PropTypes.func.isRequired,
    closeSearch: PropTypes.func.isRequired
}