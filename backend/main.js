const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasks = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasks);

mongoose.connect('mongodb+srv://kgahlot306:Kapil123@cluster0.wsdjkv1.mongodb.net/quadb-assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
