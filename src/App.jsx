import { useEffect, useRef, useState } from "react";
import LockScreen from "./components/auth/LockScreen";
import SubjectSelector from "./components/subjects/SubjectSelector";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const enterPressCountRef = useRef(0);
  const enterPressResetRef = useRef(null);

  useEffect(() => {
    if (!isUnlocked) {
      return undefined;
    }

    const closeLabxApp = () => {
      if (window.labx?.closeApp) {
        window.labx.closeApp();
        return;
      }

      setIsUnlocked(false);
    };

    const handleKeyDown = (event) => {
      if (event.code !== "Enter") {
        return;
      }

      if (event.repeat) {
        return;
      }

      enterPressCountRef.current += 1;

      if (enterPressResetRef.current) {
        clearTimeout(enterPressResetRef.current);
      }

      enterPressResetRef.current = setTimeout(() => {
        enterPressCountRef.current = 0;
      }, 700);

      if (enterPressCountRef.current >= 3) {
        enterPressCountRef.current = 0;
        closeLabxApp();
      }
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });

      if (enterPressResetRef.current) {
        clearTimeout(enterPressResetRef.current);
      }
    };
  }, [isUnlocked]);

  return (
    <div className="labx-app">
      {!isUnlocked ? (
        <LockScreen onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <SubjectSelector />
      )}
    </div>
  );
}

export default App;