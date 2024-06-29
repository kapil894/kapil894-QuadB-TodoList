import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTask, toggleTask, editTask, addTask } from '../redux/actions';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/tasks');
            response.data.forEach((task) => dispatch(addTask(task)));
        };

        fetchTasks();
    }, [dispatch]);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        dispatch(deleteTask(id));
    };

    const handleToggle = async (id) => {
        await axios.patch(`http://localhost:5000/tasks/${id}`);
        dispatch(toggleTask(id));
    };

    const handleEdit = async (id, newText) => {
        const response = await axios.put(`http://localhost:5000/tasks/${id}`, { text: newText });
        dispatch(editTask(id, response.data.text));
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task._id} className={task.completed ? 'completed' : ''}>
                    <span>{task.text}</span>
                    <button onClick={() => handleToggle(task._id)}>Toggle</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                    <button onClick={() => {
                        const newText = prompt("Edit task:", task.text);
                        if (newText) handleEdit(task._id, newText);
                    }}>Edit</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
