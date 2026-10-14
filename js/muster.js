window.ICS = window.ICS || {};

ICS.MUSTER = {

  rueckzug: {
    name: "Rückzugsmuster",

    regeln: [
      /\bzieh(?:e|st|t|en)?\b.*\bzurueck\b/,
      /\bzurueckzieh/,
      /\brueckzug\b/,
      /\bgehe auf abstand\b/,
      /\bbrauche abstand\b/,
      /\bmache dicht\b/,
      /\bmach dicht\b/,
      /\bschotte mich ab\b/,
      /\bisoliere mich\b/,
      /\bwill allein sein\b/,
      /\bmoechte allein sein\b/,
      /\bwill niemanden sehen\b/,
      /\bmelde mich nicht mehr\b/,
      /\bantworte nicht mehr\b/,
      /\bbreche den kontakt ab\b/,
      /\bgehe in mein schneckenhaus\b/,
      /\bverschliesse mich\b/,
      /\blasse niemanden an mich heran\b/,
      /\bhalte menschen auf abstand\b/,
      /\bwill meine ruhe\b/
    ],

    spiegel:
      "Rückzug kann kurzfristig schützen und entlasten. Gleichzeitig kann er verhindern, dass deine wirklichen Bedürfnisse sichtbar und Beziehungen geklärt werden.",

    fragen: [
      "Ziehst du dich gerade eher zurück, um dich zu schützen, einen Konflikt zu vermeiden oder weil du überfordert bist?",
      "Wovor schützt dich dieser Rückzug konkret?",
      "Was würdest du sagen, wenn du dich sicher genug fühlen würdest?",
      "Welches Bedürfnis bleibt durch deinen Rückzug unausgesprochen?",
      "Was befürchtest du, könnte geschehen, wenn du dich wieder öffnest?",
      "Ist dein Rückzug gerade eine gesunde Grenze oder eine Flucht vor etwas Unangenehmem?",
      "Was wäre ein kleiner und sicherer Schritt zurück in Verbindung?"
    ],

    innerCode:
      "Du darfst dich schützen, ohne dich vollständig unsichtbar zu machen.",

    bodyCode:
      "Spüre bewusst Brustraum, Bauch und Schultern. Nimm wahr, wo dein Körper eng wird, wenn Nähe oder Konflikt entsteht.",

    actionCode:
      "Sprich heute einen ehrlichen Satz aus, den du sonst aus Rückzug zurückhalten würdest."
  },


  harmonie: {
    name: "Harmoniemuster",

    regeln: [
      /\bvermeide\b.*\bkonflikt/,
      /\bkonflikt\w*\b.*\bvermeide/,
      /\bkeinen streit\b/,
      /\bwill keinen streit\b/,
      /\bhauptsache harmonie\b/,
      /\bsage lieber nichts\b/,
      /\bsag lieber nichts\b/,
      /\bschweige lieber\b/,
      /\bniemanden verletzen\b/,
      /\bniemanden enttaeuschen\b/,
      /\bandere nicht enttaeuschen\b/,
      /\bwill niemanden enttaeuschen\b/,
      /\balle sollen zufrieden sein\b/,
      /\bdamit alle zufrieden sind\b/,
      /\bwill es allen recht machen\b/,
      /\bwill keinen aerger\b/,
      /\bwill keinen konflikt\b/,
      /\bgehe streit aus dem weg\b/,
      /\bnachgeben damit ruhe ist\b/,
      /\bgebe lieber nach\b/,
      /\bsage nichts um frieden zu haben\b/
    ],

    spiegel:
      "Harmonie kann Frieden und Verbindung schaffen. Unechte Harmonie entsteht jedoch, wenn du deine Wahrheit, Grenzen oder Bedürfnisse dauerhaft verschweigst.",

    fragen: [
      "Welchen Konflikt versuchst du gerade zu vermeiden?",
      "Was bleibt dadurch unausgesprochen?",
      "Was befürchtest du, wenn du ehrlich sagst, was du brauchst?",
      "Wessen Gefühle versuchst du gerade zu schützen?",
      "Was kostet dich die dauerhafte Anpassung an den Frieden?",
      "Ist die aktuelle Harmonie wirklich stimmig oder nur konfliktfrei?",
      "Welche Wahrheit lässt sich klar und respektvoll ausdrücken?",
      "Was wäre ein friedlicher, aber ehrlicher nächster Schritt?"
    ],

    innerCode:
      "Echte Harmonie braucht Wahrheit, nicht dauerhaftes Schweigen.",

    bodyCode:
      "Spüre Hals, Brustraum und Bauch, bevor du etwas Wichtiges aussprichst. Achte darauf, wo du dich innerlich zurückhältst.",

    actionCode:
      "Formuliere heute einen ehrlichen Satz ohne Angriff und ohne Rechtfertigung."
  },


  kontrolle: {
    name: "Kontrollmuster",

    regeln: [
      /\bkontrollier/,
      /\bkontrolle\b/,
      /\bkontrolliere alles\b/,
      /\bkontrolliere.*mehrmals\b/,
      /\bmehrmals kontrollier/,
      /\bpruefe alles\b/,
      /\bpruefe.*mehrmals\b/,
      /\bnicht loslassen\b/,
      /\bkann nicht loslassen\b/,
      /\bwill nichts dem zufall ueberlassen\b/,
      /\balles im griff\b/,
      /\balles unter kontrolle\b/,
      /\balles selbst\b/,
      /\bmache alles selbst\b/,
      /\bmuss alles selbst machen\b/,
      /\bverlasse mich nur auf mich\b/,
      /\btraue niemandem\b/,
      /\btraue anderen nicht\b/,
      /\bmuss alles absichern\b/,
      /\bwill sicher sein\b/,
      /\bdarf nichts schiefgehen\b/,
      /\bhabe angst dass etwas schiefgeht\b/
    ],

    spiegel:
      "Kontrolle versucht häufig, Unsicherheit zu reduzieren und Sicherheit herzustellen. Gleichzeitig kostet sie viel Kraft und kann Vertrauen, Leichtigkeit und Verbindung einschränken.",

    fragen: [
      "Was befürchtest du, könnte geschehen, wenn du einen Teil der Kontrolle abgeben würdest?",
      "Welche Erfahrung hat dir beigebracht, dass du alles selbst sichern musst?",
      "Was genau versuchst du durch Kontrolle zu verhindern?",
      "Was liegt tatsächlich in deiner Verantwortung – und was nicht?",
      "Woran würdest du erkennen, dass etwas auch ohne deine Kontrolle gut genug funktioniert?",
      "Wie viel Energie kostet dich das ständige Überprüfen?",
      "Was würde Vertrauen für dich konkret bedeuten?",
      "Was könntest du heute bewusst nicht kontrollieren?"
    ],

    innerCode:
      "Sicherheit entsteht nicht nur durch Kontrolle, sondern auch durch Vertrauen in deine Reaktionsfähigkeit.",

    bodyCode:
      "Löse bewusst Hände, Kiefer und Schultern. Atme länger aus als ein und beobachte, ob dein Körper etwas weicher wird.",

    actionCode:
      "Gib heute eine kleine Aufgabe oder Entscheidung bewusst ab und kontrolliere das Ergebnis nicht sofort."
  },


  perfektionismus: {
    name: "Perfektionsmuster",

    regeln: [
      /\bperfekt/,
      /\bperfektion/,
      /\bperfektionistisch/,
      /\bkeinen fehler\b/,
      /\bkeine fehler\b/,
      /\bfehler darf ich mir nicht erlauben\b/,
      /\bdarf keinen fehler machen\b/,
      /\bdarf nichts falsch machen\b/,
      /\bnie gut genug\b/,
      /\bnicht gut genug\b/,
      /\bnoch besser machen\b/,
      /\balles richtig\b/,
      /\bmuss alles richtig machen\b/,
      /\bhohe ansprueche\b/,
      /\bzu hohe ansprueche\b/,
      /\breicht noch nicht\b/,
      /\bimmer besser\b/,
      /\bnicht zufrieden mit mir\b/,
      /\bkann nicht zufrieden sein\b/,
      /\bfinde immer einen fehler\b/,
      /\bmuss fehlerfrei sein\b/,
      /\bwill keine kritik\b/
    ],

    spiegel:
      "Perfektionismus schützt häufig vor Kritik, Scham, Ablehnung oder dem Gefühl, nicht gut genug zu sein. Gleichzeitig verhindert er oft Abschluss, Ruhe und echte Zufriedenheit.",

    fragen: [
      "Was würde passieren, wenn dein Ergebnis gut und stimmig wäre – aber nicht perfekt?",
      "Wessen Anerkennung versuchst du durch Perfektion zu erhalten?",
      "Was glaubst du, sagt ein Fehler über dich als Menschen aus?",
      "Was kostet dich dieser Anspruch körperlich und emotional?",
      "Wann wäre etwas objektiv gut genug?",
      "Welche Aufgabe hältst du unnötig lange offen?",
      "Wie sähe eine gute 80-Prozent-Lösung aus?",
      "Was könntest du heute abschließen, ohne weiter zu optimieren?"
    ],

    innerCode:
      "Dein Wert wächst nicht durch Fehlerfreiheit. Fehler machen dich nicht weniger wertvoll.",

    bodyCode:
      "Atme langsam aus und erlaube deinem Körper für einen Moment, nichts beweisen und nichts verbessern zu müssen.",

    actionCode:
      "Schließe heute eine Aufgabe bewusst bei 80 Prozent ab und beobachte, was innerlich geschieht."
  },


  anpassung: {
    name: "Anpassungsmuster",

    regeln: [
      /\bsage immer ja\b/,
      /\bsag immer ja\b/,
      /\bnicht nein sagen\b/,
      /\bkann nicht nein sagen\b/,
      /\bkann schwer nein sagen\b/,
      /\bsage fast nie nein\b/,
      /\bsag fast nie nein\b/,
      /\bsage selten nein\b/,
      /\bsag selten nein\b/,
      /\bpasse mich an\b/,
      /\bpasse mich immer an\b/,
      /\bimmer anpassen\b/,
      /\ballen recht\b/,
      /\bes allen recht machen\b/,
      /\bwill es allen recht machen\b/,
      /\bmeine beduerfnisse hinten an\b/,
      /\bstelle mich hinten an\b/,
      /\bkomme immer zuletzt\b/,
      /\bwill niemanden enttaeuschen\b/,
      /\bandere nicht enttaeuschen\b/,
      /\bniemand soll boese sein\b/,
      /\bhabe angst vor ablehnung\b/,
      /\bmache was andere wollen\b/,
      /\brichte mich nach anderen\b/,
      /\btraue mich nicht meine meinung zu sagen\b/,
      /\bsage nicht was ich wirklich will\b/
    ],

    spiegel:
      "Anpassung kann Zugehörigkeit und kurzfristige Sicherheit schaffen. Gleichzeitig wird die eigene Wahrheit immer leiser, wenn deine Bedürfnisse dauerhaft weniger zählen als die der anderen.",

    fragen: [
      "Was würdest du sagen oder entscheiden, wenn deine Bedürfnisse genauso wichtig wären wie die der anderen?",
      "Welche Reaktion anderer befürchtest du bei einem Nein?",
      "Was glaubst du zu verlieren, wenn du dich nicht anpasst?",
      "Wo überschreitest du regelmäßig deine eigene Grenze?",
      "Bei wem fällt dir ein ehrliches Nein besonders schwer?",
      "Wann sagst du Ja, obwohl dein Körper bereits Nein signalisiert?",
      "Was würde sich verändern, wenn du dich selbst nicht mehr hinten anstellst?",
      "Welches kleine Nein wäre heute ein klares Ja zu dir?"
    ],

    innerCode:
      "Zugehörigkeit, die Selbstaufgabe verlangt, ist keine echte Verbindung.",

    bodyCode:
      "Spüre, wie dein Körper auf ein ehrliches Ja und auf ein erzwungenes Ja reagiert. Nimm besonders Bauch, Brust und Hals wahr.",

    actionCode:
      "Formuliere heute eine klare und respektvolle Grenze, ohne dich übermäßig zu rechtfertigen."
  },


  vermeidung: {
    name: "Vermeidungsmuster",

    regeln: [
      /\bschiebe\b.*\bauf\b/,
      /\bschiebe es auf\b/,
      /\bimmer wieder aufschieben\b/,
      /\bprokrastinier/,
      /\bvermeide es\b/,
      /\bvermeide das\b/,
      /\bgehe dem aus dem weg\b/,
      /\bgehe.*aus dem weg\b/,
      /\bdruecke mich davor\b/,
      /\bignoriere\b/,
      /\btue so als waere nichts\b/,
      /\bspaeter\b/,
      /\bmache ich spaeter\b/,
      /\bkuemmere mich spaeter\b/,
      /\bfange nicht an\b/,
      /\bkomme nicht ins handeln\b/,
      /\btraue mich nicht anzufangen\b/,
      /\bwill mich nicht damit beschaeftigen\b/,
      /\bverdränge\b/,
      /\bwarte bis es sich erledigt\b/
    ],

    spiegel:
      "Vermeidung entlastet kurzfristig und reduziert unangenehme Gefühle. Langfristig hält sie die Belastung jedoch häufig aufrecht oder verstärkt sie.",

    fragen: [
      "Was genau macht den ersten Schritt unangenehm?",
      "Welche Befürchtung steckt hinter dem Aufschieben?",
      "Was müsstest du fühlen, wenn du dich dem Thema wirklich zuwendest?",
      "Was kostet dich das weitere Vermeiden?",
      "Wie groß ist die Aufgabe tatsächlich – und wie groß fühlt sie sich gerade an?",
      "Was wäre der kleinstmögliche Schritt für heute?",
      "Welche Unterstützung würde den Anfang erleichtern?",
      "Was kannst du in den nächsten fünf Minuten konkret tun?"
    ],

    innerCode:
      "Du musst nicht die ganze Aufgabe bewältigen. Du brauchst nur den ersten ehrlichen Schritt.",

    bodyCode:
      "Nimm drei ruhige Atemzüge und richte deine Aufmerksamkeit ausschließlich auf die nächsten fünf Minuten.",

    actionCode:
      "Arbeite heute genau fünf Minuten an dem vermiedenen Thema – ohne Anspruch, es vollständig lösen zu müssen."
  },


  leistung: {
    name: "Leistungs- und Funktionsmuster",

    regeln: [
      /\bmuss funktionieren\b/,
      /\bich muss funktionieren\b/,
      /\bfunktioniere nur noch\b/,
      /\bfunktioniere einfach\b/,
      /\bnur noch funktionieren\b/,
      /\bmuss leisten\b/,
      /\bmehr leisten\b/,
      /\bmuss produktiv sein\b/,
      /\bkeine pause\b/,
      /\bdarf keine pause machen\b/,
      /\bkeine zeit fuer pause\b/,
      /\bmuss stark sein\b/,
      /\bdarf keine schwaeche zeigen\b/,
      /\bimmer weitermachen\b/,
      /\bkann nicht aufhoeren\b/,
      /\bmuss durchhalten\b/,
      /\bkeine zeit fuer mich\b/,
      /\bimmer beschaeftigt\b/,
      /\bmein wert.*leistung\b/,
      /\bnur wertvoll wenn\b/,
      /\bniemand darf merken wie es mir geht\b/,
      /\bkoerper ignorieren\b/
    ],

    spiegel:
      "Leistung kann Anerkennung, Sicherheit und Selbstwirksamkeit geben. Belastend wird sie, wenn dein Wert nur noch davon abhängt, wie viel du schaffst und wie gut du funktionierst.",

    fragen: [
      "Wer wärst du in diesem Moment, wenn du nichts beweisen müsstest?",
      "Was glaubst du zu verlieren, wenn du nicht funktionierst?",
      "Für wen versuchst du stark zu sein?",
      "Welche Körpersignale ignorierst du bereits?",
      "Was bedeutet Ruhe für dich – Erholung oder Versagen?",
      "Wann hast du zuletzt etwas getan, das keinen Zweck erfüllen musste?",
      "Welche Form von Ruhe wäre heute verantwortungsvoll?",
      "Was könntest du weglassen, ohne dass wirklich etwas Wesentliches verloren geht?"
    ],

    innerCode:
      "Du bist nicht nur wertvoll, wenn du funktionierst oder etwas leistest.",

    bodyCode:
      "Lege eine Hand auf den Brustkorb und erlaube dir drei Minuten ohne Aufgabe, Ziel oder Optimierung.",

    actionCode:
      "Plane heute eine bewusste Pause ein, die nicht erst verdient werden muss."
  },


  selbstwert: {
    name: "Selbstwertmuster",

    regeln: [
      /\bich bin nicht gut genug\b/,
      /\bnicht gut genug\b/,
      /\bich bin nichts wert\b/,
      /\bnichts wert\b/,
      /\bweniger wert\b/,
      /\bzweifle an mir\b/,
      /\bselbstzweifel\b/,
      /\btraue mir nichts zu\b/,
      /\bkann das nicht\b/,
      /\bandere sind besser\b/,
      /\bvergleiche mich\b/,
      /\bkeiner braucht mich\b/,
      /\bniemand braucht mich\b/,
      /\bich genuege nicht\b/,
      /\bich reiche nicht\b/,
      /\bich bin falsch\b/,
      /\bmit mir stimmt etwas nicht\b/,
      /\bich habe versagt\b/,
      /\bich bin ein versager\b/,
      /\bverdiene das nicht\b/
    ],

    spiegel:
      "Ein verletzter Selbstwert führt häufig dazu, dass du deinen Wert von Anerkennung, Leistung oder dem Verhalten anderer abhängig machst.",

    fragen: [
      "Woran machst du deinen eigenen Wert im Moment fest?",
      "Welche Stimme in dir sagt, dass du nicht genug bist?",
      "Seit wann kennst du dieses Gefühl?",
      "Welche Beweise sprechen tatsächlich dafür – und welche dagegen?",
      "Wie würdest du mit einem Menschen sprechen, den du liebst und der genauso über sich denkt?",
      "Was bleibt von deinem Wert, wenn Leistung und Anerkennung wegfallen?",
      "Welche Qualität an dir übersiehst du gerade?",
      "Was wäre heute ein respektvoller Umgang mit dir selbst?"
    ],

    innerCode:
      "Dein Wert ist keine Belohnung für Leistung, Anpassung oder Fehlerfreiheit.",

    bodyCode:
      "Richte deinen Körper sanft auf, atme ruhig und beobachte, wie es sich anfühlt, innerlich etwas mehr Raum einzunehmen.",

    actionCode:
      "Notiere heute drei Eigenschaften an dir, die unabhängig von deiner Leistung wertvoll sind."
  },


  verlustangst: {
    name: "Verlust- und Ablehnungsmuster",

    regeln: [
      /\bangst verlassen zu werden\b/,
      /\bangst dass.*verlaesst\b/,
      /\bverlassen werden\b/,
      /\bangst jemanden zu verlieren\b/,
      /\bwill niemanden verlieren\b/,
      /\bhabe angst vor ablehnung\b/,
      /\bangst abgelehnt zu werden\b/,
      /\bniemand liebt mich\b/,
      /\bnicht mehr geliebt\b/,
      /\bwill nicht allein sein\b/,
      /\bhalte an.*fest\b/,
      /\bkann nicht loslassen\b/,
      /\bbrauche bestaetigung\b/,
      /\bbrauche immer naehe\b/,
      /\bhabe angst dass.*weggeht\b/,
      /\bklammere\b/,
      /\bfuehle mich schnell abgelehnt\b/,
      /\bnehme distanz persoenlich\b/
    ],

    spiegel:
      "Verlustangst kann dazu führen, dass du Nähe sichern möchtest, dich stark anpasst oder Distanz schneller als Ablehnung interpretierst.",

    fragen: [
      "Was genau befürchtest du zu verlieren?",
      "Welche Bedeutung hätte es für dich, wenn jemand Abstand braucht?",
      "Was glaubst du über dich, wenn ein anderer Mensch sich zurückzieht?",
      "Welche frühere Erfahrung könnte in dieser Situation mitschwingen?",
      "Versuchst du gerade Verbindung zu gestalten oder Verlust zu verhindern?",
      "Welche Sicherheit kannst du dir selbst geben?",
      "Wie würde Nähe aussehen, die nicht durch Angst gesteuert wird?",
      "Was wäre eine ruhige und würdevolle Reaktion?"
    ],

    innerCode:
      "Du darfst verbunden sein, ohne dich selbst festhalten oder aufgeben zu müssen.",

    bodyCode:
      "Spüre beide Füße am Boden und atme ruhig in den Bauch. Erinnere deinen Körper daran, dass du in diesem Moment da bist.",

    actionCode:
      "Warte vor einer impulsiven Reaktion zehn Minuten und frage dich, ob du aus Verbindung oder aus Verlustangst handelst."
  },

    energieverlust: {
    name: "Energieverlust und Erschöpfung",

    regeln: [
      /\benergielos\b/,
      /\bwenig energie\b/,
      /\bkaum energie\b/,
      /\bkeine energie\b/,
      /\bkeine kraft\b/,
      /\bkraftlos\b/,
      /\bmuede\b/,
      /\berschoepf/,
      /\bausgelaugt\b/,
      /\bregeneration\b/
    ],

    spiegel:
      "Deine Energie scheint gerade deutlich reduziert zu sein. Das muss nicht sofort auf ein tieferes Muster hinweisen. Zuerst darf sichtbar werden, wo und wie sich die Erschöpfung bei dir zeigt.",

    fragen: [
      "Wo bemerkst du die Erschöpfung gerade am stärksten – körperlich, gedanklich oder innerlich?",
      "Seit wann fühlt sich deine Energie verändert an?",
      "Was hat dir in den vergangenen Tagen besonders viel Energie genommen?",
      "Was würde deinem System heute zuerst etwas Entlastung geben?",
      "Wie viel ist gerade wirklich möglich – eine, drei oder zehn Minuten?"
    ],

    innerCode:
      "Du musst deine Erschöpfung nicht übergehen, um weiterzukommen.",

    bodyCode:
      "Nimm für einen Moment wahr, wo dein Körper Ruhe, Versorgung oder sanfte Bewegung braucht.",

    actionCode:
      "Wähle einen kleinen Schritt, der heute Energie schützt oder Regeneration ermöglicht."
  },

  ueberforderung: {
    name: "Überforderungsmuster",

    regeln: [
      /\bueberfordert\b/,
      /\bzu viel\b/,
      /\balles zu viel\b/,
      /\bweiss nicht wo anfangen\b/,
      /\bweiss nicht mehr weiter\b/,
      /\bkann nicht mehr\b/,
      /\bkomme nicht hinterher\b/,
      /\bwaechst mir ueber den kopf\b/,
      /\bzu viele aufgaben\b/,
      /\bzu viele gedanken\b/,
      /\bmein kopf ist voll\b/,
      /\balles gleichzeitig\b/,
      /\bweiss nicht was zuerst\b/
    ],

    spiegel:
      "Überforderung entsteht häufig nicht nur durch die Menge der Aufgaben, sondern auch dadurch, dass innerlich alles gleichzeitig wichtig und dringend erscheint.",

    fragen: [
      "Was belastet dich gerade am stärksten?",
      "Welche Aufgabe ist wirklich dringend – und welche fühlt sich nur dringend an?",
      "Was davon gehört überhaupt zu deiner Verantwortung?",
      "Welche Entscheidung würde sofort etwas Druck reduzieren?",
      "Was kannst du verschieben, vereinfachen oder abgeben?",
      "Was braucht dein Körper gerade zuerst?",
      "Welche eine Sache wäre heute genug?",
      "Wer oder was könnte dich konkret entlasten?"
    ],

    innerCode:
      "Du musst nicht alles gleichzeitig tragen. Klarheit beginnt mit einer einzigen Priorität.",

    bodyCode:
      "Stelle beide Füße auf den Boden, atme langsam aus und benenne nur die eine Belastung, die gerade am stärksten ist.",

    actionCode:
      "Schreibe alle offenen Punkte auf und markiere genau eine Aufgabe als heutigen Schwerpunkt."
  },


  verantwortung: {
    name: "Überverantwortungsmuster",

    regeln: [
      /\bfuer alles verantwortlich\b/,
      /\bich muss mich um alles kuemmern\b/,
      /\bkuemmere mich um alle\b/,
      /\bmuss alles auffangen\b/,
      /\bmuss alle retten\b/,
      /\bniemand sonst macht es\b/,
      /\bohne mich geht es nicht\b/,
      /\bich trage alles\b/,
      /\balles bleibt an mir haengen\b/,
      /\bfuehle mich verantwortlich\b/,
      /\buebernehme\b.*\bverantwortung\b/,
      /\bprobleme anderer loesen\b/,
      /\bmuss helfen\b/,
      /\bkann niemanden haengen lassen\b/,
      /\bnehme anderen alles ab\b/,
      /\bstelle mich selbst zurueck\b/,
      /\btrage die verantwortung fuer andere\b/
    ],

    spiegel:
      "Überverantwortung entsteht, wenn du nicht nur deine Aufgaben, sondern auch Gefühle, Entscheidungen oder Konsequenzen anderer Menschen trägst.",

    fragen: [
      "Was davon gehört wirklich zu deiner Verantwortung?",
      "Was übernimmst du gerade für einen anderen Menschen?",
      "Was befürchtest du, wenn du nicht hilfst oder eingreifst?",
      "Traust du dem anderen zu, seine eigene Verantwortung zu tragen?",
      "Welche Folgen verhinderst du möglicherweise für andere?",
      "Was kostet dich das ständige Auffangen?",
      "Wo wäre Abgrenzung hilfreicher als Hilfe?",
      "Was darf heute bei der Person bleiben, zu der es gehört?"
    ],

    innerCode:
      "Du darfst unterstützen, ohne das Leben anderer für sie zu tragen.",

    bodyCode:
      "Spüre Schultern und Rücken. Stelle dir beim Ausatmen vor, fremde Lasten bewusst abzustellen.",

    actionCode:
      "Übernimm heute eine Aufgabe bewusst nicht, die eigentlich in der Verantwortung eines anderen Menschen liegt."
  },


  schuld: {
    name: "Schuldmuster",

    regeln: [
      /\bich bin schuld\b/,
      /\bmeine schuld\b/,
      /\bfuehle mich schuldig\b/,
      /\bschlechtes gewissen\b/,
      /\bhabe jemanden enttaeuscht\b/,
      /\bhaette anders handeln muessen\b/,
      /\bhaette das verhindern muessen\b/,
      /\bkann mir nicht verzeihen\b/,
      /\bmache mir vorwuerfe\b/,
      /\bwerfe mir vor\b/,
      /\balles falsch gemacht\b/,
      /\bhabe versagt\b/,
      /\bwegen mir\b/,
      /\bich haette wissen muessen\b/
    ],

    spiegel:
      "Schuld kann auf einen echten Verantwortungsanteil hinweisen. Sie kann aber auch übergroß werden, wenn du dir rückblickend mehr Kontrolle zuschreibst, als du tatsächlich hattest.",

    fragen: [
      "Wofür genau fühlst du dich verantwortlich?",
      "Welchen Anteil hattest du tatsächlich – und welchen nicht?",
      "Welche Informationen hattest du damals wirklich?",
      "Beurteilst du dein früheres Handeln mit deinem heutigen Wissen?",
      "Was kannst du heute noch klären oder wiedergutmachen?",
      "Was musst du anerkennen, ohne dich dauerhaft zu bestrafen?",
      "Was würde Selbstvergebung in diesem Fall bedeuten?",
      "Welchen Lernschritt kannst du aus der Situation mitnehmen?"
    ],

    innerCode:
      "Verantwortung bedeutet lernen und handeln – nicht, dich dauerhaft zu bestrafen.",

    bodyCode:
      "Lege eine Hand auf Brust und Bauch. Atme langsam und trenne bewusst Verantwortung von Selbstverurteilung.",

    actionCode:
      "Notiere deinen tatsächlichen Verantwortungsanteil und einen konkreten Schritt, den du heute daraus ableiten kannst."
  },


  scham: {
    name: "Schammuster",

    regeln: [
      /\bschaeme mich\b/,
      /\bich schaeme mich\b/,
      /\bpeinlich\b/,
      /\bniemand darf das wissen\b/,
      /\bwill mich verstecken\b/,
      /\bmit mir stimmt etwas nicht\b/,
      /\bich bin falsch\b/,
      /\bich bin schlecht\b/,
      /\bwas sollen andere denken\b/,
      /\bangst mich zu zeigen\b/,
      /\btraue mich nicht\b/,
      /\bich fuehle mich klein\b/,
      /\bwill im boden versinken\b/,
      /\bkann niemandem davon erzaehlen\b/
    ],

    spiegel:
      "Scham richtet sich nicht nur gegen eine Handlung, sondern häufig gegen die eigene Person. Sie erzeugt das Gefühl, falsch, minderwertig oder nicht zugehörig zu sein.",

    fragen: [
      "Wofür genau schämst du dich?",
      "Was glaubst du, würden andere daraus über dich schließen?",
      "Ist etwas an deinem Verhalten problematisch – oder verurteilst du gerade dich als ganzen Menschen?",
      "Wessen Maßstab verwendest du dabei?",
      "Was würdest du einem Menschen sagen, den du liebst und der dieselbe Erfahrung gemacht hat?",
      "Welche Wahrheit braucht Mitgefühl statt Verurteilung?",
      "Bei wem könntest du dich sicher und ehrlich zeigen?",
      "Was wäre ein kleiner Schritt aus dem Verstecken?"
    ],

    innerCode:
      "Eine schwierige Erfahrung oder Handlung macht dich nicht als ganzen Menschen falsch.",

    bodyCode:
      "Richte dich sanft auf und atme ruhig. Erlaube deinem Blick, nicht nach unten auszuweichen.",

    actionCode:
      "Teile heute einen kleinen ehrlichen Gedanken mit einem Menschen, bei dem du dich sicher fühlst."
  }

};


ICS.musterErkennen = function(text) {
  return ICS.bestesErgebnis(text, ICS.MUSTER);
};


ICS.musterErkennenAlle = function(text) {
  return ICS.ergebnisse(text, ICS.MUSTER).slice(0, 5);
};
