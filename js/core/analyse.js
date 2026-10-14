window.ICS = window.ICS || {};

ICS.Analysieren = function (text, gespraech) {

  const normalisiert =
    typeof ICS.normalisiere === "function"
      ? ICS.normalisiere(text)
      : String(text || "").toLowerCase().trim();

  const einstieg = einstiegErkennen(normalisiert);

  const muster =
    typeof ICS.musterErkennenAlle === "function"
      ? ICS.musterErkennenAlle(text)
      : [];

  const thema =
    typeof ICS.themaErkennen === "function"
      ? ICS.themaErkennen(text)
      : null;

  const emotion =
    typeof ICS.emotionErkennen === "function"
      ? ICS.emotionErkennen(text)
      : null;

  return {
    text: text,
    normalisiert: normalisiert,
    einstieg: einstieg,
    muster: muster,
    thema: thema,
    emotion: emotion,
    gespraech: gespraech || null
  };

};


function einstiegErkennen(text) {

  const n = String(text || "")
    .toLowerCase()
    .trim();

  if (n.includes("situation")) {
    return "situation";
  }

  if (
    n.includes("gefuehl") ||
    n.includes("gefühl")
  ) {
    return "gefuehl";
  }

  if (n.includes("beziehung")) {
    return "beziehung";
  }

  if (n.includes("entscheidung")) {
    return "entscheidung";
  }

  if (
    n.includes("wiederkehrendes verhalten") ||
    n === "verhalten"
  ) {
    return "verhalten";
  }

  return "";
}
