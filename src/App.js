import { useState } from "react";
import "./App.css";

import photo1 from "./assets/photo1.jpeg";
import photo2 from "./assets/photo2.jpeg";
import photo3 from "./assets/photo3.jpeg";

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

  const handleYesClick = () => {
    setStage("yes");

    // floating hearts animation
    const heartArray = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 90 + "%",
      duration: Math.random() * 3 + 2 + "s",
      size: Math.random() * 30 + 20 + "px",
    }));

    setHearts(heartArray);
  };

  return (
    <div className="container">
      {stage === "ask" && (
        <>
          <h1>💖 {BF_NAME}, will you be my Valentine?</h1>

          <div className="buttons">
            <button className="yes" onClick={handleYesClick}>
              Yes 😍
            </button>

            <button
              className="no"
              onClick={() => alert("Come on 😏 You know the answer is YES!")}
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

          <h1 className="fade-in">💘 Our Little Love Gallery 💘</h1>
          <p className="msg fade-in">
            Every photo holds a feeling, Sambit ❤️
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

          <button className="reset" onClick={() => setStage("ask")}>
            Start Again 🔄
          </button>
        </>
      )}
    </div>
  );
}
