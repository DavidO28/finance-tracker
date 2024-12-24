<template>
  <v-container v-show="sortedTransactions.length > 0">
    <v-card class="pa-7">
      <h3 class="mb-3">Transaction history</h3>
      <v-list>
        <v-list-item
          v-for="transaction in sortedTransactions"
          :key="transaction.id"
        >
          <span
            :style="{ color: transaction.amount < 0 ? '#FF0000' : '#40FF40' }"
          >
            {{ transaction.text }} ${{ transaction.amount }}
          </span>
          <v-btn
            icon="mdi-delete"
            class="ms-3 mb-1"
            size="small"
            @click="handleDelete(transaction.id)"
          />
        </v-list-item>
        <!-- Deletion Snackbar -->
        <Snackbar
          v-model="transactionStatus"
          :message="statusMessage"
          type="error"
        />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useTransactionStore } from '@/store/transaction'
  import Snackbar from '@/components/Snackbar.vue'

  const transactionStore = useTransactionStore()

  const transactionStatus = ref<boolean>(false)
  const statusMessage = ref<string>('Transaction deleted')

  const sortedTransactions = computed(() => {
    return [...transactionStore.transactions].reverse()
  })

  const handleDelete = (transactionId: number) => {
    transactionStore.deleteTransaction(transactionId)
    transactionStatus.value = true
  }
</script>
