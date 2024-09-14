'use client';
import { useState, useEffect } from 'react';


export default function Home() {
  
  return (
    <div className='full-width'>
      <h1>Hello React?</h1>
      <div className='flex flex-wrap justify-center'>
        <CountButton />
        <ColorButton /> 
        <Timer />
        <AddString />
        <CountButton />
        <CountButton />
      </div>
    </div>
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