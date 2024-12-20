<template>
  <Header />
  <Balance />
  <div>
    <Income />
    <Expense />
  </div>
  <AddTransaction />
</template>

<script setup lang="ts">
  import Header from '@/components/Header.vue'
  import Balance from '@/components/Balance.vue'
  import Income from '@/components/Income.vue'
  import Expense from '@/components/Expense.vue'
  import AddTransaction from '@/components/AddTransaction.vue'
</script>
