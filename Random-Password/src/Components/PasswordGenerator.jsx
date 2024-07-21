import { useCallback, useEffect, useRef, useState } from "react";
function PasswordGenerator() {
  // useState hook
  const [length, setlength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState(" ");
  // useRef hook
  const passwordRef = useRef(null);
  // useCallback hook
  const passwardGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallow) str += "0123456789";
    if (charallow) str += "~@#$%^&*(){}[]?/>=+-_'";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallow, charallow, setpassword]);
  // useEffect hook
  useEffect(() => {
    passwardGenerator();
  }, [length, numberallow, charallow, passwardGenerator]);
  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
    console.log(handleCopy);
  }, [password]);
  return (
    <div className="box">
      <h1 style={{ fontSize: "25px", padding: "20px" }}>
        Random Password Generator
      </h1>
      <div className="box-container">
        <input
          type="text"
          placeholder="password"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <span>
          <button className="btn" onClick={handleCopy}>
            Copy
          </button>
        </span>
      </div>
      <div>
        <input
          type="range"
          className="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setlength(e.target.value)}
        />
        <label style={{ margin: "10px", fontSize: "20px", color: "blue" }}>
          Length :{length}
        </label>
      </div>
      <div className="num">
        <input
          type="checkbox"
          style={{ marginRight: "25px" }}
          defaultChecked={numberallow}
          onChange={() => {
            setnumberallow((prev) => !prev);
          }}
        />
        <label>Number</label>
        <div>
          <input
            type="checkbox"
            style={{ marginRight: "10px" }}
            defaultChecked={charallow}
            onChange={() => {
              setcharallow((prev) => !prev);
            }}
          />
          <label> Character</label>
        </div>
      </div>
    </div>
  );
}
export default PasswordGenerator;
