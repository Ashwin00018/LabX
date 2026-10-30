import { useEffect, useRef, useState } from "react";

const PASSWORD = "labx123";

function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();

    const handleClick = () => {
      focusInput();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === PASSWORD) {
      setPassword("");
      onUnlock();
    } else {
      setPassword("");
      focusInput();
    }
  };

  return (
    <div className="lock-screen">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="off"
          aria-label="LabX password"
        />
      </form>
    </div>
  );
}

export default LockScreen;