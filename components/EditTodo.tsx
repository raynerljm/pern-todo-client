import { FC, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface EditTodoProps {
  todo: {
    todo_id: string;
    description: string;
  };
}

const EditTodo: FC<EditTodoProps> = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState<string>(todo.description);

  //edit description
  const updateDescription = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        className="text-indigo-500 hover:text-indigo-900 font-semibold"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Edit
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    className="border-2 border-indigo-500 rounded-lg focus:ring-1 w-full"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => {
                      setIsOpen(false);
                      setDescription(todo.description);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={updateDescription}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditTodo;
