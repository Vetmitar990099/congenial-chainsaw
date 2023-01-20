const express = require('express');
const router = express.Router();

module.exports = (users) => {
    router.get('/', (req, res) => {
        res.render('index');
    });
    router.get('/users', (req, res) => {
        res.render('list', {users:users});
    });
    router.get('/users/create', (req, res) => {
        res.render('create');
    });
    router.get('/users/:id/edit', (req, res) => {
        // find the user and render the edit form
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        if(user) {
            res.render('edit', { user: user });
        } else {
            res.status(404).send('User not found');
        }
    });
    router.get('/users/:id/delete', (req, res) => {
        const id = req.params.id;
    // find the user and delete it from the data
        const userIndex = users.findIndex(user => user.id == id);
        if(userIndex !== -1) {
        users.splice(userIndex, 1);
        res.redirect('/users');
    } else {
        res.status(404).send('User not found');
    }
        res.redirect('/users');
    });
    router.post('/users', (req, res) => {
        const user = {
            id: Date.now(),
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        users.push(user);
        res.redirect('/users');
    });
    router.post('/users/:id', (req, res) => {
        const id = req.params.id;
        // find the user and update it
        const userIndex = users.findIndex(user => user.id == id);
        if(userIndex !== -1) {
            users[userIndex] = {
                id: id,
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            };
            res.redirect('/users');
        } else {
            res.status(404).send('User not found');
        }
    });
    return router;
}
