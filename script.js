var todoList = {
  todos: [],
  displayTodo: function() {
    var todos = this.todos;
    if (todos.length ===0) {
      console.log('Your todoList is empty');
    } else {
      console.log('My todos:');
      todos.forEach(function(element){
        if (element.completed === true) {
          console.log('(x)', element.todoText);
        } else {
          console.log('( )', element.todoText);
        }
      });
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
    // this.displayTodo();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodo();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    // this.displayTodo();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    // this.displayTodo();
  },
  toggleAll: function() {
    var todos = this.todos;
    var completedTodo = 0;
    todos.forEach(function(element){
      if (element.completed === true){
        completedTodo++;
      }
    });
    
    todos.forEach(function(element){
      if (completedTodo === todos.length) {
        element.completed = false;
      } else {
        element.completed = true;
      }
    });
    
    // this.displayTodo();
  }
};

var handler = {
  displayTodo: function(){
    todoList.displayTodo();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodo();
  },
  addTodo: function() {
    var addInputText = document.getElementById('addInputText');
    todoList.addTodo(addInputText.value);
    addInputText.value = '';
    view.displayTodo();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodo();
  },
  deleteTodo: function(position) {
    //var deleteTodoInput = document.getElementById('deleteTodoInput');
    todoList.deleteTodo(position);
    //deleteTodoInput.value = '';
    view.displayTodo();
  },
  toggleComplete: function() {
    var toggleCompleteInput = document.getElementById('toggleCompleteInput');
    todoList.toggleCompleted(toggleCompleteInput.value);
    toggleCompleteInput.value = '';
    view.displayTodo();
  }
};

var view = {
  displayTodo: function(){

    var todoUL = document.querySelector('ul');
    todoUL.innerHTML = '';
    todoList.todos.forEach(function(todo, index){
      
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) '+ todo.todoText;
      } else {
        todoTextWithCompletion = '( ) '+ todo.todoText;
      }
      
      todoLi.id = index;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUL.appendChild(todoLi);  
    },this);
    
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListener: function(){
    var todoUL = document.querySelector('ul');
    todoUL.addEventListener('click', function(event){
      eventButton = event.target;
      if (eventButton.className === 'deleteButton'){
        position = parseInt(eventButton.parentNode.id);
        handler.deleteTodo(position);
      }
    });
  },
  
};

view.setupEventListener();
