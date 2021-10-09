import { FC, useState } from "react";

const InputTodos: FC = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-indigo-500 font-bold text-4xl mb-4">
        Pern Todo List
      </h1>
      <form className="h-10 flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="border-2 border-indigo-500 rounded-lg focus:ring-1 mr-1"
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 px-4 rounded-lg text-white hover:bg-indigo-600"
        >
          Add
        </button>
      </form>
    </>
  );
};
export default InputTodos;
