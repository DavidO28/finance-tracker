<template>
  <h3 :style="{ color: transactionType ? '#FF0000' : '#40FF40' }">
    {{ transactionType ? 'Adding expense' : 'Adding income' }}
    <button @click="switchTransactionType">
      <img
        src="../assets/switcher.png"
        alt="transaction switcher"
      />
    </button>
  </h3>
  <form
    @submit.prevent="handleSubmit"
    :style="{ background: transactionType ? '#FF0000' : '#40FF40' }"
  >
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
  const transactionType = ref<boolean>(false)

  const handleSubmit = () => {
    const amount = localAmount.value === '' ? 0 : parseFloat(localAmount.value)

    const newTransaction: transaction = {
      text: localText.value,
      amount: transactionType.value ? -amount : amount,
    }

    transactionStore.transactions.push(newTransaction)

    localText.value = ''
    localAmount.value = ''
  }

  const switchTransactionType = () => {
    transactionType.value = !transactionType.value
  }
</script>

<style scoped>
  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
</style>
