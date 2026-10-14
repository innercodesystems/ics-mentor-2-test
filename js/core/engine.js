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

    const kontextAntwort = this.kontextAntwort(text, gespraech);
    if (kontextAntwort) {
      return { html: kontextAntwort, analyse: analyse };
    }

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


  kontextAntwort(text, gespraech) {
    const n = String(text || "").toLowerCase();
    const antworten = Array.isArray(gespraech && gespraech.antworten)
      ? gespraech.antworten : [];
    // Die aktuelle Nachricht steht beim Aufruf bereits in antworten.
    const vorher = antworten.slice(0, -1).join(" ").toLowerCase();
    const verlauf = vorher + " " + n;

    const nichtGutGenug = /nicht gut genug|nicht genug (sein|bin)|andere (zu )?enttäusch/.test(n);
    const leistungsdruck = /druck|funktionieren|alles schaffen|leisten/.test(n);
    const leichtigkeit = /leichtigkeit|ruhe|entlastung/.test(n);
    const vieleZiele = /viele ideen|große ziele|wo ich anfangen/.test(n);
    const erfolgsangst = /angst.{0,65}(nicht erfolgreich|zu versagen)|nicht erfolgreich genug|nie genug (zu tun|tun)|nicht genug (zu tun|tun)/.test(n);
    const erfolgSchonGenannt = /nicht erfolgreich genug|angst.{0,65}(nicht erfolgreich|zu versagen)/.test(vorher);
    const erfolgsMassstab = /erfolg|erfolgreich|ziele|erreichen/.test(verlauf);
    const erfolgsDefinition = /finanziell frei|finanzielle freiheit|eigene ideen|ideen verwirklichen|zeit für mich|zeit fuer mich|selbstbestimm/.test(n);
    const erfolgsKontext = /erfolgreich|erfolg|ziele|leistungsdruck|druck|alles schaffen/.test(verlauf);
    if (erfolgsDefinition && erfolgsKontext) {
      return "Du verbindest Erfolg mit Freiheit, Selbstbestimmung und Zeit für dich. Gleichzeitig hast du das Gefühl, immer mehr leisten zu müssen.<br><br>" +
        "<strong>Was wäre für dich heute ein Zeichen von Erfolg, das nicht davon abhängt, wie viel du geschafft hast?</strong>";
    }

    // Keine erneute Frage nach einer Angst, die bereits ausdrücklich benannt wurde.
    if (erfolgsangst || (erfolgSchonGenannt && /angst|unsicher|druck|erwartung/.test(n))) {
      return "Du möchtest viel erreichen und hast zugleich das Gefühl, dass deine Anstrengungen nie ausreichen.<br><br>" +
        "<strong>Woran würdest du für dich selbst erkennen, dass du erfolgreich genug bist – unabhängig davon, was andere erwarten?</strong>";
    }
    if (nichtGutGenug) {
      return "Du beschreibst die Sorge, nicht gut genug zu sein oder andere zu enttäuschen.<br><br>" +
        "<strong>Was würde sich für dich verändern, wenn du nicht immer alle Erwartungen erfüllen müsstest?</strong>";
    }
    if (vieleZiele && leistungsdruck) {
      return "Du hast viele Ideen und große Ziele. Gleichzeitig setzt du dich unter Druck, alles schaffen zu müssen.<br><br>" +
        "<strong>Was belastet dich im Moment mehr: der Druck, alles zu schaffen, oder die Unsicherheit, womit du anfangen sollst?</strong>";
    }
    if (leistungsdruck && leichtigkeit) {
      return "Du spürst den Druck, ständig funktionieren zu müssen, und wünschst dir gleichzeitig mehr Leichtigkeit.<br><br>" +
        "<strong>Was macht es dir gerade so schwer, dir selbst weniger abzuverlangen?</strong>";
    }
    if (/angst|sorge|unsicher/.test(n) && erfolgsMassstab) {
      return "Du verbindest deine Sorge mit dem Wunsch, etwas zu erreichen.<br><br>" +
        "<strong>Was bedeutet Erfolg für dich persönlich?</strong>";
    }
    if (antworten.length > 1 && /angst|sorge|unsicher/.test(n)) {
      return "Du sprichst von einer Sorge, die dich beschäftigt.<br><br>" +
        "<strong>Was würde dir helfen, damit im Moment etwas leichter umzugehen?</strong>";
    }
    return "";
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
