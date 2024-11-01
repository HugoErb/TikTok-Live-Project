# TikTok Live Interactive Dashboard

Ce projet permet de rendre les lives TikTok interactifs en capturant en temps réel les données d'un live et en les affichant dans un tableau de bord via une application Angular et un serveur Node.js. Un script Python se connecte à un live TikTok spécifique et collecte des statistiques, comme les commentaires, likes, abonnements, cadeaux, et plus encore. Ces données sont ensuite envoyées au backend Node.js pour être utilisées par le frontend Angular.

## Fonctionnalités

- **Capture en temps réel des événements de live** : commentaires, likes, abonnements, partages, et cadeaux.
- **Statistiques interactives** : Affichage des statistiques en temps réel du live sur un dashboard.
- **Analyse et envoi de données** : Les données sont traitées et envoyées à l'API pour un suivi en direct.
- **Intégration avec TikTok Live API** : Utilisation du package `TikTokLive` pour se connecter et capturer les événements TikTok.

## Structure du projet

- **Angular (Frontend)** : Tableau de bord interactif permettant de visualiser les données du live en temps réel.
- **Node.js (Backend)** : Serveur d'API pour traiter et stocker les données reçues du script Python.
- **Python** : Script principal de capture de données du live TikTok via le package `TikTokLive`.

## Prérequis

- **Node.js** v14 ou supérieur
- **Python** v3.6 ou supérieur
- **Angular CLI** (si vous souhaitez faire des modifications au frontend)
- **TikTokLive** (installation requise pour le script Python)
  
  ```bash
  pip install TikTokLive
  ```

## Installation