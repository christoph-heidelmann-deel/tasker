import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import axios from "axios";
import { login } from "../actions";
import store from "../store/index";
import { API_ENDPOINT } from "../constants/apiEndpoint";

const useStyles = makeStyles(theme => ({}));

function Tasks(props) {
  const classes = useStyles();

  const [newTask, setNewTask] = useState(null);

  const removeIcon = id => {
    axios
      .delete(`${API_ENDPOINT}${props.username}/${id}`)
      .then(response => {
        store.dispatch(login(props.username, response.data.tasks));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddTask = e => {
    e.preventDefault();
    axios
      .put(`${API_ENDPOINT}${props.username}`, { content: newTask })
      .then(response => {
        store.dispatch(login(props.username, response.data.tasks));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        {props.tasks.map((value, index) => {
          return (
            <ListItem button key={value._id}>
              <ListItemText primary={value.task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeIcon(value._id)}
                >
                  <DeleteOutline />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <form noValidate onSubmit={handleAddTask}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newTask"
          label="NewTask"
          name="newTask"
          onChange={e => setNewTask(e.target.value)}
          value={newTask}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>
      </form>
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
