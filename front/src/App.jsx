import React, { useState } from 'react';

import { motion } from 'framer-motion';
import img1 from './ml_215.svg'
import './App.css';
function App() {

  const [gold, setgold] = useState({ open: '', high: '', low: '' });
  const [all, setall] = useState([]);

  const handle1 = (e) => {
    setgold({ ...gold, open: e.target.value });
  };
  const handle2 = (e) => {
    setgold({ ...gold, high: e.target.value });
  };
  const handle3 = (e) => {
    setgold({ ...gold, low: e.target.value });
  };
 

  const sendAll = async () => {
    try {
      console.log('Data sent:', { gold });
      const response = await fetch('http://127.0.0.1:4000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gold }),
      });
      const datah = await response.json();
      console.log(datah.prediction[0]);
      setall(datah.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div> 
      {/* <Navbar /> */}
      <div className='flex flex-row h-screen w-screen try1'>
     
      <div className="flex flex-col h-screen w-screen justify-center items-center gap-6 t2">
        <motion.div>
          <h1 className="text-white title">Prediction Of Gold Price</h1>
        </motion.div>
        <div className="flex-row justify-center items-center">
          <div className='flex flex-col justify-center items-center'>
          <div>
            <label>OPEN PRICE</label>
          </div>
          <div>
            <input type="number" onChange={handle1} placeholder="Open Price" />
          </div>

          </div>
        <div className='flex flex-col justify-center items-center'>
        <div>
            <label>HIGH PRICE</label>
          </div>
          <div>
            <input type="number" onChange={handle2} placeholder="High Price" />
          </div>
        </div>
         <div className='flex flex-col justify-center items-center'>
         <div>
            <label>LOW PRICE</label>
          </div>
          <div>
            <input type="number" onChange={handle3} placeholder="Low Price" />
          </div>
         </div>
         
        </div>
        <motion.div whileTap={{ scale: [1, 1.5, 5] }}>
       
          <button class="cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none" onClick={sendAll}>
  SUBMIT
</button>
        </motion.div>
        <div className="ans text-black-300 font-extrabold text-4xl">
          {all.map((p, item) => {
            return (
              <div>
                <h3 key={item}>Gold price is Rs {Math.round(p)} only!</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex justify-center items-center w-[80vw]'>
      <img src={img1 } height='800px' width='400px'/>
      </div>
      </div>

    </div>
  );
}

export default App;
