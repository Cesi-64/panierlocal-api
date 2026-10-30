const express = require('express');
const { paniers } = require('./data');

function createApp(config = {}) {
  const env = config.env || process.env.APP_ENV || 'dev';
  const version = config.version || process.env.APP_VERSION || 'local';

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  // Sonde de santé utilisée par les tests de fumée du pipeline
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', env, version });
  });

  // Liste des paniers, filtre optionnel ?disponible=true
  app.get('/paniers', (req, res) => {
    let resultat = paniers;
    if (req.query.disponible === 'true') {
      resultat = paniers.filter((p) => p.disponible);
    }
    res.json(resultat);
  });

  // Détail d'un panier
  app.get('/paniers/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erreur: 'Identifiant invalide' });
    }
    const panier = paniers.find((p) => p.id === id);
    if (!panier) {
      return res.status(404).json({ erreur: 'Panier introuvable' });
    }
    return res.json(panier);
  });

  app.use((req, res) => res.status(404).json({ erreur: 'Route inconnue' }));

  return app;
}

module.exports = { createApp };
