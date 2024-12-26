<script setup>
    import {ref} from 'vue';
    import { saveAs } from "file-saver";
    import MainInfos from  "./components/MainInfos/MainInfos";
    import BasicInfos from "./components/BasicInfos/BasicInfos";
    import CardsView from "./components/Cards/CardsView";

    const drawer = ref(true)
    const tab = ref(null)

    import {useLegendStore} from './stores/legend';
    const legend = useLegendStore().getLegend

    const parentCardData = ref({
                type: 'put',
                name: 'Der Handel',
                slug: 'der-handel',
                text: '*Wie so oft begab es sich, dass Garzwog den Helden einen Handel anbot.*\nJedem Helden ist es nun einmalig möglich **2 Stärkepunkte** im tausch gegen **6 Gold** zu erhalten.\n',
                id: 4
            });

    function handleNewCard() {
        //this.$store.commit("addCard");
        legend.addNewCard()
    }

    function handleEdit(id) {
        legend.activeCard(id);
        parentCardData.value = legend.cards.find(
            i => i.id === legend.newCardOpenIndex
        );
    }

    function handleDelete(id) {
        if (window.confirm("Voulez-vous vraiment supprimer cette carte ?")) {
            legend.deleteCard(id);
            legend.activeCard(1)
            parentCardData.value = legend.cards[0];/*.find(
                i => i.id === legend.newCardOpenIndex
            );*/
        }
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
                legend.$state = newState
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
      const blob = new Blob([JSON.stringify(legend.$state)], {
        type: "application/json"
      });
      saveAs(blob, legend.$state.slug);
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

            <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            expand-on-hover rail permanent >
            <v-list>
                <v-list-item prepend-icon="mdi-invoice-plus-outline"
                    title="New"
                ></v-list-item>
                <v-list-item prepend-icon="mdi-invoice-text-plus-outline"
                    title="New Sample"
                ></v-list-item>
                <v-list-item @click="triggerFileInput"
                    prepend-icon="mdi-file-upload" >
                    <v-list-item-content> <v-list-item-title>Charger</v-list-item-title> </v-list-item-content>
                </v-list-item>
                <input ref="fileInput" type="file" style="display: none" @change="onFileChange" />
                <v-list-item @click="saveFile" prepend-icon="mdi-content-save"
                    title="Enregistrer"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>  
      
        <v-main class="pt-0">
            <MainInfos :legend="legend"></MainInfos>
            <v-container fluid>
                <v-card>
                    <v-tabs v-model="tab" bg-color="primary">
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
                                <v-col cols="4" md="4">
                                    <v-btn @click="handleNewCard()" prepend-icon="mdi-plus" outline right>Nouvelle carte</v-btn><br>
                                    
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
                                        <CardsView :cardData="parentCardData"/>
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