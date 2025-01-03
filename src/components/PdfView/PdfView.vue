<script setup>
    import { ref, watch, defineProps, defineEmits } from 'vue';
    import CardPreview from "andor-legendcard";
    import {useLegendStore} from "./../../stores/legend";
    import html2pdf from "html2pdf.js";

    const props = defineProps({ dialog: Boolean });
    const emit = defineEmits(['update:dialogPdfPreview']);
    const dialog = ref(props.dialog);
    watch(() => props.dialog, (newVal) => { dialog.value = newVal; });

    const legend = useLegendStore().getLegend;

    function closeDialog() {
        dialog.value = false;
        emit('update:dialogPdfPreview', false);
    }

    function exportToPDF() {
      html2pdf(document.getElementById("pdfContent"), {
        //margin: 1,
        margin: [10, 10, 10, 10],
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: { 
            scale: 0.98,
            scrollY:0,
            //letterRendering: true,
            useCORS: true,
        },
        /*jsPDF: {
            unit: 'mm',
            format: 'letter',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
        },*/
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
        },
        filename: legend.name + ".pdf",
      });
    }

</script>

<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>PDF Preview</v-toolbar-title>
                <v-spacer></v-spacer>
                <button @click="exportToPDF">Export to PDF</button>
                <v-spacer></v-spacer>
                <v-btn icon @click="closeDialog"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container id="pdfContent">
                    <div v-for="(card, index) in legend.cards" :key="card.id" class="cards2print">
                        <CardPreview :card-data="card" :name="name" :type="card.type" :class="{pageBreak: (index % 2 === 0)}"  style="margin: 0 auto;" />
                    </div>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .pageBreak {
        page-break-before: always;
        margin-top: 20px !important;
    }
</style>