<script setup>
/* eslint-disable */ 
    import {computed, reactive, defineProps} from 'vue'
    import CardPreview from "andor-legendcard";
    
    /*const props = defineProps({
        legend: {
            type: Object,
            default: () => ({})
        }
    });*/
    //const legend = reactive(props.legend);

    let cardData = computed(
        {
            type: '',
            name: '',
            slug: '',
            text: '',
            id: null
        }
    )

    //const cardData = reactive(
        
    //)
    cardData = {
            //console.log(legend.cards)
            //console.log(legend)

            /*return legend.value.cards.find(
                i => i.id === legend.value.newCardOpenIndex
            );*/
            //return {
                type: 'put',
                name: 'Der Handel',
                slug: 'der-handel',
                text: '*Wie so oft begab es sich, dass Garzwog den Helden einen Handel anbot.*\nJedem Helden ist es nun einmalig möglich **2 Stärkepunkte** im tausch gegen **6 Gold** zu erhalten.\n',
                id: 4
            //}
        }

</script>
<template>
    <v-container>
        <v-text-field label="Nom de la Carte" v-model="cardData.name"></v-text-field>
        <label class="v-label d-flex">Type de Carte</label>
        <v-radio-group inline v-model="cardData.type">
            <v-radio label="Lettre" value="letter"></v-radio>
            <v-radio label="Fin du jeu (N, en général)" value="end"></v-radio>
            <v-radio label="Cartes de la Piste" value="put"></v-radio>
            <v-radio label="Instructions" value="instruction"></v-radio>
            <v-radio label="Autres" value="custom"></v-radio>
        </v-radio-group>
        <v-text-field 
            v-if="(cardData.type === 'custom' || cardData.type === 'instruction')"
            :disabled="(cardData.type === 'letter')"
            placeholder="La carte est révélée lorsque"
            required
            label="Sous-titre" v-model="cardData.subname"></v-text-field>
        <v-textarea
            v-model="cardData.text"
            v-if="(cardData.type !== 'end')"
            label="Texte de Carte"
            rows="10"
        ></v-textarea>
        <div v-if="(cardData.type === 'end')">
            <v-textarea
                v-model="cardData.success"
                label="Texte de Succès"
                rows="7" required
                ></v-textarea>
            <v-textarea
                v-model="cardData.failure"
                label="Texte d'Echec"
                rows="7" required
                ></v-textarea>
        </div>
    </v-container>
    <v-container>
        <CardPreview :card-data="cardData" :name="name" :type="cardData.type"  style="margin: 0 auto;" />
        <!-- :name="name" :type="type" :series="series" :number="number"-->
    </v-container>
</template>