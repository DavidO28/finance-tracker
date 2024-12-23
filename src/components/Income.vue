<template>
    <h3>Total income: ${{ transactionStore.income }}</h3>
</template>

<script setup lang="ts">
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()
</script>

<style scoped>
  h3 {
    color: #40ff40;
  }
</style>
