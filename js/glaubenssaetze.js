window.ICS = window.ICS || {};

ICS.Glaubenssaetze = {

  daten: {

    ueberforderung:
      "Ich muss alles schaffen.",

    perfektionismus:
      "Ich darf keine Fehler machen.",

    harmonie:
      "Ich muss es allen recht machen.",

    verantwortung:
      "Wenn ich loslasse, bricht alles zusammen.",

    kontrolle:
      "Nur wenn ich alles kontrolliere, bin ich sicher."

  },

  erkennen: function(musterId){

    return this.daten[musterId] || null;

  }

};
