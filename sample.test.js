const request = require('supertest')
const app = require("./src/backend/server")

test('sample', async () => {
    await request(app).get('/sample').expect(200);
})