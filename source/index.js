import MainPage from "./pages/MainPage.js";

document.cookie = "cookie-name=value; SameSite=None; Secure Path=/; Partitioned";
new MainPage(document.querySelector("#app"));
