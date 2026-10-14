window.ICS = window.ICS || {};

ICS.Hypothesen = (() => {

    function erstellen(gespraech, analyse, memory){

        const liste = [];

        if(!analyse) return liste;

        if(analyse.musterIds?.includes("kontrolle")){

            liste.push({

                id:"angst_kontrolle",

                text:"Möglicherweise versuchst du über Kontrolle Sicherheit zu gewinnen.",

                frage:"Wie fühlt es sich für dich an, Kontrolle einmal bewusst loszulassen?",

                score:90

            });

        }

        if(analyse.musterIds?.includes("perfektionismus")
            && analyse.thema?.id==="arbeit"){

            liste.push({

                id:"arbeit_perfektion",

                text:"Dein Leistungsanspruch scheint eng mit deinem Selbstwert verbunden zu sein.",

                frage:"Woran würdest du merken, dass du auch ohne perfekte Leistung wertvoll bist?",

                score:85

            });

        }

        return liste.sort((a,b)=>b.score-a.score);

    }

    return{

        erstellen

    };

})();
