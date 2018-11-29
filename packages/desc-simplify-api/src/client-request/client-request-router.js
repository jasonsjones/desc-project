import express from 'express';
import * as ClientRequestController from './client-request-controller';

const handleError = response => {
    return err =>
        response.json({
            success: false,
            message: err.message,
            error: err
        });
};

export default () => {
    let clientRequestRouter = express.Router();

    clientRequestRouter
        .route('/')
        .post((req, res) => {
            ClientRequestController.createClientRequest(req.body)
                .then(clientRequest =>
                    res.json({
                        success: true,
                        message: 'client request created',
                        payload: {
                            clientRequest
                        }
                    })
                )
                .catch(handleError(res));
        })
        .get((req, res) => {
            ClientRequestController.getClientRequests()
                .then(clientRequests =>
                    res.json({
                        success: true,
                        message: 'client requests fetched',
                        payload: {
                            clientRequests
                        }
                    })
                )
                .catch(handleError(res));
        });

    return clientRequestRouter;
};
