import "./App.css";
import ColorsList from "./components/ColorsList";
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <>
      <h1>PIXEL COUNTER</h1>
      <ImageUploader />
      <ColorsList />
    </>
  );
}

export default App;
