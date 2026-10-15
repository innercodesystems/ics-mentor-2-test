// ICS Mentor 2.0 – consent controller (test branch only).
// No consent by default. Legacy memory is neither read nor migrated without consent.
window.ICS = window.ICS || {};
ICS.mentorConsent = (function () {
  const KEY = "ICS_MENTOR_CONSENT_V1";
  const NOTES_KEY = "ICS_MENTOR_NOTES_V1";
  const LEGACY_KEY = "ICS_MENTOR_LEGACY_DECISION_V1";
  function hasLegacy() {
    try { return localStorage.getItem("ICS_MENTOR_BRAIN_V10") !== null || localStorage.getItem("ICS_MENTOR_PROFILE_V1") !== null; }
    catch (_) { return false; }
  }
  function legacyApproved() {
    try { return localStorage.getItem(LEGACY_KEY) === "approved"; }
    catch (_) { return false; }
  }
  function approveLegacy() { localStorage.setItem(LEGACY_KEY, "approved"); }
  function blockLegacy() { localStorage.setItem(LEGACY_KEY, "blocked"); }
  function get() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!value || value.version !== 1) return { insights: false, transcripts: false };
      return { insights: value.insights === true, transcripts: value.transcripts === true };
    } catch (_) { return { insights: false, transcripts: false }; }
  }
  function allows(kind) { return get()[kind] === true && (!hasLegacy() || legacyApproved()); }
  function set(options) {
    if (!hasLegacy() && !legacyApproved()) approveLegacy();
    const next = {
      version: 1,
      insights: options?.insights === true,
      transcripts: options?.insights === true && options?.transcripts === true,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(KEY, JSON.stringify(next));
    return get();
  }
  // Revocation stops future access/writes; existing data remains until explicit deletion.
  function revoke() { return set({ insights: false, transcripts: false }); }
  function deleteMemories() {
    localStorage.removeItem(NOTES_KEY);
    localStorage.removeItem("ICS_MENTOR_BRAIN_V10");
    localStorage.removeItem("ICS_MENTOR_PROFILE_V1");
    localStorage.removeItem(LEGACY_KEY);
  }
  function notes() {
    if (!allows("insights")) return [];
    try {
      const stored = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
      return Array.isArray(stored) ? stored.filter(item => item && typeof item.text === "string").slice(-30) : [];
    } catch (_) { return []; }
  }
  function addNote(value) {
    if (!allows("insights")) return false;
    const content = String(value || "").trim().slice(0, 600);
    if (!content) return false;
    const all = notes();
    all.push({ id: String(Date.now()) + Math.random().toString(36).slice(2), text: content, date: new Date().toISOString() });
    localStorage.setItem(NOTES_KEY, JSON.stringify(all.slice(-30)));
    return true;
  }
  function removeNote(id) {
    if (!allows("insights")) return false;
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes().filter(item => item.id !== id)));
    return true;
  }
  return { get, allows, set, revoke, deleteMemories, hasLegacy, legacyApproved, approveLegacy, blockLegacy, notes, addNote, removeNote };
})();
