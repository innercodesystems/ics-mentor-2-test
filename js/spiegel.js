window.ICS = window.ICS || {};

ICS.Spiegel = {

  erstellen(analyse, gespraech) {

    const muster =
      analyse && Array.isArray(analyse.muster)
        ? analyse.muster
        : [];

    const hauptmuster =
      muster.length ? muster[0] : null;

    /*
     * Vorrang:
     * Das aktuell erkannte Hauptmuster.
     */
    if (
      hauptmuster &&
      hauptmuster.id &&
      ICS.MUSTER &&
      ICS.MUSTER[hauptmuster.id]
    ) {

      const daten =
        ICS.MUSTER[hauptmuster.id];

      if (daten.spiegel) {

        return {
          titel: "Spiegel",
          text: daten.spiegel,
          confidence: 0.95,
          musterId: hauptmuster.id,
          musterName:
            daten.name ||
            hauptmuster.name ||
            "",
          confidence: 0.95
        };

      }

    }

    /*
     * Zweite Möglichkeit:
     * Eine erkannte Emotion.
     */
    if (
      analyse &&
      analyse.emotion &&
      analyse.emotion.antwort
    ) {

      return {
        titel: "Spiegel",
        text: analyse.emotion.antwort,
        confidence: 0.75,
        musterId: "",
        musterName: "",
        confidence: 0.75
      };

    }

    /*
     * Rückgriff auf das bereits bekannte
     * Hauptmuster des Gesprächs.
     */
    if (
      gespraech &&
      gespraech.muster &&
      ICS.MUSTER &&
      ICS.MUSTER[gespraech.muster]
    ) {

      const daten =
        ICS.MUSTER[gespraech.muster];

      if (daten.spiegel) {

        return {
          titel: "Spiegel",
          text: daten.spiegel,
          confidence: 0.60,
          musterId: gespraech.muster,
          musterName: daten.name || "",
          confidence: 0.60
        };

      }

    }

return {
  titel: "Spiegel",
  text: "",
  musterId: "",
  musterName: "",
  confidence: 0
};

  }

};
