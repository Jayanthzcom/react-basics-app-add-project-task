import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from './Model.jsx'

export default function NewProject({onAdd, onCancelClick}) {

    const modealRef = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDesc = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if(enteredTitle.trim() === '' || enteredDesc.trim() === '' || enteredDueDate.trim() === ''){
        modealRef.current.open();
        return;
    }

    //validation
    onAdd({
        title : enteredTitle,
        description : enteredDesc,
        dueDate: enteredDueDate
      });
  }

  return (
    <>
    <Modal ref={modealRef} buttonCaption="Okay">
        <h2 className="text=xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className='text-stone-600 mb-4'>OOps... looks like you forgot to enter a value.</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid input for every input</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950" onClick={onCancelClick}>
            Cancel
          </button>
        </li>
        <li>
          <button className="px-8 py-2 rounded-md bg-stone-800 text-stone-50  hover:bg-stone-950"
          onClick={handleSave}>
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input type="text" ref={title} label="Title" />
        <Input ref={description} label="Description" textArea />
        <Input type="date" ref={dueDate} label="Due Date" />
      </div>
    </div>
    </>
    
  );
}
