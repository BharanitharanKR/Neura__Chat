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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 600;
      setIsMobile(isMobileView);
      setMobileOpen(false); // Close sidebar on resize
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for toggle events from Main component
  useEffect(() => {
    const handleToggleSidebar = (event) => {
      const { isMobile, isOpen, isCollapsed } = event.detail;
      if (isMobile) {
        setMobileOpen(isOpen);
      } else {
        setCollapsed(isCollapsed);
      }
    };

    document.addEventListener("toggleSidebar", handleToggleSidebar);
    return () =>
      document.removeEventListener("toggleSidebar", handleToggleSidebar);
  }, []);

  useEffect(() => {
    if (isMobile && mobileOpen) {
      const handleClickOutside = (e) => {
        if (
          !e.target.closest(".sidebar") &&
          !e.target.closest(".mobile-menu-toggle")
        ) {
          setMobileOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobile, mobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }

    // Notify Main component about the sidebar state change
    const event = new CustomEvent("sidebarToggle", {
      detail: {
        isMobile,
        isOpen: isMobile ? !mobileOpen : false,
        isCollapsed: !isMobile ? !collapsed : false,
      },
    });
    document.dispatchEvent(event);
  };

  const loadPreviousPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Apply appropriate classes based on state
  const sidebarClasses = `sidebar 
    ${collapsed ? "collapsed" : ""} 
    ${isMobile && mobileOpen ? "mobile-open" : ""}`;

  return (
    <>
      {isMobile && (
        <div className="mobile-menu-toggle" onClick={toggleSidebar}>
          <img src={assets.menu_icon} alt="Menu" />
        </div>
      )}

      {isMobile && mobileOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <div className={sidebarClasses}>
        <div className="top">
          <img
            src={assets.menu_icon}
            className="menu"
            alt="Menu"
            onClick={toggleSidebar}
          />
          <div className="new-chat" onClick={() => newChat()}>
            <img src={assets.plus_icon} alt="New Chat" />
            {!collapsed && <p>New Chat</p>}
          </div>

          {!collapsed && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div
                  key={index}
                  className="recent-entry"
                  onClick={() => loadPreviousPrompt(item)}
                >
                  <img src={assets.message_icon} alt="Message" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bottom">
          <div className="bottom-item">
            <img src={assets.question_icon} alt="Help" />
            {!collapsed && <p>Help desk</p>}
          </div>
          <div className="bottom-item">
            <img src={assets.history_icon} alt="History" />
            {!collapsed && <p>History</p>}
          </div>
          <div className="bottom-item">
            <img src={assets.setting_icon} alt="Settings" />
            {!collapsed && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
