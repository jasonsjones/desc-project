import express from 'express';
import * as ItemController from './item-controller';

const handleError = response => {
    return err =>
        response.json({
            success: false,
            message: err.message,
            error: err
        });
};

export default () => {
    let itemRouter = express.Router();

    itemRouter
        .route('/')
        .get((req, res) => {
            ItemController.getItems()
                .then(items =>
                    res.json({
                        success: true,
                        message: 'items fetched',
                        payload: {
                            items
                        }
                    })
                )
                .catch(handleError(res));
        })
        .post((req, res, next) => {
            ItemController.createItem(req.body)
                .then(item =>
                    res.json({
                        success: true,
                        message: 'item created',
                        payload: {
                            item
                        }
                    })
                )
                .catch(handleError(res));
        });

    itemRouter
        .route('/:id([0-9a-zA-Z]{24})')
        .get((req, res) => {
            ItemController.getItem(req.params.id)
                .then(item =>
                    res.json({
                        success: true,
                        message: 'item fetched',
                        payload: { item }
                    })
                )
                .catch(handleError(res));
        })
        .put((req, res) => {
            ItemController.updateItem(req.params.id, req.body)
                .then(item =>
                    res.json({
                        success: true,
                        message: 'item updated',
                        payload: { item }
                    })
                )
                .catch(handleError(res));
        })
        .delete((req, res) => {
            ItemController.deleteItem(req.params.id)
                .then(item =>
                    res.json({
                        success: true,
                        message: 'item deleted',
                        payload: { item }
                    })
                )
                .catch(handleError(res));
        });

    itemRouter.route('/:id([0-9a-zA-Z]{24})/notes').post((req, res) => {
        ItemController.addNote(req.params.id, req.body)
            .then(item =>
                res.json({
                    success: true,
                    message: 'note added to item',
                    payload: { item }
                })
            )
            .catch(handleError(res));
    });
    return itemRouter;
};
