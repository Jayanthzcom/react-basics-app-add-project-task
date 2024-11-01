import Button from "./Button.jsx";
import { useRef, useState } from "react";
import Modal from './Model.jsx'

export default function NewTask({onAdd}){
    const modealRef = useRef();
    const [enteredTask,setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(() => event.target.value);
    }

    function onAddTask(){
        setEnteredTask('');
        if(enteredTask.trim() === ''){
            modealRef.current.open();
            return;
        }
        onAdd(enteredTask)
    }

    return (
        <>
    <Modal ref={modealRef} buttonCaption="Okay">
        <h2 className="text=xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className='text-stone-600 mb-4'>OOps... looks like you forgot to enter a value.</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid input for task</p>
    </Modal>
    <div className="flex items-center gap-4">
        <input type="text" className="w-64 px-2 py-1 rouunded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
        <Button onClick={onAddTask}>Add Task</Button>
    </div>
        </>
    )
    
}