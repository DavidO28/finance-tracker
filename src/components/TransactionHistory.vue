<template>
  <v-container v-show="sortedTransactions.length > 0">
    <v-card>
      <h3 class="mb-3">History</h3>
      <ul>
        <li
          v-for="transaction in sortedTransactions"
          :style="{ color: transaction.amount < 0 ? '#FF0000' : '#40FF40' }"
        >
          {{ transaction.text }}
          <span>${{ transaction.amount }}</span>
        </li>
      </ul>
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
