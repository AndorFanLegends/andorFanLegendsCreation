
import { defineStore} from 'pinia'; // , storeToRefs
import nanoid from 'nanoid';
import { sorter, sorterInstruction } from '../functions/sortFunctions';
import { blankLegend, sampleLegend, newCardTemplate } from '../functions/legendData';
import {slugify} from "../functions/slugify";

export const useLegendStore = defineStore('legend', {
    state: () => ({
      ...blankLegend
    }),
    getters: {
        getLegend(state) {
            //state.cards = [...state.cards].sort(sorter).sort(sorterInstruction);
            return state
        },
        getActiveCard() {
          return this.newCardOpenIndex;
        }
    },
    actions: {
        blankLegend() {
            this.$state = {
                ...blankLegend
          }
        },
        sampleLegend() {
          Object.assign(this, sampleLegend);
        },
        activeCard(id) {
            this.newCardOpenIndex = id
        },
        deleteCard(id) {
            const item = this.cards.find(
                i => i.id === id);
            if (item) {
                this.cards = this.cards.filter(card => card.id !== id);
            }  
        },
        addNewCard() {
            const newId = nanoid();
            const newCard = { ...newCardTemplate, id: newId };
            this.cards.push(newCard);
            return newId;
        },
        sortCards() { 
            this.cards = [...this.cards].sort(sorter).sort(sorterInstruction); 
        },
        updateCardName(id, newName) {
            const card = this.cards.find(card => card.id === id);
            if (card) {
                card.name = newName;
                let slug = slugify(newName)
                while (this.cards.filter(i => i.slug === slug && i.id !== this.newCardOpenIndex).length !== 0) {
                    slug += 1;
                }
                card.slug = slug;
                this.sortCards(); 
                // Trier les cartes dès que le nom est mis à jour
            }
        }
    }
})