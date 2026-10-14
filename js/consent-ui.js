(function () {
  const consent = window.ICS?.mentorConsent;
  const box = document.getElementById("ics-memory-settings");
  if (!consent || !box) return;
  const insights = document.getElementById("ics-memory-insights");
  const status = document.getElementById("ics-memory-status");
  function refresh(message) {
    const state = consent.get();
    insights.checked = state.insights;
    status.textContent = message || (state.insights
      ? "Erkenntnisse: aktiviert (nur in diesem Browser)."
      : "Erkenntnisse: deaktiviert. Du kannst den Mentor ohne Speicherung nutzen.");
  }
  document.getElementById("ics-memory-save").addEventListener("click", function () {
    try {
      if (insights.checked && consent.hasLegacy() && !consent.legacyApproved()) {
        const agreed = window.confirm("In diesem Browser gibt es frühere Mentor-Erinnerungen. Möchtest du diese ausdrücklich wieder für den Mentor freigeben? Abbrechen lässt die bisherigen Daten unangetastet und deaktiviert die Erinnerung.");
        if (agreed) consent.approveLegacy();
        else { consent.blockLegacy(); consent.revoke(); refresh("Alte Erinnerungen wurden nicht übernommen. Speicherung bleibt deaktiviert."); return; }
      }
      consent.set({ insights: insights.checked, transcripts: false });
      refresh("Einstellung gespeichert. " + (insights.checked
        ? "Vorhandene lokale Mentor-Daten können nun wieder verwendet werden."
        : "Keine weiteren Erinnerungen werden gespeichert. Bereits gespeicherte Daten bleiben bis zur Löschung erhalten."));
    } catch (_) { refresh("Speichern war nicht möglich. Bitte Browsereinstellungen prüfen."); }
  });
  document.getElementById("ics-memory-revoke").addEventListener("click", function () {
    try { consent.revoke(); refresh("Einwilligung widerrufen. Vorhandene Daten bleiben bis zur Löschung erhalten."); }
    catch (_) { refresh("Widerruf konnte nicht gespeichert werden."); }
  });
  document.getElementById("ics-memory-delete").addEventListener("click", function () {
    if (!window.confirm("Lokale ICS-Mentor-Erinnerungen in diesem Browser dauerhaft löschen?")) return;
    try {
      consent.revoke();
      consent.deleteMemories();
      refresh("Lokale Mentor-Erinnerungen gelöscht und Speicherung deaktiviert.");
      // Clear the current in-memory conversation as well as persisted memory.
      window.location.reload();
    } catch (_) { refresh("Löschen konnte nicht abgeschlossen werden."); }
  });
  refresh();
})();
