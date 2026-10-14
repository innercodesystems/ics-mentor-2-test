window.ICS = window.ICS || {};

ICS.BodyCode = {

  daten: {

    ueberforderung:
      "Nimm wahr, wo sich die Belastung gerade in deinem Körper zeigt. Du musst nichts verändern – nur beobachten.",

    perfektionismus:
      "Beobachte, wie sich innerer Druck körperlich bemerkbar macht, wenn etwas nicht perfekt sein darf.",

    harmonie:
      "Nimm wahr, was sich in deinem Körper verändert, wenn du deine eigene Wahrheit zurückhältst.",

    verantwortung:
      "Beobachte, wo sich das Tragen fremder Verantwortung körperlich bemerkbar macht.",

    kontrolle:
      "Nimm wahr, wie sich Anspannung zeigt, wenn du versuchst, alles im Griff zu behalten."

  },

  erkennen: function(musterId) {

    return this.daten[musterId] || null;

  }

};
