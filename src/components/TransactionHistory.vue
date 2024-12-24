<template>
  <v-container v-show="sortedTransactions.length > 0">
    <v-card class="pa-7">
      <h3 class="mb-3">Transaction history</h3>
      <v-list>
        <v-list-item
          v-for="transaction in sortedTransactions"
          :style="{ color: transaction.amount < 0 ? '#FF0000' : '#40FF40' }"
        >
          <span class="d-flex flex-row align-center justify-center">
            {{ transaction.text }} ${{ transaction.amount }}
            <v-icon
              class="ms-3"
              @click="transactionStore.deleteTransaction(transaction.id)"
            >
              mdi-delete
            </v-icon>
          </span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()

  const sortedTransactions = computed(() => {
    return [...transactionStore.transactions].reverse()
  })
</script>
