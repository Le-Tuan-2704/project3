import { memo } from "react";

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default memo(Todos);