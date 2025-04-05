import "./sidebar.css";
import { useContext, useState } from "react";
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
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPreviousPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top ">
        <img
          src={assets.menu_icon}
          className="menu"
          alt="menu-icon"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        />
        <div className="new-chat">
          <img
            src={assets.plus_icon}
            alt=""
            onClick={() => {
              newChat();
            }}
          />

          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    loadPreviousPrompt(item);
                  }}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help desk</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
