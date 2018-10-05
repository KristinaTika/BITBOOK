import React, { Component, Fragment } from 'react';
import { UserList } from '../components/Users/UsersList';
import { usersServices } from "../../services/usersServices";
import { SearchUsers } from "../components/Users/SearchUsers";
import { Loader } from '../partials/Loader';

export class PeoplePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            inputValue: "",
            filteredUsers: []
        }
        this.handlerSearchUsers = this.handlerSearchUsers.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        usersServices.fetchUsers()
            .then(data => this.setState({ users: data, filteredUsers: data }));
    }

    handlerSearchUsers(e) {
        const { users } = this.state;
        this.setState({ inputValue: e.target.value });
        const filteredUsers = users.filter(user => {
            let userName = user.name.toLowerCase();
            return userName.match(e.target.value.toLowerCase());
        });
        this.setState({ filteredUsers });
    }

    closeSearch = (event) => {
        this.setState({ inputValue: '' });
        this.loadUsers();
    }

    render() {
        const { inputValue, filteredUsers, users } = this.state;
        return (
            <Fragment>
                <SearchUsers searchInputValue={inputValue} handlerSearchUsers={this.handlerSearchUsers} closeSearch={this.closeSearch} />
                {users.length === 0 ? <Loader /> :<UserList users={filteredUsers} />}
            </Fragment>
        );
    }
}