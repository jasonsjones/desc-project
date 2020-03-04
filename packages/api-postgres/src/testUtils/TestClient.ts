import { Application } from 'express';
import request, { Test } from 'supertest';
import app from '../config/app';
import UserService from '../user/UserService';
import User from '../entity/User';

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

    public createTestUser(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<User> {
        const { firstName, lastName, email, password } = userData;
        return UserService.createUser(firstName, lastName, email, password);
    }

    public creatUser(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Test {
        return request(this.app)
            .post('/api/user')
            .set('Content-Type', 'application/json')
            .send(userData);
    }

    public getAllUsers(): Test {
        return request(this.app)
            .get('/api/user')
            .set('Content-Type', 'application/json');
    }

    public getUser(id: string): Test {
        return request(this.app)
            .get(`/api/user/${id}`)
            .set('Content-Type', 'application/json');
    }

    public updateUser(
        id: string,
        updatedData: { firstName?: string; lastName?: string; email?: string }
    ): Test {
        return request(this.app)
            .patch(`/api/user/${id}`)
            .set('Content-Type', 'application/json')
            .send(updatedData);
    }
}

export default TestClient;
