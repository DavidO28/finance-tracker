import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { transaction } from '@/types'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<transaction[]>([])
  
  const total = computed(() => {
    return transactions.value.reduce((sum, t) => sum + t.amount, 0)
  })

  return {
    transactions,
    total,
  }
})
