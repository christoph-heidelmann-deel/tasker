import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux'
import axios from 'axios'
import { login } from '../actions'
import store from '../store/index'

function Tasks(props) {
    const removeIcon = (id) => {
        axios.delete(`http://localhost:8081/${props.username}/${id}`)
            .then((response) => {
                store.dispatch(login(props.username, response.data.tasks))
            })
            .catch((error) => {
                console.log(error);
            }); 
    };

    return (
        <div>
            <List component="nav" aria-label="main mailbox folders">
                {props.tasks.map((value, index) => {
                    return <ListItem button key={value._id}>
                        <ListItemText primary={value.task} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => removeIcon(value._id)}>
                                <DeleteOutline/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
        </div>
    );
}
  
const mapStateToProps = state => {
    return {
        tasks: state.user.tasks,
        username: state.user.username
    };
};

export default connect(mapStateToProps)(Tasks);