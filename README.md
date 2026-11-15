# 📚 BookSwap | HTM Digital Book Platform

**BookSwap** est une application web moderne conçue pour les étudiants et les apprenants (notamment la communauté YouCode) afin de leur permettre de découvrir des livres, de demander des échanges d'ouvrages (permanents ou temporaires) et de partager des connaissances au sein d'une communauté de confiance.

---

## 🎨 Design & Identité Visuelle

L'interface utilisateur s'inspire directement de l'identité graphique de la plateforme :

- **Couleur Primaire (Bleu Nuit Profond) :** `#17385B` — Exprime la fiabilité, le sérieux et la structure.
- **Couleur d'Accent (Orange Ambré) :** `#E38B29` — Apporte de l'énergie, de la chaleur et met en valeur les éléments interactifs.
- **Arrière-plan & Cartes :** Style éditorial épuré (tons papier `#F8F7F4` et cartes blanches nettes avec bordures subtiles).

---

## ✨ Fonctionnalités

- **Flux des demandes d'échange :** Visualisez les annonces d'échange de livres en cours avec des badges de statut (Permanent vs. Temporaire), les profils des propriétaires et les offres associées.
- **Catalogue de livres :** Parcourez l'ensemble des livres disponibles dans la bibliothèque numérique avec une recherche en temps réel par titre.
- **Filtres avancés :** Filtrez les demandes d'échange par catégories de livres et par type d'échange (Permanent, Temporaire ou Tous).
- **Design Responsive :** Développé avec **Tailwind CSS (v4)** pour offrir une expérience fluide sur mobiles, tablettes et ordinateurs.

---

## 🛠️ Stack Technique

- **Frontend :** HTML5, JavaScript Vanilla (Modules ES6), Tailwind CSS (via CDN).
- **Icônes & Polices :** FontAwesome 6, Google Fonts (_Plus Jakarta Sans_).
- **Intégration API :** Connexion transparente avec une API REST backend Laravel (`http://127.0.0.1:8000/api/v1/...`).

---

```
    ├── index.html # Page principale des demandes d'échange et filtres
    ├── livre.html # Catalogue complet des livres de la bibliothèque
    ├── style/
    │ └── style.css # Styles CSS personnalisés
    └── js/
    ├── navbar.js # Composant de navigation et logo SVG dynamique
    ├── index.js # Logique des demandes d'échange et filtres
    ├── livre.js # Logique de recherche et affichage du catalogue
    └── BookTags.js # Composant réutilisable pour les tags de livres
```

---

## Auteur

**Haitam NEFAL**