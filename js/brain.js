window.ICS = window.ICS || {};

(function(){
  const STORAGE_KEY = "ICS_MENTOR_BRAIN_V10";

  const RELATIONEN = {
    rueckzug: ["stress", "beziehung", "harmonie", "angst"],
    harmonie: ["beziehung", "rueckzug", "anpassung", "selbstwert"],
    kontrolle: ["stress", "angst", "perfektionismus", "arbeit"],
    perfektionismus: ["leistung", "stress", "selbstwert", "kontrolle"],
    anpassung: ["harmonie", "beziehung", "selbstwert"],
    vermeidung: ["angst", "stress", "rueckzug"],
    leistung: ["stress", "arbeit", "selbstwert", "perfektionismus"]
  };

  function leererSpeicher(){
    return {
      version: 10,
      gespraeche: [],
      musterScores: {},
      themenScores: {},
      emotionScores: {},
      graph: {},
      hypothesen: [],
      letzteAktualisierung: null
    };
  }

  function laden(){
    try {
      if (!ICS.mentorConsent?.allows("insights")) return leererSpeicher();
      const roh = localStorage.getItem(STORAGE_KEY);
      if(!roh) return leererSpeicher();
      const memory = Object.assign(leererSpeicher(), JSON.parse(roh));
      // An insights-only choice must never expose legacy conversation excerpts.
      if (!ICS.mentorConsent?.allows("transcripts")) {
        memory.gespraeche = (Array.isArray(memory.gespraeche) ? memory.gespraeche : [])
          .map(item => ({ ...item, text: null }));
      }
      return memory;
    } catch(e){
      return leererSpeicher();
    }
  }

  function speichern(memory){
    if (!ICS.mentorConsent?.allows("insights")) return;
    memory.letzteAktualisierung = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
    } catch(e) {
      console.warn("ICS Brain konnte nicht gespeichert werden.", e);
    }
  }

  function scoreErhoehen(objekt, id, wert){
    if(!id) return;
    objekt[id] = Math.min(100, (objekt[id] || 0) + wert);
  }

  function kante(memory, a, b, wert){
    if(!a || !b || a === b) return;
    memory.graph[a] = memory.graph[a] || {};
    memory.graph[b] = memory.graph[b] || {};
    memory.graph[a][b] = Math.min(100, (memory.graph[a][b] || 0) + wert);
    memory.graph[b][a] = Math.min(100, (memory.graph[b][a] || 0) + wert);
  }

  function intensitaet(text){
    const n = ICS.normalisiere ? ICS.normalisiere(text) : text.toLowerCase();
    let wert = 35;
    if(/sehr|extrem|staendig|immer|nie|total|voellig/.test(n)) wert += 20;
    if(/!{2,}/.test(text)) wert += 10;
    if(text.length > 180) wert += 10;
    return Math.min(95, wert);
  }

  function analysieren(text, gespraech){
    const muster = ICS.musterErkennenAlle ? ICS.musterErkennenAlle(text) : [];
    const thema = ICS.themaErkennen ? ICS.themaErkennen(text) : null;
    const emotion = ICS.emotionErkennen ? ICS.emotionErkennen(text) : null;

    return {
      text,
      muster,
      musterIds: muster.map(m => m.id),
      thema,
      emotion,
      intensitaet: intensitaet(text),
      bezug: gespraech.antworten.length > 1,
      zeit: new Date().toISOString()
    };
  }

  function label(id){
    return ICS.MUSTER?.[id]?.name ||
      ICS.THEMEN?.[id]?.name ||
      id.replace(/_/g, " ");
  }

  function hypotheseBilden(gespraech, analyse, memory){
    const aktuell = analyse.muster[0];
    const vorher = gespraech.muster ? ICS.MUSTER?.[gespraech.muster] : null;
    const thema = analyse.thema;

    if(aktuell && vorher && aktuell.id !== gespraech.muster){
      return `${vorher.name} und ${aktuell.name} könnten sich gegenseitig verstärken.`;
    }

    if(aktuell && thema){
      return `${aktuell.name} könnte im Bereich ${thema.name} als Schutzstrategie wirken.`;
    }

    if(aktuell){
      const verbindungen = memory.graph[aktuell.id] || {};
      const staerkste = Object.entries(verbindungen).sort((a,b) => b[1] - a[1])[0];
      if(staerkste && staerkste[1] >= 20){
        return `${aktuell.name} scheint wiederholt mit ${label(staerkste[0])} verbunden zu sein.`;
      }
    }

    return null;
  }

  function aktualisieren(gespraech, analyse){
    if (!ICS.mentorConsent?.allows("insights")) return {memory: leererSpeicher(), hypothese: null};
    const memory = laden();
    const faktor = analyse.intensitaet >= 65 ? 14 : 9;

    analyse.muster.forEach(m => scoreErhoehen(memory.musterScores, m.id, faktor));
    if(analyse.thema) scoreErhoehen(memory.themenScores, analyse.thema.id, faktor);

    if(analyse.emotion){
      const emotionsId = analyse.emotion.id || analyse.emotion.name || "emotion";
      scoreErhoehen(memory.emotionScores, emotionsId, 7);
    }

    const knoten = analyse.musterIds.slice();
    if(analyse.thema) knoten.push(analyse.thema.id);

    for(let i = 0; i < knoten.length; i++){
      for(let j = i + 1; j < knoten.length; j++){
        kante(memory, knoten[i], knoten[j], 12);
      }
    }

    analyse.musterIds.forEach(id => {
      (RELATIONEN[id] || []).forEach(rel => {
        if(knoten.includes(rel)) kante(memory, id, rel, 8);
      });
    });

    const hypothese = hypotheseBilden(gespraech, analyse, memory);

    if(hypothese){
      memory.hypothesen.unshift({text: hypothese, zeit: analyse.zeit});
      memory.hypothesen = memory.hypothesen.slice(0, 20);
    }

    memory.gespraeche.unshift({
      zeit: analyse.zeit,
      // Raw text is optional and requires separate transcript consent.
      text: ICS.mentorConsent?.allows("transcripts") ? analyse.text.slice(0, 500) : null,
      muster: analyse.musterIds,
      thema: analyse.thema ? analyse.thema.id : null,
      intensitaet: analyse.intensitaet
    });

    memory.gespraeche = memory.gespraeche.slice(0, 100);
    speichern(memory);

    return {memory, hypothese};
  }

  function roterFaden(gespraech, analyse, update){
    const teile = [];
    const haupt = gespraech.muster && ICS.MUSTER?.[gespraech.muster];
    const neu = analyse.muster[0];

    if(gespraech.antworten.length >= 2 && haupt){
      teile.push(`Vorhin hast du bereits etwas beschrieben, das zu <strong>${ICS.escapen(haupt.name)}</strong> passt.`);
    }

    if(neu && haupt && neu.id !== gespraech.muster){
      teile.push(`Jetzt kommt mit <strong>${ICS.escapen(neu.name)}</strong> ein weiterer wichtiger Aspekt dazu.`);
    }

    if(update.hypothese){
      teile.push(`Im Moment vermute ich: ${ICS.escapen(update.hypothese)}`);
    }

    return teile.join("<br><br>");
  }

  function naechsteStrategie(gespraech, analyse){
    if(analyse.intensitaet >= 75) return "stabilisieren";
    if(analyse.muster.length > 1) return "verbinden";
    if(gespraech.antworten.length >= 4) return "spiegeln";
    return "vertiefen";
  }

  function topScores(objekt, limit){
    return Object.entries(objekt || {})
      .sort((a,b) => b[1] - a[1])
      .slice(0, limit || 5)
      .map(([id, score]) => ({id, label: label(id), score}));
  }

  ICS.brain = {
    analysieren,
    aktualisieren,
    roterFaden,
    naechsteStrategie,
    laden,
    topScores,
    reset(){
      try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
    }
  };
})();
