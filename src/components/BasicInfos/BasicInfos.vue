<script setup>
import { ref,defineProps } from 'vue';
import options from './../../options'

const props = defineProps({
    legend: {
        type: Object,
        default: () => ({})
    }
});

const legend = ref(props.legend);
</script>

<template>
    <v-row>
        <v-checkbox v-model="legend.officialBonus" hide-details cols="12" label="Légende Bonus Officielle"></v-checkbox>
        <v-col cols="12">
            <v-text-field
                v-model="legend.author"
                label="Auteur"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea 
                v-model="legend.abstract"
                label="Résumé"
                variant="underlined"
            ></v-textarea>
        </v-col>
        <v-col cols="12">
            <v-text-field
                v-model="legend.year"
                label="Année"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field
                v-model="legend.players"
                label="Nombre de joueurs"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">Difficulté</label>
            <v-chip-group
                v-model="legend.difficulty" 
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="difficulty in options.difficultiesOptions" 
                        :key="difficulty.key"
                        :value="difficulty.key">
                    {{ difficulty.name }}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">Plateau</label>
            <v-chip-group
                v-model="legend.board"
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="board in options.boardOptions" 
                        :key="board.key"
                        :value="board.key">
                    {{ board.name }}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">Nécessite</label>
            <v-chip-group
                v-model="legend.boxExt"
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="boxExt in options.boxExtOptions" 
                        :key="boxExt.key"
                        :value="boxExt.key">
                    {{ boxExt.name }}
                </v-chip>
            </v-chip-group>
        </v-col>
    </v-row>
</template>