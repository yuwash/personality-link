<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { PLACES, INTERACTIONS } from './utils/vocabulary';
import {
  type Selection,
  serializePersonalityLink,
  deserializePersonalityLink,
  addSelection,
  removeSelection,
  moveSelectionUp,
  moveSelectionDown,
} from './utils/personalityLink';

const { t } = useI18n();

// Reactive state
const selectedPlace = ref('');
const selectedInteraction = ref('');
const selections = ref<Selection[]>([]);

// Computed properties
const serializedData = computed(() =>
  serializePersonalityLink(selections.value)
);
const shareUrl = computed(() => {
  const baseUrl = window.location.origin + window.location.pathname;
  return serializedData.value ? `${baseUrl}#${serializedData.value}` : baseUrl;
});

const canAdd = computed(() => selectedPlace.value && selectedInteraction.value);

// Methods
function handleAdd() {
  if (!canAdd.value) return;

  selections.value = addSelection(
    selections.value,
    selectedPlace.value,
    selectedInteraction.value
  );

  // Reset selections
  selectedPlace.value = '';
  selectedInteraction.value = '';
}

function handleRemove(index: number) {
  selections.value = removeSelection(selections.value, index);
}

function handleMoveUp(index: number) {
  selections.value = moveSelectionUp(selections.value, index);
}

function handleMoveDown(index: number) {
  selections.value = moveSelectionDown(selections.value, index);
}

async function handleShare() {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    // You could add a toast notification here with Buefy
    alert(t('labels.linkCopied'));
  } catch (error) {
    alert(t('labels.copyFailed'));
  }
}

function getPlaceName(placeId: string): string {
  const place = PLACES.find((p) => p.id === placeId);
  return place ? t(place.key) : placeId;
}

function getInteractionName(interactionId: string): string {
  const interaction = INTERACTIONS.find((i) => i.id === interactionId);
  return interaction ? t(interaction.key) : interactionId;
}

// Lifecycle hooks
onMounted(() => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    selections.value = deserializePersonalityLink(hash);
  }
});

// Watch for changes and update URL
watch(serializedData, (newData) => {
  const newHash = newData ? `#${newData}` : '';
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', window.location.pathname + newHash);
  }
});
</script>

<template>
  <div class="container">
    <div class="section">
      <b-navbar>
        <template #brand>
          <b-navbar-item>
            <div>
              <h1 class="title">{{ t('title') }}</h1>
              <p class="subtitle">{{ t('subtitle') }}</p>
            </div>
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item>
            <b-button
              type="is-primary"
              icon-left="share"
              @click="handleShare"
              :disabled="selections.length === 0"
            >
              {{ t('labels.share') }}
            </b-button>
          </b-navbar-item>
        </template>
      </b-navbar>

      <!-- Selection Form -->
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

      <!-- Selections List -->
      <div class="box" v-if="selections.length > 0">
        <div
          v-for="(selection, index) in selections"
          :key="`${selection.placeId}-${selection.interactionId}`"
          class="level is-mobile"
          style="margin-bottom: 1rem"
        >
          <div class="level-left">
            <div class="level-item">
              <span class="tag is-large is-primary">{{ index + 1 }}</span>
            </div>
            <div class="level-item">
              <div>
                <strong>{{ getPlaceName(selection.placeId) }}</strong>
                <br />
                <span class="has-text-grey">{{
                  getInteractionName(selection.interactionId)
                }}</span>
              </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field class="has-addons">
                <p class="control">
                  <b-button
                    size="is-small"
                    icon-right="arrow-up-thick"
                    @click="handleMoveUp(index)"
                    :disabled="index === 0"
                    :title="t('labels.moveUp')"
                  />
                </p>
                <p class="control">
                  <b-button
                    size="is-small"
                    icon-right="arrow-down-thick"
                    @click="handleMoveDown(index)"
                    :disabled="index === selections.length - 1"
                    :title="t('labels.moveDown')"
                  />
                </p>
                <p class="control">
                  <b-button
                    size="is-small"
                    type="is-danger"
                    icon-right="delete"
                    @click="handleRemove(index)"
                    :title="t('labels.remove')"
                  />
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="box has-text-centered" v-else>
        <p class="has-text-grey">{{ t('labels.noSelections') }}</p>
      </div>
    </div>
  </div>
</template>
