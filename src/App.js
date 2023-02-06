import Login from "./Login";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.css";

const parsedHash = new URLSearchParams(window.location.hash.substring(1));
const accessToken = parsedHash.get("access_token");

function App() {
  return (
    <>
      <Nav />
      {!accessToken && <Login />}
      {accessToken && <Dashboard accessToken={accessToken} />}
    </>
  );
}

export default App;
