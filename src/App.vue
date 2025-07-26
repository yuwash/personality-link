<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  type Statement,
  serializePersonalityLink,
  deserializePersonalityLink,
  addStatement,
} from './utils/personalityLink';
import SelectionForm from './Selection.vue';
import StatementsList from './StatementsList.vue';

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
      <StatementsList :statements="statements" @update:statements="statements = $event" />
    </div>
  </div>
</template>
