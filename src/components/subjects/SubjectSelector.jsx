import { useState } from "react";
import PracticalViewer from "../practical/PracticalViewer";

function SubjectSelector() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPractical, setSelectedPractical] = useState(null);

  const handleSubjectClick = (subject) => {
    if (selectedSubject === subject) {
      setSelectedSubject(null);
      setSelectedPractical(null);
    } else {
      setSelectedSubject(subject);
      setSelectedPractical(null);
    }
  };

  const handlePracticalClick = (number) => {
    setSelectedPractical(number);
  };

  const handleBack = () => {
    setSelectedPractical(null);
  };

  // Practical Viewer
  if (selectedPractical !== null) {
    return (
      <PracticalViewer
        subject={selectedSubject}
        practicalNumber={selectedPractical}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="subject-selector">

      <div>
        <button
          className="subject-button"
          onClick={() => handleSubjectClick("AI")}
        >
          AI
        </button>

        <button
          className="subject-button"
          onClick={() => handleSubjectClick("CIS")}
        >
          CIS
        </button>
      </div>

      {/* Practical List */}
      {selectedSubject && (
        <div className="practical-list">

          <h2>{selectedSubject}</h2>

          {Array.from(
            { length: selectedSubject === "AI" ? 1 : 9 },
            (_, index) => index + 1
          ).map((number) => (
            <button
              key={number}
              className="practical-button"
              onClick={() => handlePracticalClick(number)}
            >
              {selectedSubject === "AI"
                ? "Practical"
                : `Prac ${number}`}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default SubjectSelector;