window.ICS = window.ICS || {};

ICS.Engine = {

  antwort(text, gespraech) {

    if (typeof ICS.Analysieren !== "function") {
      return {
        html: "Die Analyse-Engine ist noch nicht verfügbar.",
        analyse: null
      };
    }

    const analyse =
      ICS.Analysieren(text, gespraech);

    if (analyse.einstieg) {
      return {
        html: this.einstiegsAntwort(analyse.einstieg),
        analyse: analyse
      };
    }

    if (
      Array.isArray(analyse.muster) &&
      analyse.muster.length
    ) {
      return {
        html: this.musterAntwort(analyse),
        analyse: analyse
      };
    }

    if (analyse.thema) {
      return {
        html: this.themenAntwort(analyse),
        analyse: analyse
      };
    }

    if (analyse.emotion) {
      return {
        html:
          "Ich nehme wahr, dass dich etwas emotional bewegt.<br><br>" +
          "<strong>Was ist unmittelbar davor passiert?</strong>",
        analyse: analyse
      };
    }

    return {
      html:
        "Ich möchte dich richtig verstehen. " +
        "Geht es gerade eher um eine Situation, ein Gefühl, " +
        "eine Beziehung, eine Entscheidung oder ein wiederkehrendes Verhalten?",
      analyse: analyse
    };
  },


  einstiegsAntwort(einstieg) {

    const antworten = {
      situation:
        "Beschreibe mir bitte kurz, was genau passiert ist.",

      gefuehl:
        "Welches Gefühl steht im Moment am stärksten im Vordergrund?",

      beziehung:
        "Um welche Beziehung geht es und was belastet dich darin am meisten?",

      entscheidung:
        "Zwischen welchen Möglichkeiten versuchst du gerade zu entscheiden?",

      verhalten:
        "Welches Verhalten wiederholt sich bei dir immer wieder?"
    };

    return antworten[einstieg] ||
      "Erzähl mir bitte etwas mehr darüber.";
  },


  musterAntwort(analyse) {

    const hauptmuster =
      analyse.muster[0];

    const daten =
      hauptmuster &&
      hauptmuster.id &&
      ICS.MUSTER
        ? ICS.MUSTER[hauptmuster.id]
        : null;

    if (!daten) {
      return "Was daran ist für dich im Moment am wichtigsten?";
    }

    const teile = [];

    if (daten.spiegel) {
      teile.push(
        `🪞 <strong>Spiegel</strong><br>${this.escapen(daten.spiegel)}`
      );
    }

    teile.push(
      `<em>Aktueller Schwerpunkt: ${this.escapen(
        daten.name || hauptmuster.name || ""
      )}</em>`
    );

    if (
      Array.isArray(daten.fragen) &&
      daten.fragen.length
    ) {
      teile.push(
        `<strong>${this.escapen(daten.fragen[0])}</strong>`
      );
    }

    return teile.join("<br><br>");
  },


  themenAntwort(analyse) {

    const thema = analyse.thema;

    if (!thema) {
      return "Was daran ist für dich im Moment am wichtigsten?";
    }

    const teile = [];

    if (thema.name) {
      teile.push(
        `<em>Aktuelles Thema: ${this.escapen(thema.name)}</em>`
      );
    }

    if (
      Array.isArray(thema.fragen) &&
      thema.fragen.length
    ) {
      teile.push(
        `<strong>${this.escapen(thema.fragen[0])}</strong>`
      );
    }

    return teile.join("<br><br>");
  },


  escapen(text) {

    if (typeof ICS.escapen === "function") {
      return ICS.escapen(String(text || ""));
    }

    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

};
