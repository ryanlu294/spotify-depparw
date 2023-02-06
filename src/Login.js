import { Container } from "react-bootstrap";

function Login() {
  let client_id = "8a1be14bdc0e4be49d9cccf33e8cedf3";
  let redirect_uri = "http://localhost:3000";
  let scope = "user-top-read playlist-modify-public";
  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <a className="btn btn-success btn-lg" href={url}>
        Login with Spotify
      </a>
    </Container>
  );
}

export default Login;
