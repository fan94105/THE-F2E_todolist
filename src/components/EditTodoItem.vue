<script setup>
import { ref, watch } from 'vue'
import { Plus, CloseBold, ChatDotRound, Calendar, FolderAdd } from '@element-plus/icons-vue'

import { useTodoStore } from '../stores/counter';

const store = useTodoStore()

const props = defineProps(['todo'])

const cacheTodo = ref({})

const addTodo = ()=>{
  if(cacheTodo.value.title){
    store.addTodos(cacheTodo.value)
    cacheTodo.value = {}
    console.log('addTodo')
  }
}

const cancleEdit = ()=>{
  store.cancleEditTodo()
}

watch(props,()=>{
  // 存取舊有資料
  cacheTodo.value = {...props.todo}
})



</script>
<template>
  <div class="content">
    <div class="panel-top">
      <div class="wrap">
        <el-input v-model="cacheTodo.title" placeholder="Please input" clearable />
      </div>
    </div>
    <div class="panel-bottom">
      <div class="controls">
        <div class="controls-row">
          <div class="controls-row-icon">
            <el-icon :size="18">
              <Calendar />
            </el-icon>
          </div>
          <div class="controls-row-setting">
            <div class="title">Deadline</div>
            <el-date-picker v-model="cacheTodo.deadlineDate" type="date" placeholder="Pick a day" size="default" format="YYYY/MM/DD" value-format="YYYY/MM/DD" />
            <el-time-select v-model="cacheTodo.deadlineTime" start="00:00" step="00:30" end="23:59" placeholder="Select time"
              format="hh:mm A" />
          </div>
        </div>
        <div class="controls-row">
          <div class="controls-row-icon">
            <el-icon :size="18">
              <FolderAdd />
            </el-icon>
          </div>
          <div class="controls-row-setting">
            <div class="title">File</div>
          </div>
        </div>
        <div class="controls-row">
          <div class="controls-row-icon">
            <el-icon :size="18">
              <ChatDotRound />
            </el-icon>
          </div>
          <div class="controls-row-setting">
            <div class="title">Comment</div>
            <el-input v-model="cacheTodo.comment" type="textarea" :rows="5" placeholder="Please input" style="width:445px;" />
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button type="danger" :icon="CloseBold" plain @click="cancleEdit">Cancel</el-button>
        <el-button type="primary" :icon="Plus" @click="addTodo">Add Task</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.content {
  width: 620px;
  height: 519px;
  box-sizing: border-box;
  margin-bottom: 24px;
  background: #F2F2F2;
  box-shadow: 0 4px 4px 0 #C8C8C8;
  border-radius: 5px;

  .panel-top {
    width: 100%;
    height: 76px;
    border-bottom: 3px solid #C8C8C8;
  }

  .panel-bottom {
    height: 443px;
    display: flex;
    flex-direction: column;

    .controls {
      padding-left: 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;

      &-row {
        display: flex;

        &-icon {
          padding-top: 1px;
        }

        &-setting {
          margin-left: 9px;

          .title {
            font-size: 20px;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
}

.wrap {
  height: 100%;

  :deep(.el-input__wrapper) {
    margin: 24px 30px;
    background: transparent;
    border: none;
    box-shadow: none;

    .el-input__inner {
      font-size: 24px;
      color: #000;
    }
  }
}

.btns {
  height: 60px;

  :deep(.el-button) {
    width: 310px;
    height: 60px;
    margin: 0;
    font-size: 24px;
  }
}

.controls-row-setting {
  :deep(.el-textarea) {

    height: 120px;


  }
}
</style>