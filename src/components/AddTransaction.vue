<template>
  <v-container>
    <v-card class="pa-7">
      <v-row class="mb-3">
        <v-btn
          size="small"
          class="me-5"
          rounded
          @click="switchTransactionType"
        >
          <v-icon>mdi-swap-horizontal</v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            Change transaction type
          </v-tooltip>
        </v-btn>
        <h3 :style="{ color: transactionType ? '#FF0000' : '#40FF40' }">
          Chosen transaction type: {{ transactionType ? 'Expense' : 'Income' }}
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
          <v-btn type="submit">{{ transactionType ? 'Adding expense' : 'Adding income' }}</v-btn>
        </v-form>
        <v-snackbar
          v-model="errorState"
          timeout="2000"
          rounded="pill"
          color="red"
        >
          <p class="font-bold text-black text-center">
            {{ errorMessage }}
          </p>

          <template v-slot:actions>
            <v-btn
              color="gray"
              variant="text"
              @click="errorState = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
  const errorState = ref<boolean>(false)
  const errorMessage = ref<string>('')

  const handleSubmit = () => {
    if (localText.value!.length === 0 || localAmount.value!.length === 0) {
      errorState.value = true
      return (errorMessage.value = "Empty text can't be added to notes")
    }

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
