import express from 'express';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';
import cors from 'cors';

const app = express();

// const hostname = '127.0.0.1';
const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const corsOptions = {
    origin: [
        `http://localhost:${port}`,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
//app.use(cors());

app.get("/", (req, res) => {
    // res.send("hello");
    res.sendFile(path.resolve('index.html'));
    // res.sendFile(__dirname + "/index.html");
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve('favicon.ico'));
});

app.get("/greenpeace/", async (req, res) => {
    axios.get('https://greenpeace.bcom.tw/playVideo.php')
        .then(function (response) {
            // handle success
            const $ = cheerio.load(response.data);
            const source = $('#source');
            const url = source.attr('src');
            const type = source.attr('type');
            // console.log(`Stream url: ${url}, type: ${type}`);
            res.send(url);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});
