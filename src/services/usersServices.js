import { userEndpoint, profileEndpoint, userEditProfileEndpoint, registerEndpoint, loginEndpoint } from "../shared/constants";
import { get, post, put } from "./APIService";
import { User } from "../entities/User";

class UsersServices {

    fetchSingleUser(userId) {
        const urlUserEndpoint = (`${userEndpoint}/${userId}`);
        return get(urlUserEndpoint)
            .then(user => mapUser(user));
    }

    fetchUsers() {
        return get(userEndpoint)
            .then(users => mapUsers(users));
        }

    fetchProfile() {
        return get(profileEndpoint)
            .then(profile => mapUser(profile));
    }

    registerUser = newUser => (post(registerEndpoint, newUser));
    
    loginUser = loginUser => (post(loginEndpoint, loginUser));
    
    updateUserProfile(name, about, photo) {
        const updateData = {
            name: name,
            email: 'bitStudent@gmail.com',
            aboutShort: about,
            about: about,
            avatarUrl: photo,
            postsCount: 0,
            commentsCount: 0
        }
        return put(userEditProfileEndpoint, updateData);
    }
}

const mapUsers = (users) => {
    return users.map(user => new User (user.id, user.name, "", user.aboutShort, "", user.avatarUrl, "", ""));
}

const mapUser = (user) => {
    return new User(user.userId, user.name, user.email, user.aboutShort, user.about, user.avatarUrl, user.postsCount, user.commentsCount);
}

export const usersServices = new UsersServices();