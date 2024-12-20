<template>
  <h2>
    Your balance is :
    {{
      transactionStore.total > 0
        ? transactionStore.total
        : 0
    }}
  </h2>
</template>

<script setup lang="ts">
  import { useTransactionStore } from '@/store/transaction'

  const transactionStore = useTransactionStore()
</script>
