<template>
  <v-container
    class="d-flex flex-column justify-center text-center"
    max-width="1000px"
  >
    <Header />
    <Balance />
    <v-container>
      <Income />
      <Expense />
    </v-container>
    <AddTransaction />
    <TransactionHistory />
  </v-container>
</template>

<script setup lang="ts">
  import Header from '@/components/Header.vue'
  import Balance from '@/components/Balance.vue'
  import Income from '@/components/Income.vue'
  import Expense from '@/components/Expense.vue'
  import AddTransaction from '@/components/AddTransaction.vue'
  import TransactionHistory from '@/components/TransactionHistory.vue'
</script>
