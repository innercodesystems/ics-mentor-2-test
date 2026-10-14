window.ICS = window.ICS || {};

ICS.Graph = (() => {

    const STORAGE_KEY = "ICS_GRAPH";

    let daten = lade();

    function lade() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
                knoten: {},
                verbindungen: {}
            };
        } catch {
            return {
                knoten: {},
                verbindungen: {}
            };
        }
    }

    function speichern() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(daten));
    }

    function addKnoten(name) {

        if (!name) return;

        if (!daten.knoten[name]) {

            daten.knoten[name] = {

                id: name,

                count: 1,

                erstellt: Date.now(),

                zuletzt: Date.now()

            };

        } else {

            daten.knoten[name].count++;

            daten.knoten[name].zuletzt = Date.now();

        }

        speichern();

    }

    function addVerbindung(a, b) {

        if (!a || !b || a === b) return;

        const key = [a, b].sort().join("|");

        if (!daten.verbindungen[key]) {

            daten.verbindungen[key] = {

                von: a,

                nach: b,

                gewicht: 1

            };

        } else {

            daten.verbindungen[key].gewicht++;

        }

        speichern();

    }

    function nachbarn(knoten) {

        return Object.values(daten.verbindungen)

            .filter(v => v.von === knoten || v.nach === knoten)

            .sort((a, b) => b.gewicht - a.gewicht);

    }

    function topKnoten(limit = 10) {

        return Object.values(daten.knoten)

            .sort((a, b) => b.count - a.count)

            .slice(0, limit);

    }

    function reset() {

        daten = {

            knoten: {},

            verbindungen: {}

        };

        speichern();

    }

    return {

        addKnoten,

        addVerbindung,

        nachbarn,

        topKnoten,

        reset

    };

})();
