import "./App.css";
import { Button } from "./atomic-design/atom/button";

function App() {
  return (
    <>
      <Button variant="solid" color="blue-lighten1" size="lg">
        Custom Button!
      </Button>
      <Button></Button>
    </>
  );
}

export default App;
