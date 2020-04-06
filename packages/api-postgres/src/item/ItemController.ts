import { Request, Response } from 'express';
import ItemService from './ItemService';

class ItemController {
    static createItem(req: Request, res: Response): Promise<Response> {
        const { category, name, priority, quantity, requestorId } = req.body;
        return ItemService.createItem({ category, name, priority, quantity, requestorId }).then(
            item => {
                return res.status(201).json({
                    success: true,
                    message: 'item created',
                    payload: {
                        item: item?.toClientJSON()
                    }
                });
            }
        );
    }

    static getAllItems(_: Request, res: Response): Promise<Response> {
        return ItemService.getAllItems().then(items => {
            let sanitizedItems;
            if (items) {
                sanitizedItems = items.map(item => item.toClientJSON());
            }
            return res.json({
                success: true,
                message: 'items fetched',
                payload: {
                    items: sanitizedItems
                }
            });
        });
    }

    static getItem(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        return ItemService.getItemById(id).then(item => {
            if (item) {
                return res.json({
                    success: true,
                    message: 'item fetched',
                    payload: { item: item.toClientJSON() }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'item not found',
                    payload: { item: null }
                });
            }
        });
    }

    static updateItem(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const updateData = req.body;
        return ItemService.updateItem(id, updateData).then(item => {
            if (item) {
                return res.json({
                    success: true,
                    message: 'item updated',
                    payload: { item: item.toClientJSON() }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'item not found',
                    payload: { item: null }
                });
            }
        });
    }

    static deleteItem(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        return ItemService.deleteItem(id).then(item => {
            if (item) {
                return res.json({
                    success: true,
                    message: 'item deleted',
                    payload: { item: item.toClientJSON() }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'item not found',
                    payload: { item: null }
                });
            }
        });
    }
}

export default ItemController;
