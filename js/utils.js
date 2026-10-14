window.ICS=window.ICS||{};
ICS.normalisiere=function(text){return String(text||"").toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\p{L}\p{N}\s]/gu," ").replace(/\s+/g," ").trim();};
ICS.escapen=function(text){const d=document.createElement("div");d.textContent=String(text||"");return d.innerHTML;};
ICS.zufall=function(liste){return Array.isArray(liste)&&liste.length?liste[Math.floor(Math.random()*liste.length)]:"";};
ICS.pruefeRegeln=function(text,regeln){const n=ICS.normalisiere(text);return(regeln||[]).reduce((s,r)=>s+(r.test(n)?1:0),0);};
ICS.ergebnisse=function(text,daten){return Object.keys(daten).map(id=>Object.assign({id,punkte:ICS.pruefeRegeln(text,daten[id].regeln)},daten[id])).filter(e=>e.punkte>0).sort((a,b)=>b.punkte-a.punkte);};
ICS.bestesErgebnis=function(text,daten){return ICS.ergebnisse(text,daten)[0]||null;};
