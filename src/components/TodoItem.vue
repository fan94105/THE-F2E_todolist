<script setup>
import { ref, computed } from 'vue'

import { Star, StarFilled, EditPen } from '@element-plus/icons-vue';

import { useTodoStore } from '../stores/counter';
const store = useTodoStore()

const props = defineProps([
  'item'
])

const todo = computed(() => {
  return props.item
})

const editTodo = () => {
  store.currentEdit = todo.value
  store.isNewTodo = false
}

// lightingStar ? 'light' : ''
</script>
<template>
  <div class="content" :class="{ light: todo.lightingStar, done: todo.isChecked }">
    <div class="item-top">
      <el-checkbox v-model="todo.isChecked" size="large" />
      <el-input v-model="todo.title" placeholder="Please input" :class="{ isDone: todo.isChecked }" disabled />
      <el-icon @click="todo.lightingStar = !todo.lightingStar" :size="26">
        <Star v-if="!todo.lightingStar"></Star>
        <StarFilled style="color:#F5A623" v-if="todo.lightingStar"></StarFilled>
      </el-icon>
      <el-icon @click="editTodo" :size="24">
        <EditPen />
      </el-icon>
    </div>
    <div class="item-bottom" v-if="!todo.isChecked">
      <el-icon :size="18">
        <Calendar />
      </el-icon>
      <span v-if="todo.deadlineDate">{{ todo.deadlineDate }}</span>
      <el-icon :size="18">
        <FolderAdd />
      </el-icon>
      <el-icon v-if="todo.comment" :size="18">
        <ChatDotRound />
      </el-icon>
    </div>
  </div>
</template>
<style scoped lang="less">
.content {
  box-sizing: border-box;
  width: 620px;
  height: 102px;
  background: #F2F2F2;
  border-radius: 5px;
  margin-bottom: 8px;

  &.done {
    height: 76px;
  }

  .item-top {
    display: flex;
    padding-top: 20px;
    margin-right: 32px;
    text-align: center;
    align-items: center;

    .isDone {
      text-decoration: line-through;
    }

    .el-icon {
      margin-left: 32px;
      cursor: pointer;
    }
  }

  .item-bottom {
    margin-left: 72px;
    display: flex;
    align-items: flex-end;

    .el-icon {
      margin: 0 8px;
      color: #757575;
    }

    span {
      margin: 0 8px;
      color: #757575;
    }
  }
}

.light {
  background: #FFF2DC;
}

.item-top {
  :deep(.el-checkbox__inner) {
    width: 24px;
    height: 24px;
    margin-left: 32px;

    &:after {
      content: "";
      height: 9px;
      left: 8px;
      top: 4px;
      width: 5px;
    }
  }

  :deep(.el-input.is-disabled){
    cursor: default;
    .el-input__wrapper{
        border: none;
        box-shadow: none;
        background: transparent;

        .el-input__inner {
          font-size: 24px;
        }
  }
  
  }

}</style>