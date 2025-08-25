import { useContext } from "react";
import "./main.css";
import { Context } from "../../context/Context";

// Define assets directly with public paths
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

  // Glassmorphism styles
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    padding: "20px",
    margin: "10px 0",
  };

  const glassCardStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
  };

  const glassNavStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
    padding: "10px 20px",
    margin: "10px",
  };

  const glassSearchStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "50px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
  };

  const backgroundStyle = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
  };

  const iframeContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Makes iframe non-interactive so it doesn't capture clicks
  };

  return (
    <div className="main" style={backgroundStyle}>
      {/* Spline iframe as background */}
      <div style={{ ...iframeContainerStyle, overflow: "hidden", zIndex: -1 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            filter: "blur(5px)",
            transform: "scale(1.05)", // optional, to avoid clipping
            pointerEvents: "none",
          }}
        >
          <iframe
            src="https://my.spline.design/chips-f8d13ced85f57f9558087ab8564d879c/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="spline-background"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>

      <div className="nav" style={glassNavStyle}>
        <p>Neura_Chat</p>
        <img src="/me.jpg" alt="User" />
      </div>

      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet" style={glassStyle}>
              <p>
                <span>Hello, Bharani</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                style={glassCardStyle}
                onClick={() =>
                  handleCardClick("Suggest Some Places to Visit in India.")
                }
              >
                <p>Suggest Some Places to Visit in India.</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                style={glassCardStyle}
                onClick={() =>
                  handleCardClick(
                    "Explain the process of photosynthesis in simple terms."
                  )
                }
              >
                <p>Explain the process of photosynthesis in simple terms.</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div
                className="card"
                style={glassCardStyle}
                onClick={() =>
                  handleCardClick(
                    "How do you create a responsive navbar using CSS and JavaScript?"
                  )
                }
              >
                <p>
                  How do you create a responsive navbar using CSS and
                  JavaScript?
                </p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                className="card"
                style={glassCardStyle}
                onClick={() =>
                  handleCardClick(
                    "What are some essential skills for becoming a front-end developer?"
                  )
                }
              >
                <p>
                  What are some essential skills for becoming a front-end
                  developer?
                </p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" style={glassStyle}>
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

        <div className="main-bottom">
          <div className="search-box" style={glassSearchStyle}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              style={{ color: "white" }}
            />
            <div className="icons">
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              <img src={assets.send_icon} alt="Send" onClick={() => onSent()} />
            </div>
          </div>
          <div className="bottom-info" style={{ color: "white" }}>
            <p>
              Neura_ may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
