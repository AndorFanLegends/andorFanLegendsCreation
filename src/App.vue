<script setup>
    import {ref} from 'vue'
    import MainInfos from  "./components/MainInfos/MainInfos";
    import BasicInfos from "./components/BasicInfos/BasicInfos";
//    import CardsTabs from "./components/Cards/CardsTabs"
    import CardsView from "./components/Cards/CardsView";
    const drawer = ref(true)
    const tab = ref(null)

    //import { storeToRefs} from 'pinia'; 
    import {useLegendStore} from './stores/legend';
    //const legendStore = useLegendStore();
    //const legend = storeToRefs(legendStore);

    //const legendData = useLegendStore()
    const legend = useLegendStore().getLegend
    //const {legend} = storeToRefs(useLegendStore())
    //const legend = reactive(legendData.legend)
    //const legend = legendObj.value
    //let legend = store.legend
    //store.legends = store.loadLegends2()
    //let legend = store.getLegend

    //let cardData = reactive()
    function handleEdit(id) {
        console.log(id);
        //legend.value.activeCard(id)
        /*return cardData = {
            type: 'letter',
            name: 'A1',
            slug: 'a1',
            text: 'Führt zuerst die Anweisungen auf der **Checkliste** aus.\n\nAnschließend legt ihr zusätzlich folgenden Material neben dem Spielplan bereit:\n* Legt die Hexte, die 15 Kreaturplättchen, den Gegenstand Gibt und 3 schwarze Würfel bereit.\n* Legen **Sternchen auf D, H und N** der Legendenleiste.\n\n*In Andor trug sich eine Geschichte zu, die Ging so:....*\n\nStellt alle Helden auf das Feld **57.**\n\n***\n**Aufgabe:**\nDie Helden müssen die Burg verteidigen und den **die Dunkelheit** daran hindern, alle Bauern zu verschlingen bevor der Erzähler den Buchstaben **Feld H** erreicht hat.\n***',
            id: 1
        }*/  
      //this.$store.com²mit("editCard", id);
    }
    function handleDelete(id) {
      if (window.confirm("Voulez-vous vraiment supprimer cette carte ?")) {
        //this.$store.commit("deleteCard", id);
        console.log("DELETE" + id);
      }
    }

    const file = ref(null);
    const fileInput = ref(null);
    //const triggerFileInput = () => { fileInput.value.click(); }; 
    // const onFileChange = (event) => { file.value = event.target.files[0]; // Vous pouvez ajouter du code ici pour gérer le fichier téléchargé };
    function triggerFileInput() {
        //this.$refs.fileInput.click();
        fileInput.value.click(); 
    } 
    
    function onFileChange(event) {
        file.value = event.target.files[0];
        console.log(file.value)
        // Vous pouvez ajouter du code ici pour gérer le fichier téléchargé
    }
    /*function loadFile(e) {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = e => {
            const newState = JSON.parse(e.target.result);
            if (!this.validateJson(newState)) {
                return window.alert("Erreur lors du chargement du fichier : Not valid Json");
            }
            this.$store.commit("loadState", newState);
            };
            // Start reading file
            reader.readAsText(file);
        } catch (e) {
            window.alert("Erreur lors du chargement du fichier (1520)");
        }
    }*/
</script>

<template>
    <v-layout>
        <v-app-bar
            color="primary"
            density="compact"
        >
            <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Andor Fan Legend Creation</v-app-bar-title>

            <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            expand-on-hover
            rail
            permanent
            >
            <v-list>
                <v-list-item
                    prepend-icon="mdi-invoice-plus-outline"
                    title="New"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-invoice-text-plus-outline"
                    title="New Sample"
                ></v-list-item>
                <v-list-item @click="triggerFileInput"
                    prepend-icon="mdi-file-upload" >
                    <v-list-item-content> <v-list-item-title>Charger</v-list-item-title> </v-list-item-content>
                </v-list-item>
                <input ref="fileInput" type="file" style="display: none" @change="onFileChange" />
                <v-list-item
                    prepend-icon="mdi-content-save"
                    title="Enregistrer"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>  
      
        <v-main class="pt-0">
            <MainInfos :legend="legend"></MainInfos>
            <v-container fluid>
                <v-card>
                    <v-tabs
                    v-model="tab"
                    bg-color="primary"
                    >
                    <v-tab value="details">Détails</v-tab>
                    <v-tab value="download">Download</v-tab>
                    <v-tab value="cards">Cartes</v-tab>
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
                                    label="Legend Download URL"
                                    variant="underlined"
                                    required hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="legend.additionaldownload"
                                    label="In-App Additionnal Pdf"
                                    variant="underlined"
                                    required hide-details
                                ></v-text-field>
                            </v-col>
                        </v-window-item>
                        <v-window-item value="cards">
                            <v-row>
                            <!--<v-navigation-drawer permanent height="100vh" position="left" >-->
                            <v-col cols="3" md="3">
                                <v-btn  prepend-icon="mdi-plus" outline right>Nouvelle carte</v-btn><br>
                                
                                <v-table id="cardList" >
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="card in legend.cards"
                                        :key="card.id">
                                        <td class="cardName">{{ card.name }}</td>
                                        <td class="cardAction">
                                            <v-btn class="mx-2" small fab  dark density="compact" color="primary"
                                                @click="handleEdit(card.id)">
                                                <v-icon small dark>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn fab  dark density="compact" small color="red"
                                                @click="handleDelete(card.id)">
                                                <v-icon small dark>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                            <v-col cols="8" md="8">
                                    <CardsView/>
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
</style>