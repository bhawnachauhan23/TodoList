// importing corresponding css
import "./App.css";

// importing reactNotification library
import { ReactNotifications } from "react-notifications-component";

// importing various sub-components
import Header from "./components/Header/Header";
import TodoContainer from "./components/TodoContainer/TodoContainer";

// Functional Component App
function App() {
  return (
    <div className="App">
      {/* Using React Notifications for rendering up all the notifications */}
      <ReactNotifications />
      <Header />
      {/* Rendering the todo container */}
      <TodoContainer />
    </div>
  );
}

export default App;
