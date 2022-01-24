const express = require('express');
const fs = require('fs');
let messages = [];

const router = express.Router();

router.get('/', (req, res) => {
    const path = './files';

    fs.readdir(path, (err, files) => {
        (files.slice(files.length - 5, files.length)).forEach(file => {
            fs.readFile(path + '/' + file, (err, data) => {
                if (err) {
                    console.error(err);
                }
                messages.push(JSON.parse(data));
            });
        });
    })
    let newArr = messages;
    messages = [];
    return res.send(newArr);
});


router.post('/', (req, res) => {
    const message = {
        message: req.body.message,
        datetime: new Date()
    }

    const fileName = './files/' + new Date();

    fs.writeFile(fileName, JSON.stringify(message), (err) => {
        if (err) {
            console.error(err);
        }
    });
    return res.send(message);
});

module.exports = router;