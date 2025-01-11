<script setup>
    import { ref, watch, defineProps, defineEmits } from 'vue';
    import { marked } from 'marked';
    import {markedAndor} from "andor-legendcard/markedAndor";

    // UI
    const props = defineProps({ dialog: Boolean });
    const emit = defineEmits(['update:dialogHowTo']);
    const dialog = ref(props.dialog);
    watch(() => props.dialog, (newVal) => { dialog.value = newVal; });

    function closeDialog() {
        dialog.value = false;
        emit('update:dialogHowTo', false);
    }

    // marked
    marked.use({
        gfm: true,
        breaks: true,
        silent: true,
    });
    marked.use(markedAndor());
</script>

<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
        <v-card>
            <v-toolbar density="compact" :elevation="8">
                <v-toolbar-title>How To</v-toolbar-title>
                <v-btn icon @click="closeDialog"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row justify="center"> 
                    <v-col cols="12" md="6">

                        <h2>Available Markdowns</h2>
                        <v-table>
                            <thead>
                            <tr>
                                <th class="text-left font-weight-bold">Use</th>
                                <th class="text-left font-weight-bold">Markdown</th>
                                <th class="text-left font-weight-bold">Rendered Output</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bold : To bold text, add two asterisks or underscores before and after a word or phrase.</td>
                                    <td>Put a **Gor** in case **39**</td>
                                    <td v-html="marked('Put a **Gor** in case **39**')"></td>
                                </tr>
                                <tr>
                                    <td>Italic : .</td>
                                    <td>*Once upon a time, in andor*</td>
                                    <td v-html="marked('*Once upon a time, in andor*')"></td>
                                </tr>
                                <tr>
                                    <td>Separator</td>
                                    <td>***</td>
                                    <td v-html="marked('***')"></td>
                                </tr>
                                <tr>
                                    <td>Blockquote</td>
                                    <td>></td>
                                    <td v-html="marked('>')"></td>
                                </tr>
                                <tr>
                                    <td>Dices</td>
                                    <td>:D1: :D2: :D3: :D4: :D5: :D6:</td>
                                    <td v-html="marked(':D1: :D2: :D3: :D4: :D5: :D6:')"></td>
                                </tr>
                                <tr>
                                    <td>Black Dices</td>
                                    <td>:DN6: :DN8: :DN10: :DN12:</td>
                                    <td v-html="marked(':DN6: :DN8: :DN10: :DN12:')"></td>
                                </tr>
                                <tr>
                                    <td>Players</td>
                                    <td>:2P: / :3P: / :4P: </td>
                                    <td v-html="marked(':2P: / :3P: / :4P:')"></td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-spacer><br></v-spacer>
                        <h2>Some composite examples</h2>
                        <h3>Dice choices</h3>
                        <br>
                        > :D1: :D2: :D3: **falcon**<br>
                        Get the falcon<br>
                        <br>
                        <div v-html="marked('> :D1: :D2: :D3: **falcon**\
                        / <br>Get the falcon')"></div>
                        <v-spacer><br></v-spacer>
                        <h3>Missions</h3>

                        ***<br>
                        ** Mission :**<br>
                        Text for mission<br>
                        ***<br>
                        <br>
                        <div v-html="marked('***\n**Mission :**\nText for mission\n***')"></div>
                        <v-spacer><br></v-spacer>
                        <h2>How request for adding your legend to the Legends App (<a href="https://andorfanlegends.web.app/">link</a>)</h2>
                        After create or update a Legend, then save it in json format.<br>
                        So,
                        <p>
                            <b>For new legend</b>, create new issue in <a href="https://github.com/dchansel/andorFanLegends">dchansel/andorFanLegends</a> with [New Legend] Your Legend Title<br>  
                            Link : <a href="https://github.com/dchansel/andorFanLegends/issues/new?title=[New Legend]">New Legend</a><br>
                            Don't forget to add the legend <b>Language</b> in description, and other necessary information.<br>
                            Then attach the Json File to the issue, and submit.
                        </p>
                        <v-spacer><br></v-spacer>
                        <p>
                            <b>For update legend</b>, create new issue in <a href="https://github.com/dchansel/andorFanLegends">dchansel/andorFanLegends</a> with [Update Legend] Your Legend Title<br>
                            Link : <a href="https://github.com/dchansel/andorFanLegends/issues/new?title=[Update Legend]">Update Legend</a><br>
                            Don't forget to add the legend <b>Language</b> in description, and other necessary information.<br>
                            Then attach the Json File to the issue, and submit.
                        </p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style>
hr {
  overflow: visible;
  padding: 0;
  border: none;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  padding-top: 1px;
}
.marked-andor-img {
  height: 18px;
  vertical-align: sub;
}
blockquote {
  border-radius : 5px;
  border: 1px solid #000000;
  margin: 5px 0 0;
  background: rgb(252,224,135);
  background: linear-gradient(180deg, rgba(252,224,135,1) 0%, rgba(253,247,214,1) 100%);
  padding: 5px;
}
</style>