const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/*
|--------------------------------------------------------------------------
| GEÇİCİ MAÇ VERİSİ
|--------------------------------------------------------------------------
| Veri sağlayıcısını bağladığımızda burası otomatik doldurulacak.
*/

const matches = [
  {
    id: 1,
    league: "Premier League",
    country: "İngiltere",
    home: {
      name: "Arsenal",
      short: "ARS",
      logo: ""
    },
    away: {
      name: "Manchester United",
      short: "MUN",
      logo: ""
    },
    date: "2026-09-13",
    time: "18:30",
    status: "NS",
    minute: null,
    score: {
      home: null,
      away: null
    },
    events: []
  },
  {
    id: 2,
    league: "Süper Lig",
    country: "Türkiye",
    home: {
      name: "Galatasaray",
      short: "GS",
      logo: ""
    },
    away: {
      name: "Fenerbahçe",
      short: "FB",
      logo: ""
    },
    date: "2026-09-13",
    time: "20:00",
    status: "NS",
    minute: null,
    score: {
      home: null,
      away: null
    },
    events: []
  },
  {
    id: 3,
    league: "La Liga",
    country: "İspanya",
    home: {
      name: "Barcelona",
      short: "BAR",
      logo: ""
    },
    away: {
      name: "Real Madrid",
      short: "RMA",
      logo: ""
    },
    date: "2026-09-13",
    time: "22:00",
    status: "NS",
    minute: null,
    score: {
      home: null,
      away: null
    },
    events: []
  }
];

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

app.get("/api/matches", (req, res) => {
  const date = req.query.date;

  let result = matches;

  if (date) {
    result = matches.filter(match => match.date === date);
  }

  res.json({
    success: true,
    count: result.length,
    matches: result
  });
});

app.get("/api/matches/:id", (req, res) => {
  const id = Number(req.params.id);

  const match = matches.find(item => item.id === id);

  if (!match) {
    return res.status(404).json({
      success: false,
      message: "Maç bulunamadı"
    });
  }

  res.json({
    success: true,
    match
  });
});

/*
|--------------------------------------------------------------------------
| LİGLER
|--------------------------------------------------------------------------
*/

app.get("/api/leagues", (req, res) => {
  const leagues = [];

  for (const match of matches) {
    if (!leagues.includes(match.league)) {
      leagues.push(match.league);
    }
  }

  res.json({
    success: true,
    leagues
  });
});

/*
|--------------------------------------------------------------------------
| ANA SAYFA
|--------------------------------------------------------------------------
*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
|--------------------------------------------------------------------------
| SERVER
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`Futbol sitesi çalışıyor: http://localhost:${PORT}`);
});
