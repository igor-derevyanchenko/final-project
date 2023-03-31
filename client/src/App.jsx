import { useEffect, useState } from "react";

function App() {
  const [bacon, setBacon] = useState();

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((parsedRes) => {
        setBacon(parsedRes.bacon);
      });
  }, []);

  return (
    <div>
      Hello, world!<div>{bacon}</div>
    </div>
  );
}

export default App;
