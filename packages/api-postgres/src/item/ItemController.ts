import { Request, Response } from 'express';
import ItemService from './ItemService';

class ItemController {
    static createItem(req: Request, res: Response): Promise<Response> {
        const { category, name, requestorId } = req.body;
        return ItemService.createItem({ category, name, requestorId }).then(item => {
            return res.json({
                success: true,
                message: 'item created',
                payload: {
                    item: item?.toClientJSON()
                }
            });
        });
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
}

export default ItemController;
