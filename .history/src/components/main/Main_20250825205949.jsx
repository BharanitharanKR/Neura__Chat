import { useContext, useState, useEffect } from "react";
import "./main.css";
import { Context } from "../../context/Context";

// -------------------- ENHANCED CODE BLOCK COMPONENT --------------------
const CanvasCodeBlock = ({ code, language = "" }) => {
  const highlightCode = (code, lang) => {
    // JavaScript/React specific highlighting
    if (
      lang === "javascript" ||
      lang === "js" ||
      lang === "jsx" ||
      lang === "react" ||
      !lang
    ) {
      return (
        code
          // Keywords
          .replace(
            /\b(const|let|var|function|return|if|else|for|while|import|export|default|from|class|extends|constructor|async|await|try|catch|finally|throw|new|this|super|static|public|private|protected)\b/g,
            '<span class="code-keyword">$1</span>'
          )

          // React/JSX specific
          .replace(
            /\b(useState|useEffect|useContext|useCallback|useMemo|useRef|useReducer|React|Component|render|props|state|setState)\b/g,
            '<span class="code-react">$1</span>'
          )

          // Variable declarations
          .replace(
            /\b(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
            '<span class="code-keyword">$1</span> <span class="code-variable">$2</span>'
          )

          // Function names
          .replace(
            /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
            '<span class="code-function">$1</span>('
          )

          // Strings
          .replace(
            /(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
            '<span class="code-string">$1$2$3</span>'
          )

          // Numbers
          .replace(
            /\b(\d+(?:\.\d+)?)\b/g,
            '<span class="code-number">$1</span>'
          )

          // Comments
          .replace(
            /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
            '<span class="code-comment">$1</span>'
          )

          // Operators
          .replace(
            /([+\-*/%=<>!&|^~?:;,])/g,
            '<span class="code-operator">$1</span>'
          )

          // Brackets and braces
          .replace(/([{}[\]()])/g, '<span class="code-bracket">$1</span>')

          // Boolean values
          .replace(
            /\b(true|false|null|undefined)\b/g,
            '<span class="code-boolean">$1</span>'
          )
      );
    }

    // CSS highlighting
    else if (lang === "css") {
      return code
        .replace(
          /([.#]?[a-zA-Z-]+)\s*{/g,
          '<span class="css-selector">$1</span>{'
        )
        .replace(
          /([a-zA-Z-]+):\s*([^;]+);/g,
          '<span class="css-property">$1</span>: <span class="css-value">$2</span>;'
        )
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
    }

    // HTML highlighting
    else if (lang === "html") {
      return code
        .replace(
          /(&lt;\/?)([a-zA-Z]+)([^&]*?)(&gt;)/g,
          '<span class="html-bracket">$1</span><span class="html-tag">$2</span><span class="html-attribute">$3</span><span class="html-bracket">$4</span>'
        )
        .replace(
          /(<\/?)([a-zA-Z]+)([^>]*?)(>)/g,
          '<span class="html-bracket">$1</span><span class="html-tag">$2</span><span class="html-attribute">$3</span><span class="html-bracket">$4</span>'
        );
    }

    // Python highlighting
    else if (lang === "python" || lang === "py") {
      return code
        .replace(
          /\b(def|class|if|elif|else|for|while|import|from|return|try|except|finally|with|as|lambda|pass|break|continue|global|nonlocal|yield|assert|del|raise|in|not|and|or|is)\b/g,
          '<span class="code-keyword">$1</span>'
        )
        .replace(
          /\b(True|False|None)\b/g,
          '<span class="code-boolean">$1</span>'
        )
        .replace(
          /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          '<span class="code-string">$1$2$3</span>'
        )
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="code-number">$1</span>')
        .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>');
    }

    return code;
  };

  const detectedLanguage = language.toLowerCase();
  const highlightedCode = highlightCode(code, detectedLanguage);

  return (
    <div className="canvas-code-block">
      <div className="code-header">
        <div className="code-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="code-language">{language || "code"}</span>
        <button
          className="code-copy"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

// -------------------- ENHANCED TEXT RENDERING --------------------
const EnhancedTextBlock = ({ text }) => {
  let processedText = text
    // Headers with better styling
    .replace(/^### (.*$)/gim, '<h3 class="text-h3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-h2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-h1">$1</h1>')

    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-bold">$1</strong>')

    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="text-italic">$1</em>')

    // Inline code
    .replace(/`([^`]+)`/g, '<code class="text-inline-code">$1</code>')

    // Lists
    .replace(
      /^\d+\.\s(.+)$/gim,
      '<div class="text-list-item numbered">$1</div>'
    )
    .replace(/^[-*+]\s(.+)$/gim, '<div class="text-list-item bullet">$1</div>')

    // Important/highlighted text (words in ALL CAPS or with emphasis)
    .replace(/\b([A-Z]{2,})\b/g, '<span class="text-important">$1</span>')

    // Line breaks
    .replace(/\n\n/g, '</p><p class="text-paragraph">')
    .replace(/\n/g, "<br/>");

  // Wrap in paragraph if not already wrapped
  if (
    !processedText.includes("<h1") &&
    !processedText.includes("<h2") &&
    !processedText.includes("<h3")
  ) {
    processedText = `<p class="text-paragraph">${processedText}</p>`;
  }

  return (
    <div
      className="enhanced-text-block"
      dangerouslySetInnerHTML={{ __html: processedText }}
    />
  );
};

// -------------------- MAIN COMPONENT --------------------
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

  // Enhanced message rendering with better code and text handling
  const renderMessage = (message) => {
    if (!message) return null;

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message)) !== null) {
      const [fullMatch, language = "", code] = match;

      // Text before code block
      if (match.index > lastIndex) {
        const text = message.slice(lastIndex, match.index).trim();
        if (text) {
          parts.push(
            <EnhancedTextBlock key={`text-${lastIndex}`} text={text} />
          );
        }
      }

      // Code block with enhanced highlighting
      parts.push(
        <CanvasCodeBlock
          key={`code-${match.index}`}
          code={code.trim()}
          language={language}
        />
      );

      lastIndex = match.index + fullMatch.length;
    }

    // Remaining text after last code block
    if (lastIndex < message.length) {
      const remainingText = message.slice(lastIndex).trim();
      if (remainingText) {
        parts.push(
          <EnhancedTextBlock key={`text-${lastIndex}`} text={remainingText} />
        );
      }
    }

    return parts.length > 0 ? parts : <EnhancedTextBlock text={message} />;
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
