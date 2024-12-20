<template>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="localText"
        type="text"
        placeholder="Text"
      />
      <input
        v-model="localAmount"
        type="number"
        placeholder="Amount"
      />
      <button type="submit">Add new transaction</button>
    </form>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'
    import { useTransactionStore } from '@/store/transaction'
    import type { transaction } from '@/types'
  
    const transactionStore = useTransactionStore()
  
    const localText = ref<string>('') 
    const localAmount = ref<string>('')
  
    const handleSubmit = () => {
      const amount = localAmount.value === '' ? 0 : parseFloat(localAmount.value)

      const newTransaction: transaction = {
        text: localText.value,
        amount: amount,
      }
  
      transactionStore.transactions.push(newTransaction)
  
      localText.value = ''
      localAmount.value = ''
    }
  </script>
  