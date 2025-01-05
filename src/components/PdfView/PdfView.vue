<script setup>
    import { ref, watch, defineProps, defineEmits, computed } from 'vue';
    import CardPreview from "andor-legendcard/index.vue";
    import CardPreviewRecto from "andor-legendcard/cardPreviewRecto.vue";
    import CardPreviewVerso from "andor-legendcard/cardPreviewVerso.vue";
    import {useLegendStore} from "./../../stores/legend";
    import html2pdf from 'html2pdf.js';

    const props = defineProps({ dialog: Boolean });
    const emit = defineEmits(['update:dialogPdfPreview']);
    const dialog = ref(props.dialog);
    watch(() => props.dialog, (newVal) => { dialog.value = newVal; });

    const printFormat = ref('bothSide');
    const printMode = ref('color');

    const legend = useLegendStore().getLegend;

    function closeDialog() {
        dialog.value = false;
        emit('update:dialogPdfPreview', false);
    }

    const exportToPDF = () => {
        let content = null;
        if (printFormat.value === 'bothSide') {
            content = document.getElementById('pdfContentBothSide');
        } else {
            content = document.getElementById('pdfContentSingleSide');
        }
        const options = {
            margin: [10,10,10,10],
            filename: 'modale-contenu.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 1.2,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm', format: 'a4', orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy',] },
            scrollY: 0
        };
        html2pdf().from(content).set(options).save();
        /*html2pdf().from(content).set(options).toPdf().get('pdf').then((pdf) => {
            // Désactiver la première page blanche
            pdf.deletePage(1);
        }).save();*/
    };


//const items = ref(legend.cards.value);

// Fonction pour diviser les éléments en groupes de 4 
const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};
// Compléter les groupes incomplets
const completeChunks = (chunks, chunkSize) => {
    let completeChunks = chunks.map(chunk => {
        while (chunk.length < chunkSize) {
            chunk.push({ recto: '', verso: '' });
            // Ajouter des éléments vides pour compléter les groupes
        }
        return chunk;
    });
    return completeChunks;
};
// Calculer les groupes de 4 éléments pour chaque page
const paginatedItems = computed(() => completeChunks(chunkArray(legend.cards, 4), 4));

// Fonction pour réorganiser les éléments pour les versos
const reorganizeItems = (page) => {
    if (page.length === 4) {
        return [page[1], page[0], page[3], page[2]];
    }
//    console.log("REORGANISATION")
//    console.log(page)
    return page;
};
    
</script>

<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
        <v-card>
            <v-toolbar density="compact" :elevation="8">
                <v-toolbar-title>PDF Preview</v-toolbar-title>
                <v-radio-group v-model="printFormat" inline class="d-flex align-center">
                    <v-radio :label="$t('foldingCard')" value="bothSide" ></v-radio>
                    <v-radio :label="$t('duplexPrinting')" value="singleSide" ></v-radio>
                </v-radio-group>
                <v-radio-group v-model="printMode" inline class="d-flex align-center">
                    <v-radio :label="$t('classicColor')" value="color" ></v-radio>
                    <v-radio :label="$t('blackWhite')" value="blackWhite" disabled="disabled"></v-radio>
                </v-radio-group>
                <v-btn class="green lighten-1" variant="tonal" @click="exportToPDF">Export to PDF</v-btn>
                <v-btn icon @click="closeDialog"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container v-if="printFormat === 'bothSide'" id="pdfContentBothSide">
                    <div v-for="(card, index) in legend.cards" :key="card.id" class="cards2print"> <!-- -->
                        <CardPreview :card-data="card" :name="legend.name" :series="legend.series" :number="legend.number" :type="legend.type" :class="{pageBreak: (index % 2 === 0)}"  style="margin: 0 auto;" />
                        <v-spacer></v-spacer>
                    </div>
                </v-container>
                <v-container v-if="printFormat === 'singleSide'" id="pdfContentSingleSide">
                    <div v-for="(page, pageIndex) in paginatedItems" :key="pageIndex" class="page">
                        <v-row class="d-flex justify-center">
                                <!-- Affichage des rectos -->
                                <v-col cols="6" v-for="(card, itemIndex) in page" :key="itemIndex" :class="{'d-flex justify-center': itemIndex % 2 === 0}">
                                    <CardPreviewRecto :card-data="card" :name="legend.name" :series="legend.series" :number="legend.number" :type="legend.type" :class="{pageBreak: (index % 2 === 0)}"  style="margin: 0 auto;" />
                                </v-col>
                        </v-row>
                        <v-spacer class="pageBreak"></v-spacer>
                        <v-row class="d-flex justify-center">
                                <!-- Affichage des versos -->
                                <v-col cols="6" v-for="(card, itemIndex) in reorganizeItems(page)" :key="itemIndex" :class="{'d-flex justify-center': itemIndex % 2 === 0}">
                                    <CardPreviewVerso :card-data="card" :name="legend.name" :series="legend.series" :number="legend.number" :type="legend.type" :class="{pageBreak: (index % 2 === 0)}"  style="margin: 0 auto;" />
                                </v-col>
                        </v-row>
                        <v-spacer class="pageBreak"></v-spacer>
                    </div>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .pageBreak {
        page-break-before: always;
    }
    .cards2print{
        margin-top:20px;
        padding-top:10px;
    }
    .left{
        background-size:contain !important;
    }
    .card{
        width:162mm !important;
        height:120mm !important;
        background: none;
    }
    /*.item {
        width:162mm !important;
        height:120mm !important;
    }*/
    .v-container{
        padding:2px 0 0 0;
    }
    .page{
        margin:0px;
    }
    .v-card-text{
        padding:0px;
    }
    .v-col {
        padding:0px;
    }
    #pdfContentSingleSide .card {
        float: left;
        width:307px !important;
        /*margin-right: 90px !important;*/
        /*margin-bottom:50px !important;*/
    }

    

/*
.card :deep(ul) {
  padding-left: 1.1rem;
  margin: 0;
}

.card :deep(ol) {
  padding-left: 1rem;
}

.card :deep(li) {
  padding: 2px 0;
}*/
</style>