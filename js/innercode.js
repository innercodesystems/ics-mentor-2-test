window.ICS = window.ICS || {};

ICS.InnerCode = {

  daten: {

    ueberforderung:
      "Du musst nicht alles tragen. Klarheit entsteht, wenn Wichtiges von Dringendem getrennt wird.",

    perfektionismus:
      "Fortschritt verändert dein Leben mehr als Perfektion.",

    harmonie:
      "Wahre Verbindung entsteht nicht durch Anpassung, sondern durch Ehrlichkeit.",

    verantwortung:
      "Du darfst Verantwortung tragen, ohne alles alleine tragen zu müssen.",

    kontrolle:
      "Vertrauen beginnt dort, wo Kontrolle endet."

  },

  erkennen:function(musterId){

    return this.daten[musterId] || null;

  }

};
