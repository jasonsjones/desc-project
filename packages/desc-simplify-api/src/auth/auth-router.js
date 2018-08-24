import express from 'express';

export default passport => {
    let authRouter = express.Router();

    authRouter.post('/login', passport.authenticate('local'), (req, res) => {
        const user = req.user;
        res.json({
            success: true,
            message: 'user authenticated',
            payload: {
                user
            }
        });
    });

    return authRouter;
};
