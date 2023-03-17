<template>
  <el-form :model="form" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="genus">
          <el-input v-model="form.genus" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="family">
          <el-input v-model="form.family" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="order">
          <el-input v-model="form.fruitOrder" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="carbohydrates">
          <el-input type="number" v-model="form.carbohydrates" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="protein">
          <el-input type="number" v-model="form.protein" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="fat">
          <el-input type="number" v-model="form.fat" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="calories">
          <el-input type="number" v-model="form.calories" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="sugar">
          <el-input type="number" v-model="form.sugar" />
        </el-form-item>
      </el-col>
    </el-row>
    <div style="display: flex; justify-content: flex-end">
      <el-button type="primary" @click="create">Save</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import type { Fruit } from '@/interfaces'
export default {
  data() {
    return {
      form: {
        name: '',
        family: '',
        genus: '',
        fruitOrder: '',
        protein: 0,
        fat: 0,
        calories: 0,
        sugar: 0,
        carbohydrates: 0,
        isFavorite: null
      }
    }
  },
  methods: {
    create() {
      this.$emit('onCreate', this.form)
    }
  }
}
</script>
