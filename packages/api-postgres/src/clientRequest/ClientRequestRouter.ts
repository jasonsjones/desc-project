import express from 'express';
import ClientRequestController from './ClientRequestController';

class ClientRequestRouter {
    private static router = express.Router();

    static getRouter(): express.Router {
        ClientRequestRouter.defineRoutes();
        return ClientRequestRouter.router;
    }

    private static defineRoutes(): void {
        ClientRequestRouter.router.route('/').post(ClientRequestController.createClientRequest);
    }
}

export default ClientRequestRouter;
