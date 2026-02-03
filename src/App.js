import { useState, useRef } from "react";
import "./App.css";

import photo1 from "./assets/photo1.jpeg";
import photo2 from "./assets/photo2.jpeg";
import photo3 from "./assets/photo3.jpeg";
import loveSong from "./assets/love.mp3";

const BF_NAME = "Sambit Mitra";

const memories = [
  { img: photo1, text: "The smile that started everything 💫" },
  { img: photo2, text: "Comfort, chaos & coffee dates ☕" },
  { img: photo3, text: "Still choosing you. Every day ❤️" },
];

export default function App() {
  const [stage, setStage] = useState("ask");
  const [liked, setLiked] = useState({});
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);

  const handleYesClick = () => {
    setStage("yes");

    // play music
    audioRef.current.play();

    // floating hearts
    const heartArray = Array.from({ length: 20 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 95 + "%",
      duration: Math.random() * 3 + 3 + "s",
      size: Math.random() * 30 + 20 + "px",
    }));
    setHearts(heartArray);
  };

  return (
    <div className="container romantic-bg">
      <audio ref={audioRef} src={loveSong} loop />

      {stage === "ask" && (
        <>
          <h1 className="fade-in">
            💖 {BF_NAME}, will you be my Valentine?
          </h1>

          <p className="romantic-line fade-in">
            I promise a lifetime of love, laughter & holding hands 💕
          </p>

          <div className="buttons">
            <button className="yes pulse" onClick={handleYesClick}>
              Yes 😍
            </button>

            <button
              className="no"
              onClick={() =>
                alert("Oops 😏 Destiny doesn’t accept NO here!")
              }
            >
              No 🙈
            </button>
          </div>
        </>
      )}

      {stage === "yes" && (
        <>
          {/* Floating Hearts */}
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="floating-heart"
              style={{
                left: heart.left,
                animationDuration: heart.duration,
                fontSize: heart.size,
              }}
            >
              💖
            </span>
          ))}

          <h1 className="fade-in glow-text">
            💘 Our Love Story 💘
          </h1>

          <p className="msg fade-in">
            Loving you is my favorite forever, Sambit ❤️
          </p>

          <div className="gallery">
            {memories.map((item, index) => (
              <div
                key={index}
                className="photo-card fade-in"
                onClick={() =>
                  setLiked((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }))
                }
              >
                <img src={item.img} alt="memory" />
                <div className="overlay">
                  <p>{item.text}</p>
                </div>
                {liked[index] && <span className="heart">💖</span>}
              </div>
            ))}
          </div>

          <p className="romantic-footer fade-in">
            From this moment… it’s always you 💞
          </p>

          <button className="reset" onClick={() => window.location.reload()}>
            Relive Our Moment 🔄
          </button>
        </>
      )}
    </div>
  );
}
