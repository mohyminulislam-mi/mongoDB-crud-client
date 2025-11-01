import "./App.css";
import Users from "./components/Users";
const userPromiss = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);
function App() {
  return (
    <>
      <h1>Simple CRUD</h1>
      <Users userPromiss={userPromiss}></Users>
    </>
  );
}

export default App;
