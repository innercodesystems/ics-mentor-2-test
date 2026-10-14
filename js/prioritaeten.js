window.ICS = window.ICS || {};

ICS.Prioritaeten = (() => {

  function bewerten(analyse, gespraech){

    const ergebnisse = [];

    if(!analyse){
      return ergebnisse;
    }

    const muster = Array.isArray(analyse.muster)
      ? analyse.muster
      : [];

    muster.forEach((eintrag, index) => {

      const id = eintrag.id || "";
      const name = eintrag.name || id;

      let score = 100 - (index * 10);

      if(gespraech.muster === id){
        score += 15;
      }

      if(gespraech.weitereMuster?.includes(id)){
        score += 8;
      }

      ergebnisse.push({
        typ: "muster",
        id,
        name,
        score
      });

    });

    if(analyse.emotion){

      ergebnisse.push({
        typ: "emotion",
        id: analyse.emotion.id || "emotion",
        name: analyse.emotion.name || "Emotion",
        score: 75
      });

    }

    if(analyse.thema){

      ergebnisse.push({
        typ: "thema",
        id: analyse.thema.id,
        name: analyse.thema.name || analyse.thema.id,
        score: 65
      });

    }

    return ergebnisse
      .filter(eintrag => eintrag.id)
      .sort((a, b) => b.score - a.score);

  }

  function wichtigste(analyse, gespraech){

    const liste = bewerten(analyse, gespraech);

    return liste.length
      ? liste[0]
      : null;

  }

  return {
    bewerten,
    wichtigste
  };

})();
