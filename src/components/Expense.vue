<template>
  <h3>Total expense: ${{ Math.abs(transactionStore.expense) }}</h3>
</template>

<script setup lang="ts">
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()
</script>

<style scoped>
  h3 {
    color: #ff0000;
  }
</style>
