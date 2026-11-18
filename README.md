# C3D

Exercices de création 3D en WebGL : scène texturée, formes paramétriques et sélection de couleur.

## Contenu

- `Partie_S_Lanquetin/Exo_WebGL` — démonstration WebGL issue du tutoriel MDN : cube en rotation avec texture (`cubetexture.png`), variante triangle (`triangle.html`) et utilitaires `init-buffers.js`, `draw-scene.js`, `gl-matrix.js`.
- `Partie_S_Lanquetin/TP_Note` — TP noté : choix d'un maillage (triangle, carré, rectangle, disque, pentagone, hexagone, octogone, cube ou pyramide) et d'une couleur, rendu dans un canvas WebGL.

## Lancer

Les pages sont statiques et n'ont aucune dépendance à installer. `gl-matrix.js` est fourni dans chaque dossier.

```bash
cd Partie_S_Lanquetin/TP_Note
python3 -m http.server 8000
# http://localhost:8000
```

Un serveur local est nécessaire car les scripts sont chargés en modules ES. `Exo_WebGL/index.html` s'ouvre de la même façon.

## Notes

- Le rendu utilise WebGL 1 et `gl-matrix` ; aucun framework n'est requis.
- `TP_Note/index.html` contient l'interface (boutons de formes et sélecteur de couleur), `webgl.js` la géométrie et le rendu.
