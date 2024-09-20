'use client';
import { useState, useEffect, useContext, createContext, useRef, useReducer } from 'react';

const UserContext = createContext('Jeff');

export default function Home() {
  
  const [user, setUser] = useState("Abby");
  return (
    <UserContext.Provider value={user}>
    <div className='full-width'>
      <h1>Hello React?</h1>
      <div className='flex flex-wrap justify-center'>
        <CountButton />
        <ColorButton /> 
        <Timer />
        <AddString />
        <NestedComponent />
        <FocusType />
        <LastInput />
        <Todos />
        <AgeUp />
      </div>
    </div>
    </UserContext.Provider>
  );
}

function CountButton(){
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  } 

  return (
    <div className='card'>
      <h3 className='card-title'>useState Hook Count</h3>
      <div className='card-body'>
        <div>This is a useState hook that updates when you click it.</div>
        <button onClick={handleClick}>Clicked {count} times!</button>
      </div>
    </div>
  )
}

function ColorButton(){
  const [typed, setTyped] = useState();
  function handleSubmit(){
    setTyped(document.getElementById('textColor').value);
  }

  return (
      <div className='card'>
        <h3 className='card-title'>useState Hook Color</h3>
        <div className='card-body'>
        <div>This is a useState hook that updates when you type in the input box.</div>

        <input id="textColor" onChange={handleSubmit} />
        <div className='full-width'>Box contains: {typed}</div>
      </div>
      </div>
  );
  
}

function Timer(){
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        setTimeout(() => {
          setTimer(timer + 10);
        }, 10000);
    });
    return (
      <div className='card'>
        <h3 className='card-title'>useEffect Hook Timer</h3>
        <div className='card-body'>
        <div>This is a useEffect hook that updates every 10 seconds.</div>

        <div className='full-width'>Seconds {timer}</div>
      </div>
      </div>
    );
}

function AddString(){
  const[text, setText] = useState('');
  const[full, setFull] = useState('');

  function handleSubmit(){
    setText(document.getElementById('text').value);
  };
  useEffect(() => {
    setFull(full + text);
  }, [text]);

  return (
    <div className='card'>
      <h3 className='card-title'>useEffect Hook Timer</h3>
      <div className='card-body'>
        <div>This is a useEffect hook that concats words when you change the text.</div>

        <input id="text"/>
        <input id="textColor" className='input-submit' type="submit" onClick={handleSubmit} value="Submit" />
        <div id="fullText" className='full-width'>{full}</div>
      </div>  
    </div>
  );

};

function NestedComponent(){
  const user = useContext(UserContext);
  return (
    <div className='card'>
      <h3 className='card-title'>useContext Hook Timer</h3>
      <div className='card-body'>
        <div>This is a useContext hook to provide conext for any components nested further inside the main level.</div>

        <div id="fullText" className='full-width'>User is: {user}</div>
      </div>  
    </div>
  );
};

function FocusType(){
  //needs to be null since it is set on a element
  const inputElement = useRef(null);
  function focusInput() {
    inputElement.current.focus();
  };

  return (
    <div className='card'>
      <h3 className='card-title'>useRef Hook Timer</h3>
      <div className='card-body'>
        <div>This is a useRef hook that sets the focus to type in the box on button click.</div>

        <input type="text" ref={inputElement}/>
        <button onClick={focusInput}>Focus Input</button>
      </div>  
    </div>
  );
};

function LastInput(){
  const [input, setInput] = useState("");
  const previousInput = useRef("");

  useEffect(() => {
    previousInput.current = input;
  }, [input]);

  return (
    <div className='card'>
      <h3 className='card-title'>useRef Hook Last Input</h3>
      <div className='card-body'>
        <div>This is a useRef hook that keeps track of the last input.</div>

        
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <div>Current Input: {input}</div>
        <div>Previous Input: {previousInput.current} </div>
      </div>  
    </div>
  );
};


const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];
const reducer = (state, action) => {
  switch(action.type) {
    case 'COMPLETE':
      return state.map((todo) => {
        if(todo.id === action.id) {
          return { ...todo, complete: !todo.complete};
        } else {
          return todo;
        }
      });
    default:
        return state;
  };
};
function Todos() {

  const [todos, dispatch] = useReducer(reducer, initialTodos)

  const handleComplete = (todo) => {
    dispatch({type: "COMPLETE", id: todo.id});
  };

  return (
    <div className='card'>
      <h3 className='card-title'>useReducer Hook Todo</h3>
      <div className='card-body'>
        <div>This is a useReducer hook that keeps track of a status on a todo.</div>

        {todos.map((todo) => (
          <div key={todo.id}>
            <label>
            <input type="checkbox" checked={todo.complete} onChange={() => handleComplete(todo)} />
            {todo.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};


function reducer2(state, action){
  if(action.type === 'incrementAge'){
    return { age: state.age + 1};
  } else if(action.type === 'decrementAge'){
    return { age: state.age - 1};
  }

  throw Error('Unknown Action.');
}
function AgeUp() {
  const [state, dispatch] = useReducer(reducer2, {age: 42});
  function handleAge(e) {
    if(e.currentTarget.id === 'plus'){
      dispatch({type: 'incrementAge'})
    } else if(e.currentTarget.id === 'minus'){
      dispatch({type: 'decrementAge'})
    }
  };

  return (
    <div className='card'>
      <h3 className='card-title'>useReducer Hook Adjust Age</h3>
      <div className='card-body'>
        <div>This is a useReducer hook that uses a reducer to increment/decrement age.</div>
        <div>Your Age is: {state.age}</div>
        <button id="plus" onClick={handleAge} >Increment Age</button>
        <button id="minus" onClick={handleAge} >Decrement Age</button>
      </div>
    </div>
  )
}