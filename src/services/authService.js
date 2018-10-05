class AuthService {

    isUserLogged = () => {
        let sessionId = localStorage.getItem("sessionId");
        return sessionId ? true : false;
    };
}
export const authService = new AuthService();
