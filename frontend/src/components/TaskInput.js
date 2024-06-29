import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addTask } from '../redux/actions';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();

    const handleAddTask = async () => {
        if (task.trim()) {
            const newTask = { text: task, completed: false };
            const response = await axios.post('http://localhost:5000/tasks', newTask);
            dispatch(addTask(response.data));
            setTask('');
        }
    };

    return (
        <div className="task-input">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default TaskInput;
