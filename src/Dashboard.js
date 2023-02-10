import SpotifyWebApi from "spotify-web-api-js";
import GenerateList from "./GenerateList";
import { useEffect, useState } from "react";

const spotifyApi = new SpotifyWebApi();

function Dashboard(props) {
  const [trackList, setTrackList] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [playlistCreated, setPlaylistCreated] = useState(false);

  spotifyApi.setAccessToken(props.accessToken);

  useEffect(() => {
    async function fetchData() {
      const getTracks = await spotifyApi.getMyTopTracks({
        limit: 50,
        time_range: timeRange,
      });
      setTrackList(GenerateList(getTracks.items));
      window.history.pushState({}, null, "/");
    }
    fetchData();
  }, [timeRange]);

  async function GeneratePlaylist(trackList, timeRange) {
    const timeTitle = {
      short_term: "of Last Month",
      medium_term: "of Last 6 Months",
      long_term: "of All Time",
    };
    const trackUris = [];
    for (const track of trackList) {
      trackUris.push(track.trackUri);
    }
    const userData = await spotifyApi.getMe();
    const playlist = await spotifyApi.createPlaylist(userData.id, {
      name: "Your Top Tracks " + timeTitle[timeRange],
    });
    const addTracks = await spotifyApi.addTracksToPlaylist(
      playlist.id,
      trackUris
    );
    setPlaylistCreated(true);
  }

  const handleTimeChange = (event) => {
    setTimeRange(event.currentTarget.id);
    setPlaylistCreated(false);
  };

  let alertClasses = "alert alert-success text-center d-none";
  if (playlistCreated) {
    alertClasses = "alert alert-success text-center";
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 sidebar bg-dark pt-3 d-flex justify-content-center">
            <div className="p-3 text-white bg-dark position-fixed">
              <div className="d-flex justify-content-center">
                <p className="fs-4 text-decoration-underline">
                  Your Top Tracks
                </p>
              </div>
              <ul className="nav flex-sm-column">
                <li className="my-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className={`${
                      timeRange === "short_term"
                        ? "btn btn-lg btn-success disabled"
                        : "btn btn-lg btn-success"
                    }`}
                    id="short_term"
                    onClick={handleTimeChange}
                  >
                    Last month
                  </button>
                </li>

                <li className="my-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className={`${
                      timeRange === "medium_term"
                        ? "btn btn-lg btn-success disabled"
                        : "btn btn-lg btn-success"
                    }`}
                    id="medium_term"
                    onClick={handleTimeChange}
                  >
                    Last 6 months
                  </button>
                </li>
                <li className="my-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className={`${
                      timeRange === "long_term"
                        ? "btn btn-lg btn-success disabled"
                        : "btn btn-lg btn-success"
                    }`}
                    id="long_term"
                    onClick={handleTimeChange}
                  >
                    All time
                  </button>
                </li>
                <li className="my-5 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => GeneratePlaylist(trackList, timeRange)}
                  >
                    Create playlist
                  </button>
                </li>
                <div className={alertClasses} role="alert">
                  Playlist created! Check your Spotify.
                </div>
              </ul>
            </div>
          </div>
          <div className="col d-flex">
            <table className="table table-hover">
              <thead className="">
                <tr>
                  <th></th>
                  <th>Song</th>
                  <th></th>
                  <th>Album</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {trackList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td width="5%">{index + 1}</td>
                      <td width="20%">{item.trackName}</td>
                      <td>
                        <img
                          alt="album art"
                          src={item.albumPicture}
                          width="75"
                        />
                      </td>
                      <td width="25%">{item.albumName}</td>
                      <td>{item.artistName}</td>
                      <td>
                        <audio
                          controls
                          preload="none"
                          src={item.previewUrl}
                        ></audio>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
