<template>
  <v-container v-show="sortedTransactions.length > 0">
    <v-card class="pa-7">
      <h3 class="mb-3">Transaction history</h3>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          lines="three"
          v-for="transaction in sortedTransactions"
          :key="transaction.id"
        >
          <div
            class="d-flex flex-column flex-md-row justify-space-between align-center my-2"
          >
            <span class="transaction-description">
              {{ transaction.text }}
            </span>
            <span
              :style="{ color: transaction.amount < 0 ? '#FF0000' : '#40FF40' }"
              class="float-start"
            >
              ${{ transaction.amount }}
            </span>
            <v-btn
              icon="mdi-delete"
              class="mx-3 my-2"
              size="small"
              @click="handleDelete(transaction.id)"
            />
          </div>
          <v-divider></v-divider>
        </v-list-item>
        <!-- Deletion Snackbar -->
        <Snackbar
          v-model="transactionStatus"
          :message="statusMessage"
          type="error"
        />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useTransactionStore } from '@/store/transaction'
  import Snackbar from '@/components/Snackbar.vue'

  const transactionStore = useTransactionStore()

  const transactionStatus = ref<boolean>(false)
  const statusMessage = ref<string>('Transaction deleted')

  const sortedTransactions = computed(() => {
    return [...transactionStore.transactions].reverse()
  })

  const handleDelete = (transactionId: number) => {
    transactionStore.deleteTransaction(transactionId)
    transactionStatus.value = true
  }
</script>

<style scoped>
  .transaction-description {
    word-break: break-all;
    width: 300px;
  }
</style>
