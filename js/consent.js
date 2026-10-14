// ICS Mentor 2.0 – consent controller (test branch only).
// No consent by default. Legacy memory is neither read nor migrated without consent.
window.ICS = window.ICS || {};
ICS.mentorConsent = (function () {
  const KEY = "ICS_MENTOR_CONSENT_V1";
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
    localStorage.removeItem("ICS_MENTOR_BRAIN_V10");
    localStorage.removeItem("ICS_MENTOR_PROFILE_V1");
    localStorage.removeItem(LEGACY_KEY);
  }
  return { get, allows, set, revoke, deleteMemories, hasLegacy, legacyApproved, approveLegacy, blockLegacy };
})();
