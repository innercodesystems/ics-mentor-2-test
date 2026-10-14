window.ICS = window.ICS || {};

ICS.SMALLTALK = [
  {begriffe:["hallo","hi","hey","guten morgen","guten tag","guten abend"],antworten:["Hallo. Schön, dass du da bist. Was beschäftigt dich gerade?","Willkommen. Womit möchtest du heute beginnen?"]},
  {begriffe:["wie geht es dir","wie gehts dir"],antworten:["Danke der Nachfrage. Ich bin bereit, dir zuzuhören. Wie geht es dir gerade wirklich?"]},
  {begriffe:["danke","vielen dank","dankeschoen"],antworten:["Sehr gern. Was ist durch unser Gespräch für dich gerade klarer geworden?","Gern. Spür kurz nach: Was nimmst du aus dem bisherigen Gespräch mit?"]},
  {begriffe:["okay","ok"],antworten:["Gut. Was möchtest du als Nächstes genauer betrachten?"]},
  {begriffe:["super","perfekt","klasse"],antworten:["Das freut mich. Welchen nächsten kleinen Schritt möchtest du daraus machen?"]}
];

ICS.pruefeSmalltalk = function(text){
  const normal=ICS.normalisiere(text);
  for(const eintrag of ICS.SMALLTALK){
    if(eintrag.begriffe.some(b=>normal===ICS.normalisiere(b))) return ICS.zufall(eintrag.antworten);
  }
  return null;
};
