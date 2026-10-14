window.ICS = window.ICS || {};

ICS.Verknuepfungen = {

  netzwerk: {

    rueckzug: {
      harmonie: 0.55,
      verlustangst: 0.50,
      scham: 0.65,
      ueberforderung: 0.45,
      selbstwert: 0.40
    },

    harmonie: {
      anpassung: 0.90,
      verlustangst: 0.70,
      selbstwert: 0.55,
      schuld: 0.45,
      rueckzug: 0.35
    },

    kontrolle: {
      perfektionismus: 0.85,
      ueberforderung: 0.60,
      verantwortung: 0.65,
      verlustangst: 0.35,
      leistung: 0.55
    },

    perfektionismus: {
      kontrolle: 0.85,
      selbstwert: 0.75,
      leistung: 0.70,
      scham: 0.55,
      vermeidung: 0.40
    },

    anpassung: {
      harmonie: 0.90,
      verlustangst: 0.80,
      selbstwert: 0.70,
      schuld: 0.55,
      verantwortung: 0.45
    },

    vermeidung: {
      ueberforderung: 0.70,
      perfektionismus: 0.55,
      scham: 0.45,
      selbstwert: 0.40,
      rueckzug: 0.35
    },

    leistung: {
      perfektionismus: 0.75,
      selbstwert: 0.70,
      kontrolle: 0.60,
      ueberforderung: 0.65,
      verantwortung: 0.50
    },

    selbstwert: {
      perfektionismus: 0.70,
      anpassung: 0.70,
      verlustangst: 0.65,
      scham: 0.75,
      leistung: 0.60
    },

    verlustangst: {
      anpassung: 0.80,
      harmonie: 0.70,
      selbstwert: 0.65,
      kontrolle: 0.40,
      rueckzug: 0.45
    },

    ueberforderung: {
      leistung: 0.65,
      kontrolle: 0.60,
      vermeidung: 0.70,
      verantwortung: 0.65,
      perfektionismus: 0.50
    },

    verantwortung: {
      kontrolle: 0.65,
      leistung: 0.60,
      schuld: 0.70,
      anpassung: 0.55,
      ueberforderung: 0.65
    },

    schuld: {
      verantwortung: 0.75,
      anpassung: 0.60,
      harmonie: 0.50,
      scham: 0.65,
      selbstwert: 0.45
    },

    scham: {
      selbstwert: 0.80,
      rueckzug: 0.70,
      perfektionismus: 0.55,
      schuld: 0.65,
      vermeidung: 0.45
    }
  },


  normalisiereErgebnis: function(ergebnis) {

    if (!ergebnis) {
      return null;
    }

    const id =
      ergebnis.id ||
      ergebnis.key ||
      ergebnis.musterId ||
      ergebnis.typ;

    if (!id) {
      return null;
    }

    let score =
      ergebnis.score ??
      ergebnis.wert ??
      ergebnis.treffer ??
      ergebnis.staerke ??
      1;

    score = Number(score);

    if (!Number.isFinite(score)) {
      score = 1;
    }

    return {
      id: id,
      score: score
    };
  },


  direkteVerbindungen: function(musterId) {

    if (!musterId) {
      return [];
    }

    const verbindungen =
      this.netzwerk[musterId] || {};

    return Object.entries(verbindungen)
      .map(([id, staerke]) => ({
        id: id,
        staerke: staerke,
        name:
          ICS.MUSTER?.[id]?.name ||
          id
      }))
      .sort((a, b) => b.staerke - a.staerke);
  },


  analysieren: function(ergebnisse) {

    if (!Array.isArray(ergebnisse)) {
      return [];
    }

    const erkannteMuster = ergebnisse
      .map(ergebnis =>
        this.normalisiereErgebnis(ergebnis)
      )
      .filter(Boolean);

    if (!erkannteMuster.length) {
      return [];
    }

    const erkannteIds =
      new Set(
        erkannteMuster.map(muster => muster.id)
      );

    const sammlung = {};

    erkannteMuster.forEach(muster => {

      const verbindungen =
        this.netzwerk[muster.id] || {};

      Object.entries(verbindungen)
        .forEach(([verbundeneId, staerke]) => {

          if (verbundeneId === muster.id) {
            return;
          }

          const basisScore =
            Math.max(1, muster.score);

          const verbindungsScore =
            basisScore * staerke;

          if (!sammlung[verbundeneId]) {

            sammlung[verbundeneId] = {
              id: verbundeneId,
              name:
                ICS.MUSTER?.[verbundeneId]?.name ||
                verbundeneId,
              score: 0,
              quellen: [],
              direktErkannt:
                erkannteIds.has(verbundeneId)
            };

          }

          sammlung[verbundeneId].score +=
            verbindungsScore;

          sammlung[verbundeneId].quellen.push({
            id: muster.id,
            name:
              ICS.MUSTER?.[muster.id]?.name ||
              muster.id,
            staerke: staerke
          });

        });

    });

    erkannteMuster.forEach(muster => {

      if (!sammlung[muster.id]) {

        sammlung[muster.id] = {
          id: muster.id,
          name:
            ICS.MUSTER?.[muster.id]?.name ||
            muster.id,
          score: muster.score,
          quellen: [],
          direktErkannt: true
        };

      } else {

        sammlung[muster.id].score +=
          muster.score;

        sammlung[muster.id].direktErkannt = true;

      }

    });

    const hoechsterScore =
      Math.max(
        ...Object.values(sammlung)
          .map(eintrag => eintrag.score),
        1
      );

    return Object.values(sammlung)
      .map(eintrag => ({
        ...eintrag,

        prozent:
          Math.min(
            100,
            Math.round(
              eintrag.score /
              hoechsterScore *
              100
            )
          )
      }))
      .sort((a, b) =>
        b.score - a.score
      );
  },


  hauptmuster: function(ergebnisse) {

    const analyse =
      this.analysieren(ergebnisse);

    return analyse.length
      ? analyse[0]
      : null;
  },


  verbundeneMuster: function(
    ergebnisse,
    limit = 3
  ) {

    const analyse =
      this.analysieren(ergebnisse);

    if (!analyse.length) {
      return [];
    }

    const hauptmuster =
      analyse[0];

    return analyse
      .filter(eintrag =>
        eintrag.id !== hauptmuster.id
      )
      .slice(0, limit);
  },


  erklaerung: function(ergebnisse) {

console.log("VERKNÜPFUNGEN INPUT:", ergebnisse);

    const analyse =
      this.analysieren(ergebnisse);

    if (!analyse.length) {
      return null;
    }

    const hauptmuster =
      analyse[0];

const verbunden =
    analyse
      .slice(1, 4);

console.log("VERKNÜPFUNGEN ANALYSE:", analyse);

return {
      hauptmuster: hauptmuster,
      verbunden: verbunden,

      text:
        verbunden.length
          ? `${hauptmuster.name} steht aktuell im Vordergrund und ist möglicherweise mit ${verbunden.map(eintrag => eintrag.name).join(", ")} verbunden.`
          : `${hauptmuster.name} steht aktuell im Vordergrund.`
    };
  }

};
