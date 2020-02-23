import TestClient from '../../testUtils/TestClient';

it('get / route returns json payload', async (): Promise<void> => {
    const client = new TestClient();
    const response = await client.getIndexRoute();

    expect(response.body).toEqual(
        expect.objectContaining({
            success: expect.any(Boolean),
            message: expect.any(String),
            url: expect.any(String)
        })
    );
});

it('get /api route returns json payload', async (): Promise<void> => {
    const client = new TestClient();
    const response = await client.getAPIRoute();

    expect(response.body).toEqual(
        expect.objectContaining({
            success: expect.any(Boolean),
            name: expect.any(String),
            version: expect.any(String)
        })
    );
});
