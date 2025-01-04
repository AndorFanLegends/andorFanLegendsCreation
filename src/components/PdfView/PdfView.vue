<script setup>
    import { ref, watch, defineProps, defineEmits, computed } from 'vue';
    import CardPreview from "andor-legendcard";
    import {useLegendStore} from "./../../stores/legend";
    import html2pdf from 'html2pdf.js';

    const props = defineProps({ dialog: Boolean });
    const emit = defineEmits(['update:dialogPdfPreview']);
    const dialog = ref(props.dialog);
    watch(() => props.dialog, (newVal) => { dialog.value = newVal; });

    const printFormat = ref('bothSide');

    const legend = useLegendStore().getLegend;

    function closeDialog() {
        dialog.value = false;
        emit('update:dialogPdfPreview', false);
    }

    const exportToPDF = () => {
        let content = null;
        if (printFormat.value === 'bothSide') {
            content = document.getElementById('pdfContent');
        } else {
            content = document.getElementById('pdfContent2');
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
            pagebreak: { mode: ['avoid-all'] },
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
    console.log("COMPLETE CHUNK");
    console.log(completeChunks)
    return completeChunks;
};
// Calculer les groupes de 4 éléments pour chaque page
const paginatedItems = computed(() => completeChunks(chunkArray(legend.cards, 4), 4));

// Fonction pour réorganiser les éléments pour les versos
const reorganizeItems = (page) => {
    if (page.length === 4) {
        return [page[1], page[0], page[3], page[2]];
    }
    console.log("REORGANISATION")
    console.log(page)
    return page;
};
    
</script>

<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>PDF Preview</v-toolbar-title>
                <v-spacer></v-spacer>
                <div class="radio-buttons">
                    <label><input type="radio" value="bothSide" v-model="printFormat" /> Afficher Div 1 </label>
                    <label><input type="radio" value="singleSide" v-model="printFormat" /> Afficher Div 2 </label>
                </div>
                <v-spacer></v-spacer>
                <button @click="exportToPDF">Export to PDF</button>
                <v-spacer></v-spacer>
                <v-btn icon @click="closeDialog"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container v-if="printFormat === 'bothSide'" id="pdfContent">
                    <div v-for="(card, index) in legend.cards" :key="card.id" class="cards2print"> <!-- -->
                        <CardPreview :card-data="card" :name="legend.name" :type="card.type" :class="{pageBreak: (index % 2 === 0)}"  style="margin: 0 auto;" />
                        <v-spacer></v-spacer>
                    </div>
                </v-container>
                <v-container v-if="printFormat === 'singleSide'" id="pdfContent2">
                    <div v-for="(page, pageIndex) in paginatedItems" :key="pageIndex" class="page">
                        <!-- Affichage des rectos -->
                        <div  class="recto">
                            <div class="item" v-for="(item, itemIndex) in page" :key="itemIndex">
                                <p>Recto: {{ item.name }}</p>
                            </div>
                        </div>
                        <!-- Affichage des versos -->
                         <div class="verso">
                            <div class="item" v-for="(item, itemIndex) in reorganizeItems(page)" :key="itemIndex">
                                <p>Verso: {{ item.name }}</p>
                            </div>
                        </div>
                        <hr>
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
    }
</style>