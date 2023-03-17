<template>
  <el-table ref="multipleTableRef" :data="tableData.rows" style="width: 100%">
    <el-table-column property="name" label="name" width="120" />
    <el-table-column property="family" label="family" width="120" />
    <el-table-column property="genus" label="genus" width="120" />
    <el-table-column property="order" label="order" show-overflow-tooltip />
    <el-table-column property="carbohydrates" label="carbohydrates" width="120" />
    <el-table-column property="protein" label="protein" width="120" />
    <el-table-column property="fat" label="fat" width="120" />
    <el-table-column property="calories" label="calories" width="120" />
    <el-table-column property="sugar" label="sugar" show-overflow-tooltip />
    <el-table-column label="action" show-overflow-tooltip>
      <template v-slot="scope">
        <el-button v-if="scope.row.name != 'SUM'" type="danger" @click="handleRemove(scope.row)">Remove</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import type { Fruit } from '@/interfaces'
import { ref } from '@vue/runtime-dom'
import type { ElTable } from 'element-plus'
import axios from '../utils/axios'
import { urls } from '@/services/settings'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'PageFruit',
  data() {
    return {
      totalRows: 0,
      tableData: {
        rows: [] as Fruit[]
      },
      multipleTableRef: ref<InstanceType<typeof ElTable>>()
    }
  },

  methods: {
    async loadTableData() {
      try {
        const data = (await axios.get(`${urls.fruit.favorites}`)).data
        this.totalRows = data['hydra:totalItems']
        this.tableData.rows = data['hydra:member']
        let sum: Fruit = {
          name: 'SUM',
          family: '',
          genus: '',
          fruit_order: '',
          carbohydrates: 0,
          fat: 0,
          protein: 0,
          calories: 0,
          sugar: 0
        }
        this.tableData.rows.map((item: Fruit, index: number) => {
          sum.calories += item.calories
          sum.carbohydrates += item.carbohydrates
          sum.fat += item.fat
          sum.protein += item.protein
          sum.sugar += item.sugar
        })
        this.tableData.rows.push(sum)
      } catch (error) {
        this.tableData.rows = []
      }
    },
    handleRemove(data: Fruit) {
      this.removeFromFavorite(data)
    },
    removeFromFavorite(data: Fruit) {
      axios
        .put(`${urls.fruit.update}/${data.id}`, {
          ...this.parseForm(data), isFavorite: false
        })
        .then((response) => {
          toast.success("Removed from favorites successfully!", {
            autoClose: 1000
          })
          this.loadTableData()
        })
        .catch((err) => {})
    },
    parseForm(form: Fruit) {
      return {
        name: form.name,
        family: form.family,
        genus: form.genus,
        fruitOrder: form.fruitOrder,
        isFavorite: form.isFavorite,
        carbohydrates: parseFloat(form.carbohydrates),
        protein: parseFloat(form.protein),
        fat: parseFloat(form.fat),
        calories: parseFloat(form.calories),
        sugar: parseFloat(form.sugar),
      }
    }
  },
  mounted() {
    this.loadTableData()
      .then((response: any) => {
        console.log(response)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
</script>
