window.ICS = window.ICS || {};

ICS.Intelligenz = {

  priorisieren:function(analyse){

    if(!Array.isArray(analyse)){
      return [];
    }

    return [...analyse]
      .sort((a,b)=>b.score-a.score);

  },

  hauptthema:function(analyse){

    return this.priorisieren(analyse)[0] || null;

  },

  nebenthemen:function(analyse){

    return this.priorisieren(analyse)
      .slice(1,4);

  },

  erklaerung:function(analyse){

    const haupt =
      this.hauptthema(analyse);

    if(!haupt){
      return null;
    }

    const neben =
      this.nebenthemen(analyse);

    return {

      haupt,

      neben,

      text:

        neben.length

        ?

        `${haupt.name} steht aktuell im Mittelpunkt. Gleichzeitig verstärken ${neben.map(e=>e.name).join(", ")} dieses Muster.`

        :

        `${haupt.name} steht aktuell im Mittelpunkt.`

    };

  }

};
