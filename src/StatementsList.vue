<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { getPlaceName, getInteractionName } from './utils/vocabulary';
import {
  type Statement,
  removeStatement,
  moveStatementUp,
  moveStatementDown,
} from './utils/personalityLink';

const { t } = useI18n();

const props = defineProps<{ statements: Statement[] }>();
const emit = defineEmits<{
  (e: 'update:statements', statements: Statement[]): void;
}>();

// Methods
function handleRemove(index: number) {
  const newStatements = removeStatement(props.statements, index);
  emit('update:statements', newStatements);
}

function handleMoveUp(index: number) {
  const newStatements = moveStatementUp(props.statements, index);
  emit('update:statements', newStatements);
}

function handleMoveDown(index: number) {
  const newStatements = moveStatementDown(props.statements, index);
  emit('update:statements', newStatements);
}
</script>

<template>
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
            <strong>{{ getPlaceName(t, statement.placeId) }}</strong>
            <br />
            <span class="has-text-grey">{{
              getInteractionName(t, statement.interactionId)
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
</template>
