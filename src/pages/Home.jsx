import styled from "styled-components";
import { useState, useCallback } from "react";

const FlexLayout = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
`;
const TodoArea = styled.div`
  width: 500px;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
`;

const TodoInputArea = styled.div`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;
const TodoInput = styled.input`
  padding: 0.5rem;
  width: 100%;
`;
const TodoListArea = styled.div`
  padding: 0.25rem;
`;
const TodoItem = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;
const TodoItemChecked = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  &::before {
    content: "✔";
    display: block;
    color: ${({ checked }) => (checked ? "green" : "#fff")};
  }
`;
const TodoItemText = styled.span`
  display: inline-block;
  height: inherit;
  line-height: 2;
  font-size: 0.875rem;
  flex: 1;
  word-break: break-all;
  ${({ checked }) => checked && "text-decoration: line-through; color:#888;"}
`;
const TodoItemDeleteButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
`;

export function Home() {
  const [todos, setTodos] = useState([]);
  const [todoIndex, setTodoIndex] = useState(0);
  const todoInputHandlers = {
    keyDown: useCallback((event) => {
      const isCreated = event.keyCode === 13;
      const inputValue = event.target.value;
      if (isCreated && inputValue) {
        const todo = {
          todoIndex: todoIndex + 1,
          todoName: inputValue,
          todoChecked: false,
        };
        event.target.value = "";
        setTodos([...todos, todo]);
        setTodoIndex(todoIndex + 1);
      }
    }),
  };
  const todoItemHandlers = {
    todoItemCheckedToggle: useCallback(({ todo }) => {
      todo.todoChecked = !todo.todoChecked;
      setTodos([...todos]);
    }),
    todoItemDeleteButtonClick: useCallback(({ todo }) => {
      const excepTodos = todos.filter((filterTodo) => filterTodo !== todo);
      setTodos([...excepTodos]);
    }),
    todoItemTextClick: useCallback(({ event }) => {
      event.target.contentEditable = true;
      event.target.focus();
      console.log(1);
    }),
    todoItemTextBlur: useCallback(({ todo, event }) => {
      event.target.contentEditable = false;
      todo.todoName = event.target.textContent;
      setTodos([...todos]);
    }),
    todoItemTextKeyDown: useCallback(({ todo, event }) => {
      const isEdit = event.keyCode === 13;
      const inputValue = event.target.textContent;
      if (isEdit && inputValue) {
        event.target.contentEditable = false;
        todo.todoName = inputValue;
        setTodos([...todos]);
      } else if (isEdit && !inputValue) {
        todoItemHandlers.todoItemDeleteButtonClick({ todo });
      }
    }),
  };

  return (
    <FlexLayout>
      <TodoArea>
        <TodoInputArea>
          <TodoInput
            onInput={todoInputHandlers.input}
            onKeyDown={todoInputHandlers.keyDown}
            placeholder="할 일을 입력해주세요"
          />
        </TodoInputArea>
        <TodoListArea>
          {todos.map((todo) => (
            <TodoItem key={todo.todoIndex}>
              <TodoItemChecked
                checked={todo.todoChecked}
                onClick={() => todoItemHandlers.todoItemCheckedToggle({ todo })}
              ></TodoItemChecked>
              <TodoItemText
                checked={todo.todoChecked}
                onClick={(event) => todoItemHandlers.todoItemTextClick({ todo, event })}
                onBlur={(event) => todoItemHandlers.todoItemTextBlur({ todo, event })}
                onKeyDown={(event) => todoItemHandlers.todoItemTextKeyDown({ todo, event })}
              >
                {todo.todoName}
              </TodoItemText>
              <TodoItemDeleteButton onClick={() => todoItemHandlers.todoItemDeleteButtonClick({ todo })}>
                delete
              </TodoItemDeleteButton>
            </TodoItem>
          ))}
        </TodoListArea>
      </TodoArea>
    </FlexLayout>
  );
}
