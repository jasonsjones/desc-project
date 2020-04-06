import express from 'express';
import ItemController from './ItemController';

class ItemRouter {
    private static router = express.Router();

    static getRouter(): express.Router {
        ItemRouter.defineRoutes();
        return ItemRouter.router;
    }

    private static defineRoutes(): void {
        ItemRouter.router
            .route('/')
            .post(ItemController.createItem)
            .get(ItemController.getAllItems);

        ItemRouter.router
            .route('/:id')
            .get(ItemController.getItem)
            .patch(ItemController.updateItem)
            .delete(ItemController.deleteItem);
    }
}

export default ItemRouter;
