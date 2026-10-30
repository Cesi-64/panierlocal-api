#!/usr/bin/env bash
# Test de fumée : attend que l'API réponde puis vérifie /health et /paniers.
# Usage : ./scripts/smoke-test.sh http://localhost:8081 preprod
set -euo pipefail

URL="${1:?URL de base attendue, ex. http://localhost:8081}"
ENV_ATTENDU="${2:-}"

for i in $(seq 1 20); do
  if curl -fsS "$URL/health" > /tmp/health.json 2>/dev/null; then
    break
  fi
  echo "En attente de l'API ($i/20)..."
  sleep 2
done

echo "Réponse /health : $(cat /tmp/health.json)"

if [ -n "$ENV_ATTENDU" ] && ! grep -q "\"env\":\"$ENV_ATTENDU\"" /tmp/health.json; then
  echo "ÉCHEC : environnement attendu '$ENV_ATTENDU'"
  exit 1
fi

curl -fsS "$URL/paniers" > /dev/null
echo "Test de fumée OK sur $URL"
