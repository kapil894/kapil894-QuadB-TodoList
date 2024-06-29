import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, EDIT_TASK } from './actions';

const initialState = {
    tasks: []
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter(task => task._id !== action.payload) };
        case TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload.id ? { ...task, text: action.payload.text } : task
                )
            };
        default:
            return state;
    }
};
