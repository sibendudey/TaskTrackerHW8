import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from "../api/api";

// Starter code attribution: Professor Tuck lecture notes
let LoginForm = connect(({login}) => {return {login};})((props) => {

    function update(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        props.dispatch({
            type: 'UPDATE_LOGIN_FORM',
            data: data,
        });
    }

    function create_token(ev) {
        api.submit_login(props.login, props.history);
    }

    return <div className="navbar-text">
        <Form inline>
            <FormGroup>
                <Input type="text" name="name" placeholder="name"
                       value={props.login.name} onChange={update} />
            </FormGroup>
            <FormGroup>
                <Input type="password" name="pass" placeholder="password"
                       value={props.login.pass} onChange={update} />
            </FormGroup>
            <Button onClick={create_token}>Log In</Button>
        </Form>
    </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
    function logout()   {
        props.dispatch({
            type: "DELETE_TOKEN",
        });
    }
    return <div className="navbar-text">
        Welcome { props.token.user_name }
        <Button onClick={logout}>Logout</Button>
    </div>;
});

function Nav(props) {
    let session_info;
    let navigation;

    if (props.token) {
        session_info = <Session token={props.token} />;
        navigation = <ul className="navbar-nav mr-auto">
            <NavItem>
                <NavLink to="/" href="#" className="nav-link">Home Page</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/tasks" href="#" className="nav-link">Task Feed</NavLink>
            </NavItem>
        </ul>;
    }
    else {
        session_info = <LoginForm history = {props.history}/>;
        navigation =
            <ul className="navbar-nav mr-auto">
                <NavItem>
                    <NavLink to="/users/register" exact={true} activeClassName="active" className="nav-link">Register</NavLink>
                </NavItem>
        </ul>;
    }

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tasktracker
      </span>
            { navigation }
            { session_info }
        </nav>
    );
}

function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Nav);