import { useContext, useState, useEffect } from "react";
import "./main.css";
import { Context } from "../../context/Context";

// -------------------- NEW COMPONENT --------------------
const CanvasCodeBlock = ({ code }) => {
  // Regex to match variables (const/let/var NAME =)
  const variableRegex = /\b(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  // Regex to match values (strings, numbers, booleans, null, undefined)
  const valueRegex =
    /("[^"]*"|'[^']*'|\b\d+\b|\btrue\b|\bfalse\b|null|undefined)/g;

  // Apply replacements
  let highlightedCode = code
    .replace(variableRegex, (match, p1, p2) => {
      return `${p1} <span class="canvas-var">${p2}</span>`;
    })
    .replace(valueRegex, (match) => {
      return `<span class="canvas-value">${match}</span>`;
    });

  return (
    <div className="canvas-code-block">
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};
// --------------------------------------------------------

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

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sidebar toggle listener
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      const { isMobile, isOpen, isCollapsed } = event.detail;
      if (isMobile) {
        setSidebarMobileOpen(isOpen);
      } else {
        setSidebarCollapsed(isCollapsed);
      }
    };
    document.addEventListener("sidebarToggle", handleSidebarToggle);
    return () =>
      document.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  // Prefill input on card click
  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarMobileOpen(!sidebarMobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }

    const event = new CustomEvent("toggleSidebar", {
      detail: {
        isMobile,
        isOpen: isMobile ? !sidebarMobileOpen : false,
        isCollapsed: !isMobile ? !sidebarCollapsed : false,
      },
    });
    document.dispatchEvent(event);
  };

  // Enter to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onSent();
    }
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

  const iconStyle = {
    filter: "brightness(0) invert(1)",
    width: "24px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
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
    pointerEvents: "none",
  };

  const mainClasses = `main ${sidebarCollapsed ? "sidebar-collapsed" : ""}`;

  // Render text + custom canvas code
  const renderMessage = (message) => {
    if (!message) return null;
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message)) !== null) {
      const [fullMatch, , code] = match;

      // Text before code
      if (match.index > lastIndex) {
        const text = message.slice(lastIndex, match.index);
        parts.push(
          <div
            key={lastIndex}
            className="text-block"
            dangerouslySetInnerHTML={{
              __html: text
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                .replace(/\*(.*?)\*/g, "<i>$1</i>")
                .replace(/^### (.*$)/gim, "<h3>$1</h3>")
                .replace(/^## (.*$)/gim, "<h2>$1</h2>")
                .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                .replace(/\n/g, "<br/>"),
            }}
          />
        );
      }

      // Code block with our CanvasCodeBlock
      parts.push(
        <div className="code-block" key={match.index}>
          <CanvasCodeBlock code={code.trim()} />
        </div>
      );

      lastIndex = match.index + fullMatch.length;
    }

    // Remaining text
    if (lastIndex < message.length) {
      parts.push(
        <div
          key={lastIndex}
          className="text-block"
          dangerouslySetInnerHTML={{
            __html: message
              .slice(lastIndex)
              .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
              .replace(/\*(.*?)\*/g, "<i>$1</i>")
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^# (.*$)/gim, "<h1>$1</h1>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      );
    }

    return parts;
  };

  return (
    <div className={mainClasses} style={backgroundStyle}>
      {/* Background */}
      <div style={{ ...iframeContainerStyle, overflow: "hidden", zIndex: -1 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            filter: "blur(5px)",
            transform: "scale(1.05)",
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

      {/* Navbar */}
      <div className="nav">
        {isMobile && (
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="nav-menu-icon"
            onClick={toggleSidebar}
          />
        )}
        <p>Neura_Chat</p>
        <img src="/me.jpg" alt="User" />
      </div>

      {/* Content */}
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
                <div className="chat-output">{renderMessage(resultData)}</div>
              )}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              style={{ color: "white" }}
            />
            <div className="icons">
              <img src={assets.gallery_icon} alt="Gallery" style={iconStyle} />
              <img src={assets.mic_icon} alt="Mic" style={iconStyle} />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={() => onSent()}
                style={iconStyle}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Neura_Chat may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
