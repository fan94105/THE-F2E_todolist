import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todolist', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const isEdit = ref(false)

  const storageTodos = JSON.parse(localStorage.getItem('todos'))

  const todos = ref(storageTodos || []) 

  const currentEdit = ref({})

  const isNewTodo = ref(true)


  function addTodos(todo){
    if(isNewTodo.value){
      todos.value.push({
        id:todos.value.length,
        title: todo.title,
        deadlineDate: todo.deadlineDate || '',
        deadlineTime: todo.deadlineTime || '',
        comment: todo.comment || '',
        isChecked:false
      })
    }else {
      for(let i in todos.value){
        if(todos.value[i].id === todo.id){
          todos.value[i] = todo
        }
      } 
    }
    currentEdit.value = {}
    isNewTodo.value = true
  }

  function cancleEditTodo(){
    currentEdit.value = {}
    isNewTodo.value = true
  }

  return { isEdit, todos, currentEdit, addTodos, isNewTodo, cancleEditTodo }
})
