import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

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

  // Internal CSS styles
  const styles = {
    main: {
      backgroundImage: `url(${assets.g})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "15px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "white",
    },
    navImg: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
    },
    mainContainer: {
      width: "90%",
      maxWidth: "800px",
      textAlign: "center",
    },
    greet: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
    },
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
      marginTop: "20px",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardHover: {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    result: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "20px",
      borderRadius: "10px",
    },
    resultTitle: {
      display: "flex",
      alignItems: "center",
    },
    resultImg: {
      width: "30px",
      height: "30px",
      marginRight: "10px",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "10px",
      borderRadius: "25px",
      width: "100%",
    },
    searchInput: {
      border: "none",
      outline: "none",
      flex: 1,
      padding: "10px",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "25px",
      height: "25px",
      marginLeft: "10px",
      cursor: "pointer",
    },
    bottomInfo: {
      fontSize: "12px",
      color: "white",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.main}>
      <div style={styles.nav}>
        <p>Neura_Chat</p>
        <img src={assets.user} alt="User" style={styles.navImg} />
      </div>

      <div style={styles.mainContainer}>
        {!showResults ? (
          <>
            <div style={styles.greet}>
              <p>
                <span>Hello, Bharani</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div style={styles.cards}>
              <div
                style={styles.card}
                onClick={() =>
                  handleCardClick("Suggest Some Places to Visit in India.")
                }
              >
                <p>Suggest Some Places to Visit in India.</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                style={styles.card}
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
                style={styles.card}
                onClick={() =>
                  handleCardClick(
                    "How do you create a responsive navbar using CSS and JavaScript?"
                  )
                }
              >
                <p>How do you create a responsive navbar using CSS and JavaScript?</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                style={styles.card}
                onClick={() =>
                  handleCardClick(
                    "What are some essential skills for becoming a front-end developer?"
                  )
                }
              >
                <p>What are some essential skills for becoming a front-end developer?</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div style={styles.result}>
            <div style={styles.resultTitle}>
              <img src={assets.user} alt="User" style={styles.resultImg} />
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
          <div style={styles.searchBox}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              style={styles.searchInput}
            />
            <div style={styles.iconContainer}>
              <img src={assets.gallery_icon} alt="Gallery" style={styles.icon} />
              <img src={assets.mic_icon} alt="Mic" style={styles.icon} />
              <img
                src={assets.send_icon}
                alt="Send"
                style={styles.icon}
                onClick={() => onSent()}
              />
            </div>
          </div>
          <div style={styles.bottomInfo}>
            <p>
              Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
