<template>
  <div v-show="transactionStore.transactions.length > 0">
    <h3>History</h3>
    <ul>
      <li
        v-for="transaction in transactionStore.transactions"
        :style="{ color: transaction.amount < 0 ? '#FF0000' : '#40FF40' }"
      >
        {{ transaction.text }}
        <span>${{ transaction.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()
</script>
