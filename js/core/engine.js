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

    // Gesprächsarchitektur: Nach der ersten Nachricht wird nicht auf
    // isolierte Schlüsselwort-Kategorien zurückgesetzt.
    const dialogFortsetzung = this.gespraechsFortsetzung(text, gespraech, analyse);
    if (dialogFortsetzung) {
      return { html: dialogFortsetzung, analyse: analyse };
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


  gespraechsFortsetzung(text, gespraech, analyse) {
    const antworten = Array.isArray(gespraech && gespraech.antworten)
      ? gespraech.antworten : [];
    if (antworten.length < 2) return "";

    const n = String(text || "").toLowerCase();
    const bisher = antworten.slice(0, -1).join(" ").toLowerCase();
    const esc = (wert) => this.escapen(wert);
    const themaErfolg = /erfolg|ziel|leist|druck|frei|zufrieden|schaffen|beweis/.test(bisher);
    const wunsch = /ich (möchte|will|wünsche|würde gern)|für mich|mir wäre wichtig|ich könnte/.test(n);
    const hindernis = /aber|schwer|fällt mir|angst|sorge|trotzdem|schlechtes gewissen|nicht/.test(n);
    const handlung = /heute|morgen|anfangen|ausprobieren|erlauben|nachmittag|schritt|konkret/.test(n);
    const bereitsGefragt = Array.isArray(gespraech.dialogFragen) ? gespraech.dialogFragen : [];
    const fragen = [];

    // Neue Aussagen erst spiegeln, dann mit EINER Anschlussfrage weitergehen.
    if (wunsch && hindernis) {
      fragen.push("Du benennst etwas, das du dir wünschst, und gleichzeitig etwas, das dich noch zurückhält.");
      fragen.push("Was wäre ein kleiner, machbarer Schritt, der deinem Wunsch heute Raum gibt?");
    } else if (handlung) {
      fragen.push("Du denkst bereits darüber nach, wie du etwas verändern könntest.");
      fragen.push("Welchen kleinen Schritt möchtest du als Erstes ausprobieren?");
    } else if (themaErfolg) {
      fragen.push("Ich behalte im Blick, dass es dir um deine eigenen Ziele und zugleich um mehr Freiraum geht.");
      fragen.push("Was ist dir an deiner letzten Aussage besonders wichtig?");
    } else if (analyse && analyse.emotion) {
      fragen.push("Das scheint dich gerade zu beschäftigen.");
      fragen.push("Was würde dir im Moment helfen, damit umzugehen?");
    } else {
      // Kein Neustart und keine erfundene Deutung, auch bei unbekanntem Thema.
      fragen.push("Ich möchte bei dem bleiben, was du gerade beschrieben hast.");
      fragen.push("Was davon möchtest du als Nächstes genauer anschauen?");
    }

    let frage = fragen[1];
    if (bereitsGefragt.includes(frage)) {
      const alternativen = [
        "Was wäre für dich jetzt eine hilfreiche nächste Entscheidung?",
        "Woran würdest du merken, dass sich etwas in die richtige Richtung bewegt?",
        "Möchtest du eher weiter darüber sprechen oder einen konkreten Schritt entwickeln?"
      ];
      frage = alternativen.find((f) => !bereitsGefragt.includes(f)) ||
        "Welcher Teil davon ist für dich gerade neu oder anders?";
    }
    gespraech.dialogFragen = bereitsGefragt.concat(frage).slice(-12);
    gespraech.dialogPhase = handlung ? "handlung" : (wunsch ? "klaerung" : "vertiefung");
    return esc(fragen[0]) + "<br><br><strong>" + esc(frage) + "</strong>";
  },

  kontextAntwort(text, gespraech) {
    const n = String(text || "").toLowerCase();
    const antworten = Array.isArray(gespraech && gespraech.antworten)
      ? gespraech.antworten : [];
    // Die aktuelle Nachricht steht beim Aufruf bereits in antworten.
    const vorher = antworten.slice(0, -1).join(" ").toLowerCase();
    const verlauf = vorher + " " + n;

    // Erholung + schlechtes Gewissen ist nicht automatisch ein Schuldmuster.
    const erholung = /nachmittag|nichts (zu )?tun|pause|ausruh|erhol|frei(e|en|er)? zeit/.test(n);
    const produktivitaetsGewissen = /schlechtes gewissen|zeit verschwende|unproduktiv|nicht produktiv/.test(n);
    const druckImVerlauf = /druck|leisten|erfolg|ziele|zufrieden|beweisen|geschafft/.test(verlauf);
    if (erholung && produktivitaetsGewissen) {
      return "Du möchtest dir einen freien Nachmittag gönnen. Gleichzeitig meldet sich der Gedanke, dass du diese Zeit sinnvoller nutzen müsstest.<br><br>" +
        "Vielleicht geht es gerade darum, ob Erholung für dich genauso selbstverständlich sein darf wie Leistung.<br><br>" +
        "<strong>Was würde dir helfen, diesen Nachmittag bewusst zu genießen, ohne ihn rechtfertigen zu müssen?</strong>";
    }
    const nichtGutGenug = /nicht gut genug|nicht genug (sein|bin)|andere (zu )?enttäusch/.test(n);
    const leistungsdruck = /druck|funktionieren|alles schaffen|leisten/.test(n);
    const leichtigkeit = /leichtigkeit|ruhe|entlastung/.test(n);
    const vieleZiele = /viele ideen|große ziele|wo ich anfangen/.test(n);
    const erfolgsangst = /angst.{0,65}(nicht erfolgreich|zu versagen)|nicht erfolgreich genug|nie genug (zu tun|tun)|nicht genug (zu tun|tun)/.test(n);
    const erfolgSchonGenannt = /nicht erfolgreich genug|angst.{0,65}(nicht erfolgreich|zu versagen)/.test(vorher);
    const erfolgsMassstab = /erfolg|erfolgreich|ziele|erreichen/.test(verlauf);
    const zufriedenheit = /zufrieden|leben genießen|leben geniessen|beweisen müssen|beweisen muessen/.test(n);
    const zielUndFreiheit = /ziele|erfolg|erfolgreich|freiheit|selbstbestimm/.test(verlauf);
    if (zufriedenheit && zielUndFreiheit) {
      return "Du beschreibst Erfolg nicht nur als etwas, das du erreichst, sondern auch als ein Gefühl von Zufriedenheit und innerer Freiheit. Du möchtest deine Ziele weiterverfolgen, ohne ständig etwas beweisen zu müssen.<br><br>" +
        "<strong>Was könntest du dir heute erlauben, auch wenn noch nicht alles geschafft ist?</strong>";
    }
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
