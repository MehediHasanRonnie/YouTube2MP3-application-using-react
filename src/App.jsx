import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID);
    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));
    inputUrlRef.current.value = "";
  };
  return (
    <div className="App">
      <span className="logo">
        <img src="../public/music.png" alt="image" height={24} width={24} />
        YoTube2MP3
      </span>
      <section className="content">
        <h1 className="content_title">YouTube to mp3 Converter</h1>
        <p className="content_description">
          Easily convert a YouTube video to an MP3 with just a few clicks!
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            type="text"
            className="form_input"
            placeholder="Paste a Youtube video link here..."
          />
          <button type="submit" className="form_button">
            Convert
          </button>
        </form>
        {urlResult ? (
          <a
            target="_blank"
            href={urlResult}
            rel="noreferrer"
            className="download_btn"
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
