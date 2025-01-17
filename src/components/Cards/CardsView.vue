<script setup>
/* eslint-disable */ 
    import {computed, ref, reactive, toRefs, watch} from 'vue'
    import CardPreview from "andor-legendcard";
    import {useLegendStore} from "./../../stores/legend";
    
    const legendStore = useLegendStore();
    const updateCardName = legendStore.updateCardName

    // Déclarer les props const 
    const props = defineProps({
        cardData: { 
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'single'
        },
        series: {
            type: String,
            default: ''
        },
        number: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'classicalTheme'
        },
        formDisabled: {
            type: Boolean,
            required: true,
            default: true
        }
    }); 
    // Utiliser toRefs pour rendre les props réactives 
    const { cardData } = toRefs(props);

    watch( () => name, () => {
        //legend.slug = setLegendSlug(legend);
        console.log(" nom de carte")
    } );

</script>

<template>
    <v-container>
        <v-text-field
            :disabled="formDisabled"
            v-bind:label="$t('cardName')"
            @input="updateCardName(cardData.id, cardData.name)"
            v-model="cardData.name"></v-text-field>
        <label class="v-label d-flex">{{ $t('cardType') }}</label>
        <v-radio-group inline v-model="cardData.type" :disabled="formDisabled">
            <v-radio
                v-bind:label="$t('type.letter')"
                value="letter"></v-radio>
            <v-radio
                v-bind:label="$t('type.end')"
                value="end"></v-radio>
            <v-radio
                v-bind:label="$t('type.track')"
                value="put"></v-radio>
            <v-radio
                v-bind:label="$t('type.instruction')" 
                value="instruction"></v-radio>
            <v-radio
                v-bind:label="$t('type.custom')"
                value="custom"></v-radio>
        </v-radio-group>
        <v-text-field 

            v-if="(cardData.type === 'custom' || cardData.type === 'instruction')"
            :disabled="(cardData.type === 'letter')"
            placeholder="La carte est révélée lorsque"
            required
            v-bind:label="$t('cardSubTitle')" 
            v-model="cardData.subname"></v-text-field>
        <v-textarea
            :disabled="formDisabled"
            v-model="cardData.text"
            v-if="(cardData.type !== 'end')"
            v-bind:label="$t('cardText')"
            rows="10"
        ></v-textarea>
        <div v-if="(cardData.type === 'end')">
            <v-textarea
                v-model="cardData.success"
                v-bind:label="$t('cardSuccessText')"
                rows="7" required
                ></v-textarea>
            <v-textarea
                v-model="cardData.failure"
                v-bind:label="$t('cardFailText')"
                rows="7" required
                ></v-textarea>
        </div>
    </v-container>
    <v-container>
        <CardPreview :card-data="cardData" :name="name" :series="series" :number="number" :type="type" :theme="theme" style="margin: 0 auto;" />
        <!-- :name="name" :type="type" :series="series" :number="number"-->
    </v-container>
</template>