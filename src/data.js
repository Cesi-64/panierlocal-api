// Données en mémoire : pas de base de données pour rester centré sur le pipeline.
const paniers = [
  { id: 1, nom: 'Panier légumes de saison', prix: 18.5, producteur: 'Ferme des Sables', disponible: true },
  { id: 2, nom: 'Panier fruits', prix: 15.0, producteur: 'Vergers du Moulin', disponible: true },
  { id: 3, nom: 'Panier mixte famille', prix: 29.9, producteur: 'Collectif des Landes', disponible: false },
  { id: 4, nom: 'Panier crèmerie', prix: 22.0, producteur: 'Laiterie de la Vallée', disponible: true }
];

module.exports = { paniers };
