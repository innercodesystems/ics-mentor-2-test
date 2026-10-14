window.ICS = window.ICS || {};

ICS.Analysebericht = {

  erstellen: function(daten) {

    if (!daten || !daten.spiegel) {
      return null;
    }

    const beduerfnisse =
      Array.isArray(daten.beduerfnisse)
        ? daten.beduerfnisse.join(", ")
        : "";

    return {
      titel: "Deine Analyse",

      spiegel:
        daten.spiegel.text || "",

      erkannt:
        daten.dynamischeAnalyse?.text ||
        daten.verknuepfung?.text ||
        "",

      ursache:
        daten.schlussfolgerung?.text ||
        "",

      beduerfnisse:
        beduerfnisse,

      innerCode:
        daten.innerCode || "",

      bodyCode:
        daten.bodyCode || "",

      actionCode:
        daten.actionCode || ""
    };

  }

};
