const request = require('supertest');
const http = require('http');
const app = require('../app'); // Import the app directly

let server;

const mockProperties = {
  address: 'hargiesa somaliland',
};

describe('api/properties', () => {
  beforeEach(done => {
    server = http.createServer(app);
    server.listen(0, () => {
      // Use a random port assigned by the OS
      console.log(`Test server running on port ${server.address().port}`);
      done();
    });
  });

  afterEach(done => {
    server.close(done); // Ensure the server is closed after each test
  });

  describe('GET /', () => {
    it('should return all properties', async () => {
      const res = await request(server).get('/api/v1/properties');
      expect(res.status).toBe(200);
    });

    it('should return a single property', async () => {
      const res = await request(server).get('/api/v1/properties/1');
      expect(res.status).toBe(200);
    });

    it('should return a 404 if property is not found', async () => {
      const res = await request(server).get('/api/v1/properties/100');
      expect(res.status).toBe(404);
    });

    it('should return properties by landlord id', async () => {
      const res = await request(server).get('/api/v1/properties/2/properties');
      expect(res.status).toBe(200);
    });

    // delete property
    it('should delete a property', async () => {
      const res = await request(server).delete('/api/v1/properties/1');
      expect(res.status).toBe(200);
    });
  });
});
 