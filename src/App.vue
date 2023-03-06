<script setup>
import { ref, watch, onUpdated } from 'vue';
import draggable from 'vuedraggable'
import 'animate.css'

import EditTodoItem from './components/EditTodoItem.vue';
import TodoItem from './components/TodoItem.vue';

import { useTodoStore } from './stores/counter';

const store = useTodoStore()

const drag = ref(false)
const currentTab = ref('all')

watch(store, () => {
  localStorage.setItem('todos', JSON.stringify(store.todos))
})

</script>

<template>
  <div class="container">
    <div class="nav">
      <div class="nav-item" :class="{ checked: currentTab === 'all' }" @click="currentTab = 'all'">My Tasks</div>
      <div class="nav-item" :class="{ checked: currentTab === 'progress' }" @click="currentTab = 'progress'">In Progress</div>
      <div class="nav-item" :class="{ checked: currentTab === 'completed' }" @click="currentTab = 'completed'">Completed</div>
    </div>
    <div class="main">
      <div>
        <EditTodoItem v-if="store.currentEdit && currentTab === 'all'" :todo="store.currentEdit"></EditTodoItem>
      </div>
      <draggable v-if="currentTab === 'all'" v-model="store.todos" @start="drag = true" @end="drag = false" item-key="name">
        <template #item="{ element }">
          <TodoItem :item="element" v-if="store.currentEdit.id != element.id"></TodoItem>
        </template>
      </draggable>
      <draggable v-if="currentTab === 'progress'" v-model="store.todos" @start="drag = true" @end="drag = false"
        item-key="name">
        <template #item="{ element }">
          <TodoItem :item="element" v-if="!element.isChecked"></TodoItem>
        </template>
      </draggable>
      <draggable v-if="currentTab === 'completed'" v-model="store.todos" @start="drag = true" @end="drag = false"
        item-key="name">
        <template #item="{ element }">
          <TodoItem :item="element" v-if="element.isChecked"></TodoItem>
        </template>
      </draggable>

    </div>
  </div>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
}

.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  background: #E1E1E1;

  .nav {
    height: 76px;
    width: 620px;
    margin: 0 auto 22px;
    background: #4A90E2;
    display: flex;
    justify-content: space-around;

    &-item {
      width: 160px;
      height: 76px;
      font-size: 24px;
      line-height: 76px;
      color: #00408B;
      text-align: center;
      position: relative;
      cursor: pointer;
    }

    &-item.checked {
      color: #FFF;
    }

    .nav-item.checked:after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      width: 160px;
      height: 5px;
      background: #00408B;
    }
  }

  .main {
    width: 620px;
    margin: 0 auto;
  }
}</style>
