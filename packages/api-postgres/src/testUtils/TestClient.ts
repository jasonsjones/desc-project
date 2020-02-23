import { Application } from 'express';
import request, { Test } from 'supertest';
import app from '../config/app';

class TestClient {
    private app: Application;

    constructor() {
        this.app = app;
    }

    public getIndexRoute(): Test {
        return request(this.app).get('/');
    }

    public getAPIRoute() {
        return request(this.app).get('/api');
    }
}

export default TestClient;
