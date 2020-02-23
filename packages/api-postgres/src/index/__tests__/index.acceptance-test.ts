import request from 'supertest';
import app from '../../config/app';

it('get / route returns json payload', (): Promise<void> => {
    return request(app)
        .get('/')
        .then((res): void => {
            const json = res.body;
            expect(json).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    url: expect.any(String)
                })
            );
        });
});

it('get /api route returns json payload', (): Promise<void> => {
    return request(app)
        .get('/api')
        .then((res): void => {
            const json = res.body;
            expect(json).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    name: expect.any(String),
                    version: expect.any(String)
                })
            );
        });
});
