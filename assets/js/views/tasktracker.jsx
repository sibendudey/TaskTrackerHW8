import React from 'react';
import {Provider, connect} from 'react-redux';
import Nav from './Nav';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import api from "../api/api";
import {Form, FormGroup, NavItem, Input, Button, Label} from 'reactstrap';

// Starter code attribution : Professor Nat Tuck

let Tasktracker = connect((state) => state)((props) => {
    return (
        <Router>
            <div>
                <Nav/>
                <Route path="/" exact={true} render={() => {
                    if (props.token != null)
                        return <div>You are logged in</div>;
                    else return <div>You are not logged in</div>
                }}/>
                <Route path="/tasks" exact={true} render={() => {
                    console.log(props.users);
                    return <div>
                        <TaskFeed users={props.users} token={props.token} tasks={props.tasks}/>
                    </div>;
                }}/>
                <Route path="/users/register" exact={true} render={(props) =>
                    <RegisterForm history={props.history}/>
                }/>
            </div>
        </Router>
    );
});

function TaskFeed(props){
    console.log("Task Feed is rendered");
    console.log(props.tasks);
    let taskItems = props.tasks.map(task => {
        return <TaskItem key={task.id} users={props.users} task={task} token={props.token}/>
    });

    return <div>
        <CreateTaskItem users={props.users} token={props.token}/>
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Time Taken</th>
                <th> </th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {taskItems}
            </tbody>
        </table>
    </div>;
}


function TaskItem(props) {
    console.log(props.users);
    let data = {};
    function update(ev)   {
        let tgt = $(ev.target);
        if (tgt.attr('name') === "completed")   {
            data[tgt.attr('name')] = tgt.val() === "on";
        }
        else
            data[tgt.attr('name')] = tgt.val();
    }

    function edit_task(id)    {
        data["id"] = id;
        api.update_task(data, props.token);
    }

    function delete_task(id)  {
        api.delete_task(id, props.token);
    }

    return <tr>
        <Form inline>
        <FormGroup>
            <Input type="hidden" name="id" defaultValue={props.task.id} onChange={update}/>
        </FormGroup>
        <FormGroup>
            <Input type="text" name="title" placeholder="title" defaultValue={props.task.title} onChange={update}/>
        </FormGroup>
            <td>
        <FormGroup>
            <Input type="text" name="description" placeholder="description" defaultValue={props.task.description}
                   onChange={update}/>
        </FormGroup>
            </td>
            <td>
                <FormGroup>
                    <Input type="select" name="user_id" value={props.task.user_id}
                           onChange={update}>
                        { props.users.map( user => {
                            return <option value={user.id}>{user.name}</option>
                        }) }
                    </Input>
                </FormGroup>
            </td>
            <td>
        <FormGroup>
            <Input type="checkbox" name="completed" defaultChecked={props.task.completed} />
        </FormGroup>
            </td>
            <td>
        <FormGroup>
            <Input type="text" name="Time Spent" defaultValue={props.task.timetrackers[0].time}
                   onChange={update}/>
        </FormGroup>
            </td>
            <td>
        <Button onClick={() => edit_task(props.task.id)}>Edit Task</Button>
        <Button onClick={() => delete_task(props.task.id)}>Delete Task</Button>
            </td>
    </Form></tr>;
}

function CreateTaskItem(props) {

    let data = {};

    function create_task() {
        api.create_task(data, props.token);
    }

    function on_change(ev) {
        let tgt = $(ev.target);
        if (tgt.attr('name') === "completed")   {
            data[tgt.attr('name')] = tgt.val() === "on";
        }
        else
            data[tgt.attr('name')] = tgt.val();
    }

    return <div>
        <h5>Create a Task</h5>
        <Form>
            <FormGroup>
                <Input type="text" name="title" placeholder="title" defaultValue={""} onChange={on_change}/>
            </FormGroup>
            <FormGroup>
                <Input type="text" name="description" placeholder="description" defaultValue={""} onChange={on_change}/>
            </FormGroup>
            <FormGroup>
                <Input type="select" name="user_id" value="select_user" onChange={on_change}>
                    <option value="select_user"></option>
                    { props.users.map( user => {
                        return <option key={user.id} value={user.id}>{user.name}</option>
                    }) }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="completed">Task Progress:</Label>
                <Input type="checkbox" name="completed" defaultChecked={""} onChange={on_change}/>
            </FormGroup>
            <FormGroup>
                <Input type="text" name="time spent" defaultValue={""} placeholder="Time spent" onChange={on_change}/>
            </FormGroup>
            <Button onClick={create_task}> Create </Button>
            <Button type="reset"> Reset </Button>
        </Form>
    </div>;
}


let RegisterForm = connect((props, {register}) => {
    return Object.assign({}, props, register);
})((props) => {

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

    return <div style={{padding: "4ex"}}>
        <Form>
            <FormGroup>
                <Input type="text" name="name" placeholder="name"
                       value={props.register.name} onChange={update}/>
            </FormGroup>
            <FormGroup>
                <Input type="email" name="email" placeholder="email"
                       value={props.register.email} onChange={update}/>
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" placeholder="password"
                       value={props.register.password} onChange={update}/>
            </FormGroup>
            <Button onClick={create_user}>Register</Button>
        </Form>
    </div>;
});


export default function tasktracker_init(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Tasktracker/>
        </Provider>, document.getElementById('root')
    );
}