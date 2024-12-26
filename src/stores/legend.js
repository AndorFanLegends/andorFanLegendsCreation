import { defineStore} from 'pinia'; // , storeToRefs

export const useLegendStore = defineStore('legend', {
    state: () => ({
        name: 'Die dunklen weiten von Andor',
        slug: null,
        author: "toto",
        abstract: "descriptif texte for introduce legend",
        year:"2013",
        players: "2-4",
        difficulty: [],
        officialBonus: true,
        board: [],
        boxExt: [],
        additionaldownload: null,
        download: null,
        type: 'single',
        series: null,
        number: null,
        newCardOpenIndex: 1,
        showPdf: false,
        cards: [{
            type: 'letter',
            name: 'A1',
            slug: 'a1',
            text: 'Führt zuerst die Anweisungen auf der **Checkliste** aus.\n\nAnschließend legt ihr zusätzlich folgenden Material neben dem Spielplan bereit:\n* Legt die Hexte, die 15 Kreaturplättchen, den Gegenstand Gibt und 3 schwarze Würfel bereit.\n* Legen **Sternchen auf D, H und N** der Legendenleiste.\n\n*In Andor trug sich eine Geschichte zu, die Ging so:....*\n\nStellt alle Helden auf das Feld **57.**\n\n***\n**Aufgabe:**\nDie Helden müssen die Burg verteidigen und den **die Dunkelheit** daran hindern, alle Bauern zu verschlingen bevor der Erzähler den Buchstaben **Feld H** erreicht hat.\n***',
            id: 1
          },
          {
            type: 'custom',
            name: 'In der Dunkelheit',
            slug: 'in-der-dunkelheit',
            subname: 'Diese Karte wird aufgedeckt, sobald die Dunkelheit in der Burg ist',
            text: '*Nach dem Sieg über den Drachen Tarok ist es Varkur gelungen, ein Drachenei in seinen Besitz zu bringen. Einen zweiten Drachen würde Andor nicht überleben, doch glücklicherweise konnten die Helden das Drachenei stehlen. Doch die eigentliche Aufgabe fängt gerade erst an: Um das Drachenei zu zerstören, müssen die Helden mehr altes Wissen über die Drachen zusammentragen und gleichzeitig den Bewohnern Andors helfen, sich von Taroks Angriff zu erholen.*\n\n***\n**Legendenziel:**\nAlle Feld um die Brug (Feld 22, 34, 45, 34 und 33) müssen von der Dunkelheit befreit sein.\n***\n**Wichtig:** Für jeden Feld, das ein Held die Dunkelheit bekämpft, muss der Held Willenspunkte abgeben:\nbei **2** Spielern **pro Feld 2 Willenspunkte**\nbei **3** Spielern **pro Feld 3 Willenspunkte**\nbei **4** Spielern **pro Feld 4 Willenspunkte**\n',
            id: 2
          },
          {
            type: 'end',
            name: 'N',
            slug: 'N',
            success: 'Die Legende nahm ein **gutes Ende,** wenn ...\n... der König in der Burg ist und ...\n... die Burg erfolgreich verteidigt wurde.\n\n*Es war der Eskorte des Königs zu verdanken, dass dieser noch einmal auf seine Burg zurückkehrte. Der Regen hörte endlich auf und ein Regenboden spannte sich über den Innenhof.*',
            failure: 'Die Legende nahm ein **böses Ende**, wenn ...\n... der König **nicht** in der Burg ist ...\n... die Burg **nicht** erfolgreich verteidigt wurde.\n\nWenn ihr den Schwierigkeitsgrad der Legende etwas senden wollt, spielt doch einfach besser.',
            id: 3
          },
          {
            type: 'put',
            name: 'Der Handel',
            slug: 'der-handel',
            text: '*Wie so oft begab es sich, dass Garzwog den Helden einen Handel anbot.*\nJedem Helden ist es nun einmalig möglich **2 Stärkepunkte** im tausch gegen **6 Gold** zu erhalten.\n',
            id: 4
          }
        ]
    }),
    getters: {
        getLegend(state) {
        return state

        },
        /*getCard(id, state) {
        console.log(state.cards)
        console.log(id);

        }*/
    },
    actions: {
        activeCard(id) {
            this.newCardOpenIndex = id
        },
        deleteCard(id) {
            const item = this.cards.find(
                i => i.id === id);
            if (item) {
                this.cards = this.cards.filter(card => card.id !== id);
            }  
        }
    }
})