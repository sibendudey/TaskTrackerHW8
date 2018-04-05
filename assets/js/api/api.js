import store from "../store/store";

//Attribution: Professor Nat Tuck
class TheServer {
    request_tasks(token) {
        $.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            data: {
                token: token
            },
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                console.log(resp.data);
                store.dispatch({
                    type: 'TASKS_LIST',
                    data: resp.data,
                });
            },
            error: (err, resp) => {
                window.alert("Error fetching list of tasks");
            }
        });
    }

    create_task(data, token) {
        console.log("Data is called");
        console.log(data);
        $.ajax("/api/v1/tasks", {
            method: "post",
            dataType: "json",
            data: JSON.stringify({
                token: token,
                task: data
            }),
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    data: resp.data,
                });
            },
            error: (err, resp) => {
                window.alert("Error creating the task");
            }
        });
    }

    update_task(data, token) {
        $.ajax("/api/v1/tasks/" + data["id"], {
            method: "put",
            dataType: "json",
            data: JSON.stringify({
                token: token,
                task: data,
            }),
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    data: resp.data,
                });
            },
            error: (err, resp) => {
                window.alert("Error updating the task");
            }
        });
    }

    delete_task(id, token) {
        $.ajax("/api/v1/tasks/" + id, {
            method: "delete",
            dataType: "json",
            data: JSON.stringify({
                token: token,
            }),
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    data: resp.data,
                });
            },
            error: (err, resp) => {
                window.alert("Error deleting the task");
            }
        });
    }

    request_users() {
        $.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                console.log(resp.data);
                store.dispatch({
                    type: 'USERS_LIST',
                    data: resp.data,
                });
            },
            error: (err, resp) => {
                window.alert("Error fetching list of users");
            }
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
                this.request_users();
                this.request_tasks(resp);
            },
            error: (resp) => {
                window.alert("Error in login. Please try again");
                store.dispatch({
                    type: 'RESET_LOGIN_FORM',
                    data: {name: "", pass: ""}
                });
            }
        });
    }

    create_new_user(data, history) {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                console.log(resp);
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: resp,
                });
                this.request_tasks(resp);
                this.request_users();
                history.push("/");
            },
            error: (resp) => {
                window.alert("Error while registering, Please try again");
                store.dispatch({
                    type: 'RESET_REGISTER_FORM',
                    data: {name: "", password: "", email: ""}
                });
            }
        });
    }
}

export default new TheServer();