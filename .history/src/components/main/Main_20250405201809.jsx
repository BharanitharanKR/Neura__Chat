/* Reset and basics */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Arial', sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  position: relative;
  z-index: 1;
}

.main.sidebar-collapsed {
  margin-left: 60px;
}

/* Navigation Bar */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-menu-icon {
  width: 25px;
  cursor: pointer;
}

/* Main Content Container */
.main-container {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Greeting box */
.greet {
  font-size: 1.4rem;
  color: white;
}

.greet span {
  font-weight: bold;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card:hover {
  transform: scale(1.03);
}

/* Result styling */
.result {
  color: white;
}

.result-title,
.result-data {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-title img,
.result-data img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

.result-data p {
  line-height: 1.6;
}

/* Loader */
.loader hr {
  border: none;
  height: 4px;
  background: #ccc;
  margin: 6px 0;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

/* Search box and input */
.main-bottom {
  margin-top: auto;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 10px 20px;
  gap: 10px;
}

.search-box input {
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: white;
}

.search-box .icons img {
  width: 20px;
  margin-left: 10px;
  cursor: pointer;
}

/* Bottom Info */
.bottom-info {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}

/* Responsive */
@media screen and (max-width: 600px) {
  .main {
    margin-left: 0;
  }

  .main.sidebar-collapsed {
    margin-left: 0;
  }

  .nav p {
    font-size: 1rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}
