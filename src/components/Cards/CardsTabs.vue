<script setup>
    import { ref,defineProps, reactive } from 'vue';
    //import CardsView from "./CardsView"

    const props = defineProps({
    legend: {
        default: () => ({})
    }
    });
    const legend = ref(props.legend);

    let cardData = reactive(null)

    function handleDelete(id) {
      if (window.confirm("Voulez-vous vraiment supprimer cette carte ?")) {
        //this.$store.commit("deleteCard", id);
        console.log("DELETE" + id);
      }
    }

    function handleEdit(id) {
        legend.value.activeCard(id)
        console.log(id);
        return cardData = {
            type: 'letter',
            name: 'A1',
            slug: 'a1',
            text: 'Führt zuerst die Anweisungen auf der **Checkliste** aus.\n\nAnschließend legt ihr zusätzlich folgenden Material neben dem Spielplan bereit:\n* Legt die Hexte, die 15 Kreaturplättchen, den Gegenstand Gibt und 3 schwarze Würfel bereit.\n* Legen **Sternchen auf D, H und N** der Legendenleiste.\n\n*In Andor trug sich eine Geschichte zu, die Ging so:....*\n\nStellt alle Helden auf das Feld **57.**\n\n***\n**Aufgabe:**\nDie Helden müssen die Burg verteidigen und den **die Dunkelheit** daran hindern, alle Bauern zu verschlingen bevor der Erzähler den Buchstaben **Feld H** erreicht hat.\n***',
            id: 1
        }  
      //this.$store.com²mit("editCard", id);
    }
</script>
<template>
        <v-layout>
            <v-navigation-drawer permanent height="100vh" position="left" >
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
                                @click="handleEdit(card.id, cardData)">
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
            </v-navigation-drawer>
            <v-main>
                <!--<CardsView/>-->
            </v-main>
        </v-layout>

</template>

<style>
.v-navigation-drawer{
    background-color: #f8f8f8;
    width:280px;
    height: 800px;
}
.cardName{
    text-align: left;
}
.cardAction{
    padding:0;
    text-align:right;
}
#cardList .v-btn{
    min-width: 0px;
    width: 30px;
    height: 30px;
}
</style>