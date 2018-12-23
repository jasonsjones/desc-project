import ClientRequest from './client-request-model';
import { createItem } from '../item/item-controller';

export const createClientRequest = requestData => {
    if (!requestData) {
        return Promise.reject(new Error('client request data is required'));
    }

    let clientRequest = new ClientRequest();
    clientRequest.clientId = requestData.clientId;
    clientRequest.submittedBy = requestData.submittedBy;

    if (!requestData.items) {
        return clientRequest.save();
    }

    if (Array.isArray(requestData.items)) {
        let createItemArray = [];
        requestData.items.forEach(item => {
            item.clientRequest = clientRequest._id;
            createItemArray.push(createItem(item));
        });

        return Promise.all(createItemArray).then(values => {
            clientRequest.items = values.map(item => item._id);
            return clientRequest.save();
        });
    } else {
        requestData.items.clientRequest = clientRequest._id;
        return createItem(requestData.items).then(item => {
            clientRequest.items = [item._id];
            return clientRequest.save();
        });
    }
};

export const getClientRequests = () => {
    return ClientRequest.find({}).exec();
};

export const getClientRequest = id => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    return ClientRequest.findById(id).exec();
};
