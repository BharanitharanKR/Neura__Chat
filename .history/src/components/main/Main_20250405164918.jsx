import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const assets = {
  compass_icon: "/assets/compass_icon.png",
  message_icon: "/assets/message_icon.png",
  bulb_icon: "/assets/bulb_icon.png",
  code_icon: "/assets/code_icon.png",
  gemini_icon: "/assets/gemini_icon.png",
  gallery_icon: "/assets/gallery_icon.png",
  mic_icon: "/assets/mic_icon.png",
  send_icon: "/assets/send_icon.png",
  menu_icon: "/assets/menu_icon.png",
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

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="main">
      <style>{`
        /* Responsive Nav and Sidebar */
        .menu-icon {
          display: none;
        }

        .sidebar {
          display: none;
        }

        .sidebar.visible {
          display: block;
        }

        @media screen and (max-width: 500px) {
          .menu-icon {
            display: block;
            cursor: pointer;
          }

          .nav p {
            display: none;
          }

          .sidebar {
            position: fixed;
            left: 0;
            top: 60px;
            bottom: 0;
            width: 200px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 20px;
            z-index: 20;
          }
        }

        /* Fix icon image size */
        .search-box img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          cursor: pointer;
        }
      `}</style>

      <div className="nav">
        <img
          className="menu-icon"
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        />
        <p>Welcome Back</p>
        <img src={assets.gemini_icon} alt="User" />
      </div>

      {/* Sidebar for small screens */}
      <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        {/* Add sidebar content here */}
        <p>Sidebar Links</p>
      </div>

      <div className="main-container">
        <div className="greet">
          <p>Hello, What can I do for you today?</p>
        </div>

        {!showResults ? (
          <>
            <div className="cards">
              <div
                className="card"
                onClick={() => handleCardClick("How to use AI")}
              >
                How to use AI <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("What is Web development?")}
              >
                What is Web Dev? <img src={assets.code_icon} alt="Code" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("What is gemini?")}
              >
                What is Gemini? <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("How to use Gemini")}
              >
                How to use Gemini{" "}
                <img src={assets.message_icon} alt="Message" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.gemini_icon} alt="gemini" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className="loader">Thinking...</div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="icons">
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img onClick={onSent} src={assets.send_icon} alt="send" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
