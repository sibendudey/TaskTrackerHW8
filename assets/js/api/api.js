import store from "../store/store";
//Attribution: Professor Nat Tuck
class TheServer {
    request_posts() {
        $.ajax("/api/v1/posts", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'POSTS_LIST',
                    posts: resp.data,
                });
            },
        });
    }

    request_users() {
        $.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'USERS_LIST',
                    users: resp.data,
                });
            },
        });
    }

    submit_post(data) {
        $.ajax("/api/v1/posts", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ post: data }),
            success: (resp) => {
                store.dispatch({
                    type: 'ADD_POST',
                    post: resp.data,
                });
            },
        });
    }

    submit_login(data) {
        $.ajax("/api/v1/token", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: resp,
                });
            },
            error: (resp) => {
                store.dispatch({
                   type: 'RESET_LOGIN_FORM',
                   data: {name: "", pass: ""}
                });
            }
        });
    }

    create_new_user(data, history)   {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: resp,
                });
                history.push("/");
            },
            error: (resp) => {
                store.dispatch({
                    type: 'RESET_REGISTER_FORM',
                    data: {name: "", password: "", email: ""}
                });
            }
        });
    }
}

export default new TheServer();