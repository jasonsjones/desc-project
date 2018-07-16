import indexRouter from '../index/index-router';

export default app => {
    app.use('/', indexRouter());
};
