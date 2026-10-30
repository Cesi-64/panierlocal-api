# PanierLocal API – mini-projet DevSecOps

Mini-API « catalogue de paniers » fournie comme point de départ de la partie C. Le code est volontairement simple : le travail porte sur le pipeline, pas sur l'application.

## Routes

| Route | Description |
| --- | --- |
| `GET /health` | Sonde de santé : `{ status, env, version }` |
| `GET /paniers` | Liste des paniers (`?disponible=true` pour filtrer) |
| `GET /paniers/:id` | Détail d'un panier (404 si inexistant, 400 si id invalide) |

## Avant de commencer

Lancez une première fois `npm install` : il crée `package-lock.json`. Committez ce fichier, le `Dockerfile` et la CI en ont besoin (`npm ci`).

## Lancer en local

```bash
npm ci
npm test          # 7 tests unitaires + couverture
npm start         # http://localhost:3000/health
```

## Avec Docker

```bash
docker build -t panierlocal-api:local .
docker compose --profile preprod up -d     # http://localhost:8081
docker compose --profile prod up -d        # http://localhost:8080
./scripts/smoke-test.sh http://localhost:8081 preprod
docker compose --profile preprod --profile prod down
```

Les deux profils lancent la même image (variable `IMAGE`) avec une configuration différente (`APP_ENV`, `LOG_LEVEL`, port, système de fichiers en lecture seule pour la prod). Dans le pipeline, passez l'image publiée par son digest :

```bash
IMAGE=ghcr.io/<organisation>/panierlocal-api@sha256:<digest> docker compose --profile prod up -d
```

## Votre travail

Créer `.github/workflows/ci-cd.yml` (ou `.gitlab-ci.yml`) selon l'énoncé : stages commit, build, préprod et prod avec approbation manuelle.
