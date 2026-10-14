window.ICS = window.ICS || {};

ICS.ActionCode = {

  daten: {

    ueberforderung:
      "Wähle heute genau eine Aufgabe, die wirklich wichtig ist, und lasse alles andere bewusst warten.",

    perfektionismus:
      "Schließe heute eine Aufgabe bewusst ab, auch wenn sie noch nicht perfekt ist.",

    harmonie:
      "Sprich heute einen ehrlichen Satz aus, ohne dich zu rechtfertigen.",

    verantwortung:
      "Lass heute eine Aufgabe bewusst bei der Person, zu der sie gehört.",

    kontrolle:
      "Gib heute eine kleine Entscheidung ab, ohne das Ergebnis sofort zu überprüfen."

  },

  erkennen: function(musterId) {

    return this.daten[musterId] || null;

  }

};
