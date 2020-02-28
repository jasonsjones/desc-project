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

    public getAPIRoute(): Test {
        return request(this.app).get('/api');
    }

    public creatUser(userData: { firstName: string; lastName: string; email: string }): Test {
        return request(this.app)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(userData);
    }
}

export default TestClient;
