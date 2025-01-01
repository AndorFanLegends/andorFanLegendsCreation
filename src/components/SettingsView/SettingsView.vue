<script setup>
    import { ref, watch, defineProps, defineEmits } from 'vue';
    import {useSettingsStore} from './../../stores/settings.js';
    import options from './../../options';
    
    const props = defineProps({ dialog: Boolean });
    const emit = defineEmits(['update:dialog']);
    const dialog = ref(props.dialog);
    watch(() => props.dialog, (newVal) => { dialog.value = newVal; });
    /*const closeDialog = () => {
        dialog.value = false;
        emit('update:dialog', false);
    };*/

    const store = useSettingsStore();
    const previousLanguage = store.activeLanguage;
    let selectedLng = ref(store.activeLanguage);

    function languageRadioHandler(newLanguage) {
        store.activeLanguage = newLanguage
    }
    function applySettings() {
        //router.push(`/`).then(() => { router.go() });
        location.reload();
    }
    function cancelSettings() {
        store.activeLanguage = previousLanguage;
        dialog.value = false;
        emit('update:dialog', false);
        //router.push(`/`);
    }

    /* eslint-disable */
    /*import {useSettingsStore} from './../../stores/settings.js';
    import {reactive, ref} from 'vue';
    import options from './../../options';
    
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const store = useSettingsStore();
    const previousLanguage = store.activeLanguage;
    let selectedLng = ref(store.activeLanguage);

    function languageRadioHandler(newLanguage) {
        store.activeLanguage = newLanguage
    }
    function applySettings() {
        router.push(`/`).then(() => { router.go() });
    }
    function cancelSettings() {
        store.activeLanguage = previousLanguage
        router.push(`/`);
    }*/
</script>


<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
        <v-card>
            <v-card-title class="headline">Paramètres</v-card-title>
            <v-card-text>
                <v-container>
                    <section class="page">
                        <v-row class="center">
                            <v-col>
                                <p class="text-h5">{{ $t("settings.availableLanguages") }}</p>
                                <v-radio-group  v-model="selectedLng" mandatory>
                                    <v-radio v-for="languageOpt in options.availableLanguagesOptions"
                                        :label="languageOpt.name"
                                        :key="languageOpt.key"
                                        :value="languageOpt.key"
                                        @change="languageRadioHandler(languageOpt.key)"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </section>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo-darken-3" text @click="applySettings" size="x-large" variant="flat">{{ $t("settings.apply") }}</v-btn>
                <v-btn color="blue darken-1" text @click="cancelSettings" size="x-large" variant="flat">{{ $t("settings.cancel") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<!--
<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
    <v-container>
    <section class="page">
        <v-row class="center">
            <v-col >
                <p class="text-h5">{{ $t("settings.availableLanguages") }}</p>
                <v-radio-group  v-model="selectedLng" mandatory>
                    <v-radio v-for="languageOpt in options.availableLanguagesOptions"
                        :label="languageOpt.name"
                        :key="languageOpt.key"
                        :value="languageOpt.key"
                        @change="languageRadioHandler(languageOpt.key)"
                    ></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <v-btn block class="text-none mb-4" color="indigo-darken-3" size="x-large" variant="flat"
            @click="applySettings">
            {{ $t("settings.apply") }}
        </v-btn>
        <v-btn block class="text-none" color="grey-lighten-3" size="x-large" variant="flat"
            @click="cancelSettings">
            {{ $t("settings.cancel") }}
        </v-btn>
    </section>
    </v-container>
</v-dialog>
</template>
-->

<style>
.page {
    margin: 2rem;
}

.text-h5{
    margin:15px 0 0 0;
}

.v-bottom-navigation .v-bottom-navigation__content > .v-btn {
    max-width: 100%;
}
</style>