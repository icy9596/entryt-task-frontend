import { RouterProvider } from "react-router-dom";

import { router } from "./router";

const App = (): JSX.Element => {
  return (
    <div className="app light">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
