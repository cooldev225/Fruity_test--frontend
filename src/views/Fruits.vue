<template>
  <div class="table-header" style="display: flex; justify-content: space-between; margin-bottom: 20px">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="30"
      :total="totalRows"
      @current-change="handlePageChange"
    />
    <div style="display: flex">
      <el-button type="success" @click="handleClickAdd">Add</el-button>
    </div>
  </div>
  <el-table
    ref="multipleTableRef"
    se
    :data="tableData.rows"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="30" />
    <el-table-column property="name" label="name" width="80" />
    <el-table-column property="family" label="family" width="80" />
    <el-table-column property="genus" label="genus" width="100" />
    <el-table-column property="fruitOrder" label="order" show-overflow-tooltip />
    <el-table-column property="carbohydrates" label="carbohydrates" width="120" />
    <el-table-column property="protein" label="protein" width="120" />
    <el-table-column property="fat" label="fat" width="120" />
    <el-table-column property="calories" label="calories" width="120" />
    <el-table-column property="sugar" label="sugar" show-overflow-tooltip />
    <el-table-column label="action" show-overflow-tooltip>
      <template v-slot="scope">
        <el-button type="success" @click="handleAddToFavorite(scope.row)">Add to favorite</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="showAddDialog" title="Add new Fruit" width="500px">
    <add-fruit @onCreate="handleCreateFruit"></add-fruit>
  </el-dialog>
</template>

<script lang="ts">
import type { Fruit } from '@/interfaces'
import { ref } from '@vue/runtime-dom'
import type { ElTable } from 'element-plus'
import axios from '../utils/axios'
import { urls } from '@/services/settings'
import AddFruit from '@/components/Fruit/AddFruit.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'PageFruit',
  data() {
    return {
      totalRows: 0,
      tableData: {
        rows: [] as Fruit[],
      },
      multipleTableRef: ref<InstanceType<typeof ElTable>>(),
      showAddDialog: false
    }
  },
  methods: {
    async loadTableData(page = 1) {
      try {
        const data = (await axios.get(`${urls.fruit.all}?page=${page}`)).data
        this.totalRows = data['hydra:totalItems']
        this.tableData.rows = data['hydra:member']
      } catch (error) {
        this.tableData.rows = []
      }
    },
    handleSelectionChange(e: any) {
      console.log(e)
    },
    handlePageChange(e: any) {
      this.tableData.page = e - 1
      this.loadTableData(e)
    },
    handleClickAdd() {
      this.showAddDialog = true
    },
    handleCreateFruit(data: Fruit[]) {
      this.createFruit(this.parseForm(data))
    },
    handleAddToFavorite(data: Fruit) {
      this.addToFavorite(data)
    },
    createFruit(data: Fruit) {
      axios
        .post(urls.fruit.create, data)
        .then((response) => {
          this.showAddDialog = false
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    addToFavorite(data: Fruit) {
      axios
        .put(`${urls.fruit.update}/${data.id}`, {
          ...this.parseForm(data), isFavorite: true
        })
        .then((response) => {
          toast.success("Added to favorites successfully!", {
            autoClose: 1000
          })
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
  }
}
</script>
