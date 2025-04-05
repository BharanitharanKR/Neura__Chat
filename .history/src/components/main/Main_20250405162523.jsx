import { useContext, useEffect } from "react";
import "./main.css";
import { Context } from "../../context/Context";

// Define assets with public paths
const assets = {
  compass_icon: "/assets/compass_icon.png",
  message_icon: "/assets/message_icon.png",
  bulb_icon: "/assets/bulb_icon.png",
  code_icon: "/assets/code_icon.png",
  gemini_icon: "/assets/gemini_icon.png",
  gallery_icon: "/assets/gallery_icon.png",
  mic_icon: "/assets/mic_icon.png",
  send_icon: "/assets/send_icon.png",
};

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  useEffect(() => {
    if (showResults) {
      const resultSection = document.querySelector(".result");
      resultSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showResults]);

  return (
    <div className="main">
      {/* Background Spline */}
      <div className="iframe-bg">
        <iframe
          src="https://my.spline.design/chips-f8d13ced85f57f9558087ab8564d879c/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="spline-background"
        ></iframe>
      </div>

      {/* Top Nav */}
      <div className="nav glass-nav">
        <p>Neura_Chat</p>
        <img src="/me.jpg" alt="User" />
      </div>

      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet glass">
              <p>
                <span>Hello, Bharani</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {[
                {
                  text: "Suggest Some Places to Visit in India.",
                  icon: assets.compass_icon,
                },
                {
                  text: "Explain the process of photosynthesis in simple terms.",
                  icon: assets.message_icon,
                },
                {
                  text: "How do you create a responsive navbar using CSS and JavaScript?",
                  icon: assets.bulb_icon,
                },
                {
                  text: "What are some essential skills for becoming a front-end developer?",
                  icon: assets.code_icon,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card glass-card"
                  onClick={() => handleCardClick(item.text)}
                >
                  <p>{item.text}</p>
                  <img src={item.icon} alt="icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result glass">
            <div className="result-title">
              <img src="/me.jpg" alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="main-bottom">
          <div className="search-box glass-search">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              style={{ color: "white" }}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              <img src={assets.send_icon} alt="Send" onClick={() => onSent()} />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
