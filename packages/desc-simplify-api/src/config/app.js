import express from 'express';
import morgan from 'morgan';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/api', (req, res) => {
    res.json({
        name: 'desc-simplify-api',
        version: '1.0.0'
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

export default app;
