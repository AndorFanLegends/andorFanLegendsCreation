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
        <v-checkbox 
            v-bind:label="$t('officialLegend')"
            v-model="legend.officialBonus" hide-details cols="12"></v-checkbox>
        <v-col cols="12">
            <v-text-field
                v-model="legend.author"
                v-bind:label="$t('author')"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea 
                v-model="legend.abstract"
                v-bind:label="$t('abstract')"
                variant="underlined"
            ></v-textarea>
        </v-col>
        <v-col cols="12">
            <v-text-field
                v-model="legend.year"
                v-bind:label="$t('year')"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field
                v-model="legend.players"
                v-bind:label="$t('players')"
                variant="underlined"
                required
                hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">{{ $t("difficulty") }}</label>
            <v-chip-group
                v-model="legend.difficulty" 
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="difficulty in options.difficultiesOptions" 
                        :key="difficulty.key"
                        :value="difficulty.key">
                    {{ $t(difficulty.name) }}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">{{ $t("board") }}</label>
            <v-chip-group
                v-model="legend.board"
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="board in options.boardOptions" 
                        :key="board.key"
                        :value="board.key">
                    {{ $t(board.name) }}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="12">
            <label class="v-label d-flex">{{ $t("boxExt") }}</label>
            <v-chip-group
                v-model="legend.boxExt"
                selected-class="bg-light-green-darken-4"
                column multiple>
                <v-chip
                    color="grey-lighten-3"
                    v-for="boxExt in options.boxExtOptions" 
                        :key="boxExt.key"
                        :value="boxExt.key">
                    {{ $t(boxExt.name) }}
                </v-chip>
            </v-chip-group>
        </v-col>
    </v-row>
</template>