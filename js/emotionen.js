window.ICS = window.ICS || {};

ICS.EMOTIONEN = {
  traurig:{name:"Traurigkeit",begriffe:["traurig","weinen","leer","niedergeschlagen","bedrueckt"],antwort:"Ich nehme Traurigkeit wahr. Was genau tut dir im Moment am meisten weh?"},
  wut:{name:"Wut",begriffe:["wuetend","wut","sauer","aerger","zorn","genervt"],antwort:"Wut zeigt häufig, dass eine Grenze verletzt oder ein Bedürfnis übergangen wurde. Welche Grenze wurde berührt?"},
  einsam:{name:"Einsamkeit",begriffe:["einsam","allein","niemand versteht mich","verlassen"],antwort:"Einsamkeit kann auch entstehen, wenn Menschen um uns sind. In welchem Moment fühlst du dich besonders allein?"},
  verwirrt:{name:"Verwirrung",begriffe:["verwirrt","weiss nicht weiter","keine klarheit","orientierungslos"],antwort:"Es klingt, als wäre gerade vieles gleichzeitig in deinem Kopf. Welche eine Frage müsste zuerst klarer werden?"},
  angst:{name:"Angst",begriffe:["angst","aengstlich","panik","sorge","unsicher"],antwort:"Ich nehme Angst oder Unsicherheit wahr. Wovor möchte dich dieses Gefühl möglicherweise schützen?"},
  scham:{name:"Scham",begriffe:["schaeme mich","scham","peinlich","blamiert"],antwort:"Scham lässt uns oft glauben, wir müssten uns verstecken. Was befürchtest du, könnten andere über dich denken?"},
  schuld:{name:"Schuld",begriffe:["schuld","schuldig","schlechtes gewissen","bereue"],antwort:"Trägst du gerade Verantwortung für etwas, das wirklich vollständig in deiner Verantwortung liegt?"},
  sehnsucht:{name:"Sehnsucht",begriffe:["sehnsucht","vermisse","wuensche mir","verlange nach"],antwort:"Sehnsucht zeigt oft sehr klar, was uns fehlt. Wonach sehnst du dich im Kern?"}
};

ICS.emotionErkennen = text => ICS.bestesErgebnis(text,ICS.EMOTIONEN);
