<template>
  <h2>Your balance is: ${{ transactionStore.total }}</h2>
</template>

<script setup lang="ts">
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()
</script>
