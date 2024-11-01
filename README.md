Voici une version améliorée du README avec une description détaillée des fonctionnalités du script Python au lieu de la section API.

---

# Interactive TikTok Live Dashboard

Ce projet vise à rendre les lives TikTok interactifs en capturant et en affichant en temps réel les interactions d'un live TikTok sur un tableau de bord. Le composant `live` est destiné à être mis en live sur TikTok, tandis que le composant `dashboard` est utilisé pour visualiser les données.

## Table des matières
- Fonctionnalités
- Architecture du projet
- Installation
- Utilisation
- Rôle du script Python
- Dépendances
- Auteurs

---

## Fonctionnalités

Le projet capture les interactions en direct d’un live TikTok, incluant :
- Compteurs de spectateurs, likes, abonnements, partages et commentaires en temps réel.
- Gestion des cadeaux envoyés (type, valeur, principaux donateurs).
- Statistiques complètes du live, comme les revenus estimés, la durée, et le nombre maximal de spectateurs.

Les données sont collectées via un script Python, envoyées à un backend Node.js, et affichées en temps réel sur un tableau de bord Angular.

## Architecture du projet

L'architecture du projet se compose de trois parties :
1. **Backend Node.js** : Gère la réception des données en temps réel et fournit une API REST pour le frontend.
2. **Frontend Angular** : Affiche les données en direct sur un tableau de bord.
3. **Script Python** : Collecte les événements en temps réel depuis l'API TikTokLive et envoie les données au backend via des requêtes HTTP.

### Structure du dossier Angular

La structure de l'application Angular se présente comme suit :

- **`app/component`** : Contient les composants principaux.
  - **`dashboard`** : Composant Angular utilisé pour le tableau de bord qui affiche les statistiques en temps réel.
    - `dashboard.component.html` : Template HTML pour l'affichage du tableau de bord.
    - `dashboard.component.scss` : Styles spécifiques pour le tableau de bord.
    - `dashboard.component.ts` : Code TypeScript pour gérer la logique du tableau de bord.
  
  - **`live`** : Composant destiné à être mis en direct sur TikTok.
    - `live.component.html` : Template HTML pour le composant en direct.
    - `live.component.scss` : Styles spécifiques pour le composant en direct.
    - `live.component.ts` : Code TypeScript pour la logique du composant en direct.

- **`config`** : Contient les fichiers de configuration et les constantes utilisées dans l’application.
- **`interface`** : Déclare les interfaces pour typage TypeScript, facilitant la structure des données.
- **`pipe`** : Définie les pipes Angular si nécessaire, pour les transformations de données.
- **`services`** : Contient les services Angular utilisés pour communiquer avec l'API backend.
  - `status.service.ts` : Service qui gère les appels au backend pour obtenir ou envoyer des données de statut en temps réel.

- **`assets`** : Dossier pour les ressources statiques.
- **`environments`** : Contient les fichiers de configuration d'environnement (production et développement).

---

## Installation

### Prérequis

- Node.js et npm installés
- Python 3.x installé

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-depot>
   cd <nom-du-dossier>
   ```

2. **Installer les dépendances du backend :**
   ```bash
   cd backend
   npm install
   ```

3. **Installer les dépendances du frontend :**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Installer les dépendances Python :**
   ```bash
   pip install -r requirements.txt
   ```
   **Remarque** : La version de la bibliothèque `TikTokLive` utilisée peut être obsolète. Vérifiez les mises à jour et assurez-vous de sa compatibilité.

### Configuration

Modifiez les paramètres dans le script Python pour définir le nom du live et les URLs de l’API :
```python
# Nom du live
liveName = "nom_du_live"
# URL de base de l'API
base_url = 'http://localhost:8080/'
```

---

## Utilisation

### Lancer le backend

Lancez le serveur Node.js :
```bash
cd backend
npm start
```

### Lancer le frontend

Lancez le serveur de développement Angular pour le dashboard :
```bash
cd frontend
ng serve
```

### Exécuter le script Python

Lancez le script Python pour commencer la collecte de données :
```bash
python live_interaction.py
```

---

## Rôle du script Python

Le script Python utilise l'API `TikTokLive` pour se connecter à un live TikTok et écouter divers événements. Voici les fonctionnalités principales gérées par le script :

1. **Connexion au live** :
   - Se connecte au live TikTok via le nom d’utilisateur spécifié.
   - Initialise des variables de statistiques et des données de session.

2. **Suivi des interactions en temps réel** :
   - **Mise à jour du nombre de spectateurs** : Capture les changements dans le nombre de spectateurs et envoie ces données au backend.
   - **Likes** : Compte le nombre de likes reçus en temps réel et met à jour le backend.
   - **Followers** : Enregistre chaque nouvel abonné pendant le live.
   - **Partages** : Enregistre chaque partage du live.
   - **Commentaires** : Capture chaque commentaire et le transmet avec les informations de l'utilisateur.
   - **Cadeaux** : Enregistre les cadeaux envoyés, enregistre leur valeur en "coins" et garde un classement des principaux donateurs.
   - **Démographie** : Utilise certains types de cadeaux pour estimer une répartition de genre.

3. **Gestion des états du live** :
   - **Début et fin de session** : Enregistre l’heure de début et de fin du live.
   - **Déconnexion et reconnexion** : Tente de se reconnecter automatiquement en cas de déconnexion.

4. **Calcul des statistiques du live** :
   - Calcule des données finales comme la durée du live, le nombre total de spectateurs, le nombre de cadeaux envoyés, le nombre de coins accumulés et une estimation des revenus en euros.

5. **Envoi des données vers le backend** :
   - Les données sont envoyées en temps réel via des requêtes HTTP POST au backend, qui les rend accessibles pour l’affichage sur le tableau de bord Angular.

---

## Dépendances

### Node.js
- Express
- CORS
- body-parser

### Angular
- Angular CLI
- Angular Material

### Python
- TikTokLive (cette bibliothèque pourrait nécessiter une mise à jour)
- AnyIO
- Requests