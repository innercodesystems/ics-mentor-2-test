window.ICS = window.ICS || {};

ICS.Schlussfolgerungen = {

  regeln: [

    {
      muster: ["verantwortung", "ueberforderung"],
      text:
        "Die Überforderung scheint nicht allein durch die Menge der Aufgaben zu entstehen. Möglicherweise trägt die Überverantwortung dazu bei, dass zu viele Dinge gleichzeitig wichtig werden."
    },

    {
      muster: ["verantwortung", "kontrolle"],
      text:
        "Möglicherweise versuchst du, Sicherheit herzustellen, indem du besonders viel Verantwortung und Kontrolle übernimmst."
    },

    {
      muster: ["leistung", "ueberforderung"],
      text:
        "Der Leistungsdruck könnte dazu beitragen, dass Pausen, Grenzen und Entlastung zu spät wahrgenommen werden."
    },

    {
      muster: ["perfektionismus", "kontrolle"],
      text:
        "Perfektionismus und Kontrolle können sich gegenseitig verstärken: Je höher der Anspruch, desto stärker kann der Wunsch werden, alles abzusichern."
    },

    {
      muster: ["anpassung", "harmonie"],
      text:
        "Der Wunsch nach Harmonie könnte dazu führen, dass eigene Bedürfnisse und Grenzen weniger sichtbar werden."
    }
  ],

  erstellen: function(ergebnisse) {

    if (!Array.isArray(ergebnisse) || !ergebnisse.length) {
      return null;
    }

    const ids = ergebnisse
      .map(eintrag => eintrag && eintrag.id)
      .filter(Boolean);

    const regel = this.regeln.find(eintrag =>
      eintrag.muster.every(id => ids.includes(id))
    );

    if (!regel) {
      return null;
    }

    return {
      titel: "Schlussfolgerung",
      text: regel.text,
      muster: regel.muster
    };

  }

};
