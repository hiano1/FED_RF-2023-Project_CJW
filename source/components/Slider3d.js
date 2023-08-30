import Component from "../core/Component.js";
import App from "../App.js";

export default class Slider3D extends Component {
    template() {
        //임시??
        const list = [1, 2, 3, 4, 5];
        const listMap = list
            .map((item) => `<div class="carousel__cell">${item}</div>`)
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
    `;
    }
    // <button class="goMain">페이지 이동</button>

    setEvent() {
        const carousel = document.querySelector(".carousel");
        const cells = document.querySelectorAll(".carousel__cell");
        const cellWidth = carousel.offsetWidth;
        let selectedIndex = 0,
            radius,
            theta;

        function rotateCarousel() {
            let angle = theta * selectedIndex * -1;
            carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
        }

        this.addEvent("click", ".previous-button", () => {
            selectedIndex--;
            rotateCarousel();
        });

        this.addEvent("click", ".next-button", () => {
            selectedIndex++;
            rotateCarousel();
        });

        (function setCarousel() {
            const cellCount = cells.length;
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
        })();
        //클릭 리랜더 테스트
        this.addEvent("click", ".goMain", (e) => {
            // e.preventDefault();
            new App(document.querySelector("#app"));
        });

        //드래그 진행중...
        let isDown = false;
        let startX;
        let scrollLeft;
        const slider = document.querySelector(".carousel");

        const end = () => {
            isDown = false;
            slider.classList.remove("active");
        };

        const start = (e) => {
            isDown = true;
            slider.classList.add("active");
            startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const move = (e) => {
            if (!isDown) return;

            e.preventDefault();
            const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            const dist = x - startX;
            slider.scrollLeft = scrollLeft - dist;
        };

        (() => {
            slider.addEventListener("mousedown", start);
            slider.addEventListener("touchstart", start);

            slider.addEventListener("mousemove", move);
            slider.addEventListener("touchmove", move);

            slider.addEventListener("mouseleave", end);
            slider.addEventListener("mouseup", end);
            slider.addEventListener("touchend", end);
        })();
    }
}
