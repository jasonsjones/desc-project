import indexRouter from '../index/index-router';
import userRouter from '../user/user-router';

export default app => {
    app.use('/', indexRouter());
    app.use('/api/user', userRouter());
};
