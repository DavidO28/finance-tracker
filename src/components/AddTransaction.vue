<template>
  <v-container>
    <v-card class="pa-7">
      <v-row class="mb-3 d-flex justify-center">
        <v-btn
          size="small"
          class="me-5 mb-3"
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
          <v-btn type="submit">
            {{ transactionType ? 'Add expense' : 'Add income' }}
          </v-btn>
        </v-form>
        <!-- Error Snackbar -->
        <Snackbar
          v-model="errorState"
          :message="errorMessage"
          type="error"
        />

        <!-- Success Snackbar -->
        <Snackbar
          v-model="successState"
          message="Transaction added!"
          type="success"
        />
      </v-col>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useTransactionStore } from '@/store/transaction'
  import type { transaction } from '@/types'
  import Snackbar from '@/components/Snackbar.vue'

  const transactionStore = useTransactionStore()

  const localText = ref<string>('')
  const localAmount = ref<string>('')
  const transactionType = ref<boolean>(false)
  const errorState = ref<boolean>(false)
  const successState = ref<boolean>(false)
  const errorMessage = ref<string>('')

  const handleSubmit = () => {
    if (localText.value!.length === 0 || localAmount.value!.length === 0) {
      errorState.value = true
      return (errorMessage.value = "Empty field can't be added")
    }

    const amount = localAmount.value === '' ? 0 : parseFloat(localAmount.value)

    const newTransaction: transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: localText.value,
      amount: transactionType.value ? -amount : amount,
    }
    console.log(newTransaction)

    transactionStore.transactions.push(newTransaction)

    localText.value = ''
    localAmount.value = ''

    successState.value = true
  }

  const switchTransactionType = () => {
    transactionType.value = !transactionType.value
  }
</script>
