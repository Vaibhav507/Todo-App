import React, {useState} from "react";

function Card() {

    const [inputValue,setInputValue]=useState('');
    
    const [items, setItems]=useState([]);

    const [completed, setCompleted]=useState([]);

    const [show, setShow] = useState('0');

    const [theme, setTheme] = useState('0');

    const [classes, setClass] = useState('0');

    const changeTheme = () => {
        if (theme==0) {
            setTheme('1');
        } else {
            setTheme('0');
        }
    }

    const showAll = () => {
        setShow('0');
    }
    const showActive = () => {
        setShow('1');
    }
    const showCompleted = () => {
        setShow('2');
    }

    const removeCompleted = () => {
        setItems(e => e.filter((item,i) => !completed.includes(i)));
        setCompleted([]);
    }

    const changeToCompleted = (index) => {
        setCompleted(prevCompleted => prevCompleted.includes(index) 
        ? prevCompleted.filter(i => i!==index) 
        : [...prevCompleted,index]);
    }

    const removeTask = (index) => {
        setItems(e => e.filter((item,i) => i!==index));
        setCompleted(e => e.filter(i=> i!==index))
    }

    const add = (event) => {
        event.preventDefault();
        if(inputValue.trim()!=='') {
            setItems([...items,inputValue]);
            setInputValue('');
        }
    };

    function changeClass(index) {
        if (completed.includes(index) &&  theme==0)
            return "strike dark";
        if (completed.includes(index) &&  theme==1)
            return "strike white";
        if (theme==0)
            return "dark";
        if (theme==1)
            return "white";
    }
    
    return(
        <div className={theme==0 ? "container dark" : "container white"}>
            <div className="main-part">
                <div className="top">
                    <h1 className="logo">Todo</h1>
                    <div className={theme==0 ? "change-theme sun" : "change-theme moon"} onClick={changeTheme}>
                </div>
                </div>
                <div className="bottom">
                <div className="new-task">
                    <form onSubmit={add} id="#tasks">
                        <input type="text" className={theme==0 ? "new-task-input dark" : "new-task-input white"} placeholder="Create a new todo.." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        <button type="submit" className={theme==0 ? "submit-button dark" : "submit-button white"}></button>
                    </form>
                </div>
                <div className="all-tasks">
                    <ul>
                        {items.map((item, index) => {
                           if(show==0) {
                            return (<li key={index} className={theme==0 ? "dark" : "white"}>
                            <div onClick={() => changeToCompleted(index)} className={completed.includes(index) ? "strike tasks" : "tasks"}>
                                <button className={completed.includes(index) ? "select-button active" : "select-button"}></button>
                                {item}
                            </div>
                            <div className="remove-button" onClick={() => removeTask(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                            </div>
                                    </li>)
                           } else if(show==1 && !completed.includes(index)) {
                            return (<li key={index} className={theme==0 ? "dark" : "white"}>
                            <div className={completed.includes(index) ? "strike tasks" : "tasks"} onClick={() => changeToCompleted(index)}>
                                <button className={completed.includes(index) ? "select-button active" : "select-button"}></button>
                                {item}
                            </div>
                            <div className="remove-button" onClick={() => removeTask(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                            </div>
                                    </li>)
                           } else if(show==2 && completed.includes(index))
                            return (<li key={index} className={theme==0 ? "dark" : "white"}>
                            <div className={completed.includes(index) ? "strike tasks" : "tasks"} onClick={() => changeToCompleted(index)}>
                                <button className={completed.includes(index) ? "select-button active" : "select-button"}></button>
                                {item}
                            </div>
                            <div className="remove-button" onClick={() => removeTask(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                            </div>
                                    </li>)
                        }   
                        )}
                        <li className={theme==0 ? "dark" : "white"}>
                            <p>{items.length-completed.length} items left</p>
                            <p onClick={removeCompleted} className={theme==0 ? "categories dark" : "categories white"}>Clear Completed</p>
                        </li>
                    </ul>
                </div>
                <div className={theme==0 ? "category dark" : "category white"}>
                    <p onClick={showAll} className={show==0 ? "categories active" : "categories"}>All</p>
                    <p onClick={showActive} className={show==1 ? "categories active" : "categories"}>Active</p>
                    <p onClick={showCompleted} className={show==2 ? "categories active" : "categories"}>Completed</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Card