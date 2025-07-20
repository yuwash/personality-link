<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getPlaceName, getInteractionName } from './utils/vocabulary';
import {
  type Statement,
  serializePersonalityLink,
  deserializePersonalityLink,
  addStatement,
  removeStatement,
  moveStatementUp,
  moveStatementDown,
} from './utils/personalityLink';
import SelectionForm from './Selection.vue';

const { t } = useI18n();

// Reactive state
const statements = ref<Statement[]>([]);

// Computed properties
const serializedData = computed(() =>
  serializePersonalityLink(statements.value)
);
const shareUrl = computed(() => {
  const baseUrl = window.location.origin + window.location.pathname;
  return serializedData.value ? `${baseUrl}#${serializedData.value}` : baseUrl;
});

// Methods
function handleAdd(selectedPlace: string, selectedInteraction: string) {
  statements.value = addStatement(
    statements.value,
    selectedPlace,
    selectedInteraction
  );
}

function handleRemove(index: number) {
  statements.value = removeStatement(statements.value, index);
}

function handleMoveUp(index: number) {
  statements.value = moveStatementUp(statements.value, index);
}

function handleMoveDown(index: number) {
  statements.value = moveStatementDown(statements.value, index);
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

// Lifecycle hooks
onMounted(() => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    statements.value = deserializePersonalityLink(hash);
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
              :disabled="statements.length === 0"
            >
              {{ t('labels.share') }}
            </b-button>
          </b-navbar-item>
        </template>
      </b-navbar>

      <SelectionForm @add-statement="handleAdd" />

      <!-- Statements List -->
      <div class="box" v-if="statements.length > 0">
        <div
          v-for="(statement, index) in statements"
          :key="`${statement.placeId}-${statement.interactionId}`"
          class="level is-mobile"
          style="margin-bottom: 1rem"
        >
          <div class="level-left">
            <div class="level-item">
              <span class="tag is-large is-primary">{{ index + 1 }}</span>
            </div>
            <div class="level-item">
              <div>
                <strong>{{ getPlaceName(statement.placeId) }}</strong>
                <br />
                <span class="has-text-grey">{{
                  getInteractionName(statement.interactionId)
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
                    :disabled="index === statements.length - 1"
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
        <p class="has-text-grey">{{ t('labels.noStatements') }}</p>
      </div>
    </div>
  </div>
</template>
