import React from 'react';
import { Provider, connect } from 'react-redux';
import Nav from './Nav';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import api from "../api/api";
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';

let Tasktracker = connect((state) => state)((props) => {
    return (
        <Router>
            <div>
                <Nav />
                <Route path="/" exact={true} render={() =>{
                    if (props.token != null)
                    return <div>You are logged in</div>;
                    else return <div>You are not logged in</div>
                } } />
                <Route path="/users" exact={true} render={() =>
                    <div>Users page</div>
                } />
                <Route path="/users/register" exact={true} render={(props) =>
                    <RegisterForm history={props.history}/>
                } />
                <Route path="/users/:user_id" render={({match}) =>
                    <div></div>
                } />
            </div>
        </Router>
    );
});

let RegisterForm = connect((props, {register}) => {return Object.assign({}, props, register);})((props) => {

    console.log(props);
    function create_user(ev) {
        api.create_new_user(props.register, props.history);
    }

    function update(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        props.dispatch({
            type: 'UPDATE_REGISTER_FORM',
            data: data,
        });
    }

    return <div style={ {padding: "4ex"} }>
        <Form>
            <FormGroup>
                <Input type="text" name="name" placeholder="name"
                       value={props.register.name} onChange={update} />
            </FormGroup>
            <FormGroup>
                <Input type="email" name="email" placeholder="email"
                       value={props.register.email} onChange={update} />
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" placeholder="password"
                       value={props.register.password} onChange={update} />
            </FormGroup>
            <Button onClick={create_user}>Register</Button>
        </Form>
    </div>;
});


export default function tasktracker_init(store) {
    ReactDOM.render(
        <Provider store = {store}>
            <Tasktracker />
        </Provider>, document.getElementById('root')
    );
}