// Die Express-Bibliothek wird importiert
import express from 'express';

// Der Port wird als konstante Zahl festgelegt
const PORT = 9898;

// Eine neue Express-App wird erstellt
const app = express();
//Das ist eine statische Mittdleware. Alle Anfragen laufen hier deswegen wie bei
// normalen Middleware zuerst durch. Nun wird geprüft ob in dem Ordner "views"
// die jeweilige html datei ist. Falls ja, wird die Datei als Response gesendet. 
// Wenn sie diese Datei findet, wird sie als Response an den Client gesendet.
// Wenn sie keine Datei findet, wird der Request an die anderen Routen weitergeleitet.
app.use(express.static('./views'));
app.use(express.static('./public'));

// Jeder Request läuft durch diese Middleware
app.use((req, res, next) => {
    // Eine Meldung wird auf der Konsole ausgegeben
    console.log('Ein neuer Request kommt rein:', req.method, req.url);
    // Der Request-Response-Zyklus wird fortgesetzt
    next();
})


// Eine Fallback-Route wird definiert, die immer ausgeführt wird, wenn keine der anderen Routen zutrifft
app.use((_, res) => {
    // Eine Antwort wird gesendet
    res.status(404).send('Keine Webseite verfügbar');
})

// Die App wird so konfiguriert, dass sie auf dem festgelegten Port auf Anfragen lauscht
app.listen(PORT, () => console.log('Dieser Server lauscht auf Port:', PORT));