<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { PLACES, INTERACTIONS } from './utils/vocabulary';

const { t } = useI18n();

const selectedPlace = ref('');
const selectedInteraction = ref('');

const canAdd = computed(() => selectedPlace.value && selectedInteraction.value);

const emit = defineEmits(['add-selection']);

function handleAdd() {
  if (!canAdd.value) return;
  emit('add-selection', selectedPlace.value, selectedInteraction.value);
  selectedPlace.value = '';
  selectedInteraction.value = '';
}
</script>

<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <b-field :label="t('labels.selectPlace')">
          <b-select
            v-model="selectedPlace"
            :placeholder="t('labels.selectPlace')"
            expanded
          >
            <option
              v-for="place in PLACES"
              :key="place.id"
              :value="place.id"
            >
              {{ t(place.key) }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field :label="t('labels.selectInteraction')">
          <b-select
            v-model="selectedInteraction"
            :placeholder="t('labels.selectInteraction')"
            expanded
          >
            <option
              v-for="interaction in INTERACTIONS"
              :key="interaction.id"
              :value="interaction.id"
            >
              {{ t(interaction.key) }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-narrow">
        <b-field label=" ">
          <b-button
            type="is-success"
            icon-left="plus"
            @click="handleAdd"
            :disabled="!canAdd"
          >
            {{ t('labels.add') }}
          </b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>
