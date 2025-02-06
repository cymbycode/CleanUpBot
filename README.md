```markdown
# CleanUpBot

CleanUpBot ist ein Discord-Bot, der deinen Server mit verschiedenen Befehlen von unerwünschten Benutzern befreit.  
Er unterstützt sowohl das Massenbannen von Benutzern anhand einer externen Liste als auch das Entbannen aller gesperrten Nutzer.  

[**Bot hinzufügen**](https://discord.com/oauth2/authorize?client_id=737537444723032086&scope=bot&permissions=8)

---

## 📌 Voraussetzungen

- **Node.js** (Empfohlen: Version 16 oder höher)
- **Ein Discord-Bot-Token**

---

## 🚀 Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/RyuguDev/CleanUpBot.git
   cd CleanUpBot
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install discord.js axios csv-parser dotenv
   ```

3. **Bot-Token konfigurieren**:
   - Erstelle eine `.env`-Datei im Projektordner.
   - Füge folgenden Inhalt hinzu:
     ```env
     BOT_TOKEN=DEIN_BOT_TOKEN
     ```
   - Ersetze `DEIN_BOT_TOKEN` mit deinem tatsächlichen Discord-Bot-Token.

---

## 📖 Befehle

| Befehl | Beschreibung | Berechtigung |
|--------|-------------|--------------|
| `+cleanup` | Bannt Benutzer basierend auf einer externen ID-Liste. | Administrator |
| `+importxenonbans <datei.csv>` | Importiert und bannt Benutzer aus einer Xenon `/exportbans`-Datei. | Administrator |
| `+unbanall` | Hebt alle Banns auf und entbannt alle Benutzer. | Ban Members |

---

## 🎮 Verwendung

1. **Bot starten**:
   ```bash
   node bot.js
   ```

2. **Befehle im Discord-Chat nutzen**:
   - `+cleanup` → Bannt Benutzer von der externen Liste.
   - `+importxenonbans bans.csv` → Importiert und bannt Benutzer aus der Xenon-Banliste.
   - `+unbanall` → Entbannt alle gesperrten Benutzer auf dem Server.

---

## 🔒 Sicherheitshinweise

- **Schütze deinen Bot-Token!** Nutze `.env`, um ihn sicher zu speichern, und teile ihn niemals öffentlich.
- **Verwende den Bot verantwortungsbewusst**, da er massenhafte Banns und Unbanns durchführen kann.
- **Nur vertrauenswürdige Personen sollten Zugriff auf den Bot haben!**

---

## 🛠️ Fehlerbehebung

Falls der Bot nicht startet oder ein Fehler auftritt:
- Stelle sicher, dass alle Abhängigkeiten installiert sind (`npm install`).
- Prüfe, ob dein Bot-Token korrekt in der `.env`-Datei gespeichert ist.
- Überprüfe die Berechtigungen des Bots auf deinem Server.

---

## 📜 Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**.  
Feel free to contribute! 😊
```
