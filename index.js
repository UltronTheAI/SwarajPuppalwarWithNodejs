const express = require('express')
const app = express()
const server = require('http').createServer(app)
const mongoose = require('mongoose')
const Blogs = require('./models/blogs')
const Commments = require('./models/comment')
const fs = require('fs')
require('dotenv').config()

var db
async function connect() {
    try {
        db = await mongoose.connect('mongodb+srv://UltronTheAI:' + process.env.PASSWORD + '@cluster0.hqwavr9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        server.listen(process.env.PORT || process.env.PORT)
    } catch (err) {
        console.error(err)
    }
}

app.use(express.static('public')); app.get('/api.blogs.add', async (req, res) => {
    // Code :-
    try {
        var data = JSON.parse(decodeURIComponent(req.url.replace('/api.blogs.add?', '')))
        if (data.password == process.env.PASSWORD) {
            const blog = new Blogs(data)
            await blog.save()
                .then((result) => {
                    res.send('Created successfully !')
                })
                .catch((err) => {
                    res.send('invalid format !')
                })
        } else {
            res.send(404)
        }
    } catch (err) { res.send(404) }
}); app.get('/api.blogs.get', async (req, res) => {
    // Code :-
    try {
        Blogs.find().sort({ updatedAt: -1 })
            .then((result) => { res.send({ data: result }) })
            .catch((err) => { res.send(404) })
    } catch (err) { res.send(404) }
}); app.get('/api.blogs.getNew', async (req, res) => {
    // Code :-
    try {
        Blogs.find().sort({ updatedAt: -1 }).limit(3)
            .then((result) => { res.send({ data: result }) })
            .catch((err) => { res.send(404) })
    } catch (err) { res.send(404) }
}); app.get('/post', async (req, res) => {
    try {
        // decodeURIComponent(req.url.replace('/post?', '').replaceAll(' ', ''))
        Blogs.find().limit(1)
            .then((result) => {
                result = result[0]
                console.log(result)
                fs.readFile(__dirname + '/public/posts/code.sample', { encoding: 'utf8' }, async (err, data) => {
                    await res.send(data.replaceAll('$@title', result.title).replace('$@date', result.date).replace('$@image', result.image).replace('$@body', result.body))
                });
            })
            .catch((err) => { res.send(404) })
    } catch (err) { res.send(404) }
}); app.get('/comment', async (req, res) => {
    try {
        var data = await JSON.parse(decodeURIComponent(req.url.replace('/comment?', '')))
        if (data.name != '' && data.email != '' && data.text != '') {
            const comment = new Commments(data)
            await comment.save()
                .then((result) => {
                    fs.readFile(__dirname + '/public/contact/code.sample', { encoding: 'utf8' }, async (err, out) => {
                        await res.send(out.replaceAll('@$title', 'Comment added !').replace('@$text', '" epicdeveloper14@gmail.com ", will send to email, within 2 days, on your email: " ' + data.email + ' " !'))
                    });
                })
                .catch((err) => {
                    fs.readFile(__dirname + '/public/contact/code.sample', { encoding: 'utf8' }, async (err, data) => {
                        await res.send(data.replaceAll('@$title', 'Failed to send comment !').replace('@$text', 'Failed to post comment, invalid email or text or name !'))
                    });
                })
            fs.readFile(__dirname + '/public/contact/code.sample', { encoding: 'utf8' }, async (err, out) => {
                await res.send(out.replaceAll('@$title', 'Comment added !').replace('@$text', '" epicdeveloper14@gmail.com ", will send to email, within 2 days, on your email: " ' + data.email + ' " !'))
            });
        } else {
            fs.readFile(__dirname + '/public/contact/code.sample', { encoding: 'utf8' }, async (err, data) => {
                await res.send(data.replaceAll('@$title', 'Failed to send comment !').replace('@$text', 'Failed to post comment, invalid email or text or name !'))
            });
        }
    } catch (err) { fs.readFile(__dirname + '/public/contact/code.sample', { encoding: 'utf8' }, async (err, data) => {
        await res.send(data.replaceAll('@$title', 'Failed to send comment !').replace('@$text', 'Failed to post comment, invalid email or text or name !'))
    }); }
}); connect()
