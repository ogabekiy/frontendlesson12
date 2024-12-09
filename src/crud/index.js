export function addTodo(newTodo, array) {
  const newArray = [...array];
  newArray.push(newTodo);
  return newArray;
}

export function deleteTodo(todoId, array) {
  const result = array.filter(({ id }) => todoId !== id);
  return result;
}

export function editTodo(editedTodo, array) {
  const newArr = array.map((el) => {
    if (el.id === editedTodo.id) {
      return editedTodo;
    } else return el;
  });
  return newArr;
}
