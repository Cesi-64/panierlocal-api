const request = require('supertest');
const { createApp } = require('../src/app');

const app = createApp({ env: 'test', version: 'test-sha' });

describe('GET /health', () => {
  test('répond ok avec l\'environnement et la version', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', env: 'test', version: 'test-sha' });
  });
});

describe('GET /paniers', () => {
  test('renvoie la liste complète', async () => {
    const res = await request(app).get('/paniers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  test('filtre les paniers disponibles', async () => {
    const res = await request(app).get('/paniers?disponible=true');
    expect(res.status).toBe(200);
    expect(res.body.every((p) => p.disponible)).toBe(true);
    expect(res.body).toHaveLength(3);
  });
});

describe('GET /paniers/:id', () => {
  test('renvoie un panier existant', async () => {
    const res = await request(app).get('/paniers/1');
    expect(res.status).toBe(200);
    expect(res.body.nom).toBe('Panier légumes de saison');
  });

  test('renvoie 404 pour un panier inexistant', async () => {
    const res = await request(app).get('/paniers/999');
    expect(res.status).toBe(404);
  });

  test('renvoie 400 pour un identifiant invalide', async () => {
    const res = await request(app).get('/paniers/abc');
    expect(res.status).toBe(400);
  });
});

describe('Sécurité de base', () => {
  test('n\'expose pas l\'en-tête X-Powered-By', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
