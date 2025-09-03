# Flappy Bird Clone

Ein erweiterbarer Flappy Bird Clone in JavaScript mit HTML5 Canvas.

## 🎮 Features
- Klassisches Flappy Bird Gameplay
- Modulare Architektur für einfache Erweiterungen
- Kollisionserkennung und Physik-System
- Score-Tracking

## 🚀 Geplante Features
- [ ] Multiplayer-Modus
- [ ] Power-Ups (Slow-Motion, Schutzschild)
- [ ] Verschiedene Vogel-Charaktere
- [ ] Level-System mit steigender Schwierigkeit
- [ ] Highscore-Persistierung
- [ ] Mobile Touch-Support
- [ ] Sound-Effekte

## 🛠️ Entwicklung

### Starten
```bash
# Repository klonen
git clone <repository-url>

# Öffne index.html in deinem Browser
open index.html
```

### Projektstruktur
```
src/
├── core/           # Kern-Engine
│   ├── Game.js     # Haupt-Game-Loop
│   ├── Canvas.js   # Rendering-Engine
│   └── InputHandler.js # Input-Verarbeitung
├── entities/       # Spiel-Objekte
│   ├── Bird.js     # Vogel-Klasse
│   ├── Pipe.js     # Hindernis-Klasse
│   └── Background.js # Hintergrund
├── systems/        # Spiel-Systeme
│   ├── Physics.js  # Kollisionserkennung
│   └── ScoreManager.js # Score-System
└── utils/          # Hilfsfunktionen
    └── Config.js   # Spielkonstanten
```

## 🤝 Zusammenarbeit
Entwickelt mit Claude Code - perfekt für gemeinsame Entwicklung über GitHub!

## 🎯 Steuerung
- **Leertaste** oder **Klick**: Vogel springen lassen