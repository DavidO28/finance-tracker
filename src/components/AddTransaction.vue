<template>
  <v-container>
    <v-card class="pa-7">
      <v-row class="d-flex flex-row align-center mb-3">
        <v-btn
          size="small"
          class="me-5"
          icon="mdi-swap-horizontal"
          @click="switchTransactionType"
        />
        <h3 :style="{ color: transactionType ? '#FF0000' : '#40FF40' }">
          {{ transactionType ? 'Adding expense' : 'Adding income' }}
        </h3>
      </v-row>
      <v-col>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="localText"
            type="text"
            placeholder="Text"
          />
          <v-text-field
            v-model="localAmount"
            type="number"
            inputmode="numeric"
            placeholder="Amount"
          />
          <v-btn type="submit">Add new transaction</v-btn>
        </v-form>
      </v-col>
    </v-card>
  </v-container>
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
