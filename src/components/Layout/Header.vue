
<template>
    <el-menu :default-active="defaultActive" class="el-menu-demo navbar" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">Fruits</el-menu-item>
        <el-menu-item index="2">Favorits</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

const defaultActive: any = '1'

const handleSelect = (key: string, keyPath: string): any => {
    switch (key) {
        case "1":
            router.push({ name: "fruits" });
            break;
        case "2":
        router.push({ name: "favorites" });
            break;
    }
}
</script>