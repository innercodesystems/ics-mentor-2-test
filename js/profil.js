window.ICS = window.ICS || {};

ICS.PROFIL_KEY = "ICS_MENTOR_PROFILE_V1";

ICS.profilLaden = function(){
  try{
    if (!ICS.mentorConsent?.allows("insights")) return {gespraeche:0,muster:{},themen:{},letzteAktualisierung:null};
    const gespeichert = localStorage.getItem(ICS.PROFIL_KEY);
    if(!gespeichert){
      return {
        gespraeche:0,
        muster:{},
        themen:{},
        letzteAktualisierung:null
      };
    }
    return JSON.parse(gespeichert);
  }catch(error){
    return {
      gespraeche:0,
      muster:{},
      themen:{},
      letzteAktualisierung:null
    };
  }
};

ICS.profilSpeichern = function(profil){
  try{
    if (!ICS.mentorConsent?.allows("insights")) return;
    localStorage.setItem(ICS.PROFIL_KEY, JSON.stringify(profil));
  }catch(error){
    console.warn("ICS Profil konnte nicht gespeichert werden.", error);
  }
};

ICS.profilAktualisieren = function(gespraech){
  const profil = ICS.profilLaden();
  profil.gespraeche += 1;
  profil.letzteAktualisierung = new Date().toISOString();

  const musterIds = [];
  if(gespraech.muster) musterIds.push(gespraech.muster);
  (gespraech.weitereMuster || []).forEach(id => {
    if(!musterIds.includes(id)) musterIds.push(id);
  });

  musterIds.forEach(function(id,index){
    const gewicht = index === 0 ? 3 : 1;
    profil.muster[id] = (profil.muster[id] || 0) + gewicht;
  });

  const themenIds = [];
  if(gespraech.thema) themenIds.push(gespraech.thema);
  (gespraech.nebenthemen || []).forEach(id => {
    if(!themenIds.includes(id)) themenIds.push(id);
  });

  themenIds.forEach(function(id,index){
    const gewicht = index === 0 ? 3 : 1;
    profil.themen[id] = (profil.themen[id] || 0) + gewicht;
  });

  ICS.profilSpeichern(profil);
  return profil;
};

ICS.prozentListe = function(objekt){
  const eintraege = Object.entries(objekt || {});
  const maximum = Math.max(1, ...eintraege.map(([,wert]) => wert));

  return eintraege
    .map(([id,wert]) => ({
      id,
      wert,
      prozent:Math.max(15, Math.round((wert / maximum) * 100))
    }))
    .sort((a,b) => b.wert - a.wert);
};

ICS.profilHtml = function(){
  const profil = ICS.profilLaden();
  const muster = ICS.prozentListe(profil.muster).slice(0,5);
  const themen = ICS.prozentListe(profil.themen).slice(0,5);

  if(profil.gespraeche === 0){
    return `
      <div class="ics-auswertung">
        <strong>Mein ICS Profil</strong><br><br>
        Noch keine abgeschlossenen Gespräche gespeichert.
      </div>
    `;
  }

  const musterHtml = muster.length
    ? muster.map(eintrag => {
        const daten = ICS.MUSTER[eintrag.id];
        return `${ICS.escapen(daten ? daten.name : eintrag.id)} – ${eintrag.prozent} %`;
      }).join("<br>")
    : "Noch keine Muster erkannt.";

  const themenHtml = themen.length
    ? themen.map(eintrag => {
        const daten = ICS.THEMEN[eintrag.id];
        return `${ICS.escapen(daten ? daten.name : eintrag.id)} – ${eintrag.prozent} %`;
      }).join("<br>")
    : "Noch keine Themen erkannt.";

  return `
    <div class="ics-auswertung">
      <strong>Mein ICS Profil</strong><br><br>

      <strong>Abgeschlossene Gespräche</strong><br>
      ${profil.gespraeche}<br><br>

      <strong>Dominante Muster</strong><br>
      ${musterHtml}<br><br>

      <strong>Wichtige Themen</strong><br>
      ${themenHtml}<br><br>

      <em>Die Prozentwerte zeigen die bisherige Häufigkeit und Gewichtung deiner erkannten Muster.</em>
    </div>
  `;
};
