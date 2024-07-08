import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  
  const [passWord, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumAllowed, setNumAllowed] = useState(false);
  const [isCharAllowed, setCharAllowed] = useState(false);
  const passref = useRef(null);

  const passWordGenerator = useCallback(() => {

    let pass = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isCharAllowed) string += "!@#$%^&*";
    if (isNumAllowed) string += "0123456789";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length) + 1;
      pass += string.charAt(char);
    }

   
    setPassword(pass);
  }, [length, isCharAllowed, isNumAllowed]);

  useEffect(() => {
    passWordGenerator();
  }, [length, isCharAllowed, isNumAllowed, setPassword]);

  const copyPassWord = useCallback(()=>{
    window.navigator.clipboard.writeText(passWord);
    passref.current?.select();
  },[passWord])
  return (
    <div className="main flex flex-col bg-gray-700 w-full  items-center min-h-screen">
      <h2
        className="text-white  font-normal text-4xl
                        py-3  "
      >
        PassWord Generator
      </h2>

      <div className="card flex  items-center flex-col w-250 bg-green-400 rounded-lg border">
        <div className="flex flex-row p-5">
          <input type="text" value={passWord} className="rounded px-2" ref={passref}/>
          <button className="rounded-md bg-red-500 p-2" onClick={copyPassWord}>Copy</button>
        </div>

        <div className="flex flex-row gap-2 px-2">
          <input
            type="range"
            name=""
            id=""
            min="0"
            max="100"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }
          }
          
          />
          <label htmlFor="range">Length : {length}</label>
          <input
            type="checkbox"
            checked={isNumAllowed}
            onChange={() => setNumAllowed((prevState) => !prevState)}
          />
          <label htmlFor="range">Numbers</label>
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={isCharAllowed}
            onChange={() => {
              setCharAllowed((prevState) => !prevState);
            }}
          />
          <label htmlFor="range">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
