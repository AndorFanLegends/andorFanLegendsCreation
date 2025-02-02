<script setup>
    import {ref, reactive, computed, watch} from 'vue';
    import { useI18n } from "vue-i18n";
    import { saveAs } from "file-saver";
    import MainInfos from  "./components/MainInfos/MainInfos.vue";
    import BasicInfos from "./components/BasicInfos/BasicInfos.vue";
    import CardsView from "./components/Cards/CardsView.vue";
    import SettingsView from "./components/SettingsView/SettingsView.vue";
    import PdfView from "./components/PdfView/PdfView.vue";
    import HowToView from "./components/HowToView/HowToView.vue";
    import {slugify} from "./functions/slugify.js"

    // Interfaces
    const drawer = ref(true)
    const tab = ref(null)

    // Utilisation des stores
    import {useLegendStore} from './stores/legend';
    import { useSettingsStore } from './stores/settings.js';
    const legendStore = useLegendStore()
    const settingsStore = useSettingsStore();
    const t = useI18n();
    
    // Gestion de la langue
    let languageSettings = reactive(settingsStore.activeLanguage);
    if (languageSettings != null && languageSettings != t.locale.value) {
        t.locale.value = languageSettings;
    }
    settingsStore.activeLanguage = t.locale.value;

    // Utilisation d'une référence réactive pour legend
    const legend = reactive(legendStore.getLegend);

    watch( () => legend.name, () => {
        legend.slug = setLegendSlug(legend);
    } );

    /*watch( () => legendStore.cards, () => {
        //legend.slug = setLegendSlug(legend);
        console.log("tototo");
        //legendStore.sortCards()
        //return [...legendStore.cards].sort(sorter).sort(sorterInstruction);
    },
    { deep: true }
    );*/

/*    function slugify(string) {
        const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
        const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return string.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with ‘and’
            // Remove all non-word characters 
            .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape 
            // Replace multiple - with single -
            .replace(/\-\-+/g, '-') // eslint-disable-line no-useless-escape 
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text */
    //}

    function setLegendSlug(legend) {
        if (legend.series != null  && legend.number != null) {
            //console.log(legend.series + '-'+ legend.number + '-' + legend.name);
            return slugify(legend.series + '-' + legend.number + '-' + legend.name);
        } else {
            return slugify(legend.name);
        }
    }

    const parentCardData = ref({
                type: null,
                name: null,
                slug: null,
                text: null,
                id: null
            });

    //const formDisabled = ref(true)
    const formDisabled = computed(() => {
        if(legend.cards.length === 0){
            return true;
        }
        return false;
    });

    // Fonctions de Gestion des cartes
    function handleNewCard() {
        const newId = legendStore.addNewCard();
        parentCardData.value = legendStore.cards.find(
            i => i.id === newId
        );
    }

    function handleEdit(id) {
        //console.log(id)
        legendStore.activeCard(id);
        parentCardData.value = legendStore.cards.find(
            i => i.id === legendStore.newCardOpenIndex
        );
    }

    function handleDelete(id) {
        if (window.confirm("Voulez-vous vraiment supprimer cette carte ?")) {
            legendStore.deleteCard(id);

            legendStore.activeCard(1);
            parentCardData.value = legendStore.cards[0];

            if(legendStore.cards.length === 0) {
                parentCardData.value = {}
            }
        }
    }

    // Modal Settings
    const dialog = ref(false);
    const modal = ref(null);
    const handleSettings = () => { 
        if (modal.value) { 
            dialog.value = true; 
        } 
    }; 
    const updateSettingDialog = (val) => { 
        dialog.value = val; 
    };

    // Modal Export PDF
    const dialogPdfPreview = ref(false);
    const modalPdfPreview = ref(null);
    const handlePdfPreview = () => {
        if (modalPdfPreview.value) { 
            dialogPdfPreview.value = true;
        }
    };
    const updatePdfPreviewDialog = (val) => { 
        dialogPdfPreview.value = val; 
    };

    // Modal How To
    const dialogHowTo = ref(false);
    const modalHowTo = ref(null);
    const handleHowTo = () => {
        if (modalHowTo.value) { 
            dialogHowTo.value = true;
        }
    };
    const updateHowToDialog = (val) => { 
        dialogHowTo.value = val; 
    };

    // Others Menu Link
    function newBlankLegend() {
        legendStore.blankLegend();
    }

    function newSampleLegend() {
        legendStore.sampleLegend();
    }

    const fileInput = ref(null);
    function triggerFileInput() {
        fileInput.value.click(); 
    }

    function onFileChange(event) {
        try {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const newState = JSON.parse(event.target.result);
                if (!validateJson(newState)) {
                    return window.alert("Erreur lors du chargement du fichier : Not valid Json");
                }
                legendStore.blankLegend(); //reset all fields (need for not complete json (missed OfficialLegend or other) )
                legendStore.$state = newState
                // Forcer l'ordre
                legendStore.getLegend;
                legendStore.sortCards();
                // Activer la 1ere carte
                if (legendStore.cards.length > 0 ) {
                    /*parentCardData.value = legendStore.cards.find(
                        i => i.id === 1
                    );*/
                    parentCardData.value = legend.cards[0];
                }
            };
            // Start reading file
            reader.readAsText(file);
        } catch (event) {
            window.alert("Erreur lors du chargement du fichier");
        }
    }

    // Simple validation of Loading JSON
    function validateJson(object) {
      if ( !object.name ||  !Array.isArray(object.cards)) {
        return false;
      }
      return true;
    }

    function saveFile() {
      console.log(legend.slug)  
      const blob = new Blob([JSON.stringify(legendStore.$state)], {
        type: "application/json"
      });
      saveAs(blob, legend.slug);
    }
</script>

<template>
    <v-layout>
        
        <v-app-bar
            color="primary"
            density="compact">
            <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Andor Fan Legend Creation</v-app-bar-title>

            <v-btn icon="mdi-cog">
                <v-tooltip activator="parent" >
                        Tooltip
                </v-tooltip>
            </v-btn>
            <template v-slot:append>
                <v-btn icon="mdi-cog"  @click="handleSettings"></v-btn>
                <SettingsView :dialog="dialog" ref="modal" @update:dialog="updateSettingDialog"></SettingsView><!---->
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            expand-on-hover rail permanent >
            <v-list>
                <v-list-item prepend-icon="mdi-invoice-plus-outline"
                    @click="newBlankLegend">
                    <v-list-item-title>{{ $t('blankNew') }}</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-invoice-text-plus-outline"
                    @click="newSampleLegend">
                    <v-list-item-title>{{ $t('sampleLegend') }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="triggerFileInput"
                    prepend-icon="mdi-file-upload" >
                    <v-list-item-title>{{ $t('loadLegend') }}</v-list-item-title>
                    <input ref="fileInput" type="file" style="display: none" @change="onFileChange" />
                </v-list-item>
                <v-list-item :disabled="!legend.name" @click="saveFile" prepend-icon="mdi-content-save">
                    <v-list-item-title>{{ $t('saveLegend') }}</v-list-item-title>
                </v-list-item>
                <v-list-item :disabled="legend.cards.length == 0" @click="handlePdfPreview" prepend-icon="mdi-file-pdf-box">
                    <v-list-item-title>{{ $t('exportPdfFile') }}</v-list-item-title>
                    <PdfView :dialog="dialogPdfPreview" ref="modalPdfPreview" @update:dialogPdfPreview="updatePdfPreviewDialog"></PdfView>
                </v-list-item>
                <v-list-item prepend-icon="mdi-file-question-outline"
                    @click="handleHowTo">
                    <v-list-item-title>{{ $t('howTo') }}</v-list-item-title>
                    <howToView  :dialog="dialogHowTo" ref="modalHowTo" @update:dialogHowTo="updateHowToDialog"></howToView>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>  
      
        <v-main class="pt-0">
            <MainInfos :legend="legend"></MainInfos>
            <v-container fluid>
                <v-card>
                    <v-tabs v-model="tab" bg-color="primary">
                        <v-tab value="details">{{ $t("tabs.details") }}</v-tab>
                        <v-tab value="download">{{ $t("tabs.download") }}</v-tab>
                        <v-tab value="cards">{{ $t("tabs.cards") }}</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="details">
                                <BasicInfos :legend="legend"></BasicInfos>
                            </v-window-item>

                            <v-window-item value="download">
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="legend.download"
                                        v-bind:label="$t('legendDownloadUrl')"
                                        variant="underlined"
                                        required hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="legend.additionaldownload"
                                        v-bind:label="$t('legendAdditionnalPdf')"
                                        variant="underlined"
                                        required hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-window-item>
                            <v-window-item value="cards">
                                <v-row>
                                    <!--<v-navigation-drawer permanent height="100vh" position="left" >-->
                                    <v-col cols="3" md="3">
                                        <p class="small-radio">
                                            <v-radio-group  v-model="legend.theme" inline label="Thème" name="Theme"> 
                                                <v-radio v-bind:label="$t('classicalTheme')" value="classicalTheme"></v-radio>
                                                <v-radio v-bind:label="$t('frostTheme')" value="frostTheme"></v-radio>
                                            </v-radio-group>
                                        </p>
                                        <v-btn @click="handleNewCard()" prepend-icon="mdi-plus" outline right>{{ $t('newCard') }}</v-btn><br>
                                        
                                        <v-table id="cardList" >
                                            <thead>
                                                <tr>
                                                    <th class="text-left">{{ $t('list.cardName') }}</th>
                                                    <th class="text-left">{{ $t('list.cardAction') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr
                                                v-for="card in legend.cards"
                                                :key="card.id">
                                                <td class="cardName">{{ card.name }}</td>
                                                <td class="cardAction">
                                                    <v-btn size="x-small" density="default" fab dark color="primary"
                                                        @click="handleEdit(card.id)">
                                                        <v-icon small dark>mdi-pencil</v-icon>
                                                    </v-btn>&nbsp;
                                                    <v-btn size="x-small" density="default" color="red"
                                                        @click="handleDelete(card.id)">
                                                        <v-icon  dark>mdi-delete</v-icon>
                                                        <!-- class="mx-1" fab dark density="compact" -->
                                                    </v-btn>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </v-table>
                                    </v-col>
                                    <v-col cols="9" md="9">
                                        <CardsView :cardData="parentCardData" :name="legend.name" :series="legend.series" :number="legend.number" :type="legend.type" :theme="legend.theme" :formDisabled="formDisabled" />
                                    </v-col>
                                </v-row>
                                <!--<v-card-text>
                                <CardsTabs :legend="legend"></CardsTabs>
                                </v-card-text>-->
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-layout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.v-list-item-title {
    text-align:left;
}

.cardAction{
    width:33% !important;
    padding:0px !important;
}

.right{
    height: calc(100%) !important;
}


.small-radio i {
    font-size: 19px;
}
.small-radio label {
    font-size: 14px;
    padding-left: 0px;
    margin-left: -4px;
}
.small-radio .v-radio {
    padding: 0px;
}
.small-radio [class*="__ripple"] {
    left: 0;
}
</style>