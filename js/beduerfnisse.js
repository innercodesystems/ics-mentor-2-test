window.ICS = window.ICS || {};

ICS.Beduerfnisse = {

  daten: {

    ueberforderung: [
      "Ruhe",
      "Entlastung",
      "Klarheit"
    ],

    perfektionismus: [
      "Genug sein",
      "Leichtigkeit",
      "Selbstannahme"
    ],

    kontrolle: [
      "Vertrauen",
      "Sicherheit",
      "Loslassen"
    ],

    harmonie: [
      "Eigene Grenzen",
      "Ehrlichkeit",
      "Selbstfürsorge"
    ],

    verantwortung: [
      "Unterstützung",
      "Abgeben",
      "Balance"
    ]

  },

  erkennen: function(musterId){

    return this.daten[musterId] || [];

  }

};
