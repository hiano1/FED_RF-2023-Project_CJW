import Component from "../core/Component.js";
import App from "../App.js";
import MusicPlayer from "./MusicPlayer.js";

export default class Slider3D extends Component {
    template() {
        //임시??
        const list = [1, 2, 3, 4, 5];
        const listMap = list
            .map((item) => `<div class="carousel_cell">${item}</div>`)
            .join("");
        return `  
        <div class="scene">
            <div class="carousel">
                ${listMap}
            </div>
        </div>
        <div class="carousel-options">
            <p>
                <button class="previous-button">Previous</button>
                <button class="next-button">Next</button>
            </p>
        </div>              
        <button class="goMain">페이지 이동</button>
        <button class="goMain2">페이지 이동2</button>
    `;
    }

    setEvent() {
        let carousel,
            cells,
            cellWidth,
            selectedIndex = 0,
            radius,
            theta,
            timer;

        function setCells() {
            carousel = document.querySelector(".carousel");
            cells = document.querySelectorAll(".carousel_cell");
            cellWidth = carousel.offsetWidth;
        }

        function rotateCarousel() {
            let angle = theta * selectedIndex * -1;
            carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
        }

        function setCarousel() {
            setCells();
            let cellCount = cells.length;
            theta = 360 / cellCount;
            radius = Math.round(cellWidth / 2 / Math.tan(Math.PI / cellCount));
            for (var i = 0; i < cellCount; i++) {
                var cell = cells[i];
                if (i < cellCount) {
                    var cellAngle = theta * i;
                    cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
                }
            }
            rotateCarousel();
        }

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCarousel();
            }, 100);
        };

        //default setting
        setCarousel();

        this.addEvent("click", ".previous-button", () => {
            selectedIndex--;
            rotateCarousel();
        });
        this.addEvent("click", ".next-button", () => {
            selectedIndex++;
            rotateCarousel();
        });

        this.addEvent("click", ".goMain", (e) => {
            new App(document.querySelector("#app"));
        });
        this.addEvent("click", ".goMain2", (e) => {
            new MusicPlayer(document.querySelector("#fixed"), cellWidth);
        });
    }
}
