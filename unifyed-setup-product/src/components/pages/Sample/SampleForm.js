import FullScreenModal from "components/shared/modal/FullScreenModal";
import { useState } from "react";
import SampleApi from "./SampleApi";
function SampleForm() {
  const [valueChange, setValueChange] = useState("");
  const [valueSubmit, setValueSubmit] = useState("");

  const handleChange = (event) => setValueChange(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValueSubmit(event.target.text1.value);
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Open dialog
          </button>
        </div>
        <form data-testid="form" onSubmit={handleSubmit}>
          <label htmlFor="text1">Input Text:</label>
          <input id="text1" onChange={handleChange} type="text" />
          <button type="submit">Submit</button>
        </form>
        <h3>React State:</h3>
        <p>Change: {valueChange}</p>
        <p>Submit Value: {valueSubmit}</p>
        <br />
      </div>
      <SampleApi />
      <FullScreenModal isOpen={isOpen} onClose={closeModal} title="Add Data" />
    </>
  );
}

export default SampleForm;
