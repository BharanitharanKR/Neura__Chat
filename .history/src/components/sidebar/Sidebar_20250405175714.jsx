import { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import { Context } from "../../context/Context";

// Define assets directly with public paths
const assets = {
  menu_icon: "/assets/menu_icon.png",
  plus_icon: "/assets/plus_icon.png",
  message_icon: "/assets/message_icon.png",
  question_icon: "/assets/question_icon.png",
  history_icon: "/assets/history_icon.png",
  setting_icon: "/assets/setting_icon.png",
};

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Check if mobile viewport on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isMobile && extended) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".sidebar")) {
          setExtended(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobile, extended]);

  const loadPreviousPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    if (isMobile) setExtended(false);
  };

  return (
    <div
      className={`sidebar ${extended ? "extended" : ""} ${
        isMobile ? "mobile" : ""
      }`}
    >
      <div className="top">
        <img
          src={assets.menu_icon}
          className="menu"
          alt="menu-icon"
          onClick={(e) => {
            e.stopPropagation();
            setExtended((prev) => !prev);
          }}
        />
        <div className="new-chat">
          <img
            src={assets.plus_icon}
            alt="New chat"
            onClick={() => {
              newChat();
              if (isMobile) setExtended(false);
            }}
          />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPreviousPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help desk</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History" />
          {extended && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
