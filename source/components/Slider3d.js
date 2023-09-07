import Component from "../core/Component.js";
import App from "../App.js";
import MusicPlayer from "./MusicPlayer.js";

export default class Slider3D extends Component {
    template() {
        //artist list , album list , track list
        //ari, been, dpr, bruno, newj,
        const list = [1, 2, 3, 4, 5];
        const listMap = list
            .map(
                (item, index) => `
                <div class="carousel_cell ${index == 0 ? "active" : ""}">
                    <div class="album_list">${item}</div>
                    <div class="artist_img"></div>
                </div>
                `,
            )
            .join("");

        const listCircle = [1, 2, 3, 4, 5, 6];
        const CircleMap = listCircle
            .map(
                (item, index) => `
                <div class="circle_item ${index == 0 ? "active" : ""}">
                    <img src="./source/resource/art01.jpg"/>
                    <div class="circle_prev">
                        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
                    </div>
                    <div class="circle_next">
                        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </div>
                </div>
                `,
            )
            .join("");
        const listCircleInfo = [1, 2, 3, 4, 5, 6];
        const CircleInfoMap = listCircleInfo
            .map(
                (item, index) => `
                <div class="circle_info_item ${index == 0 ? "active" : ""}">
                    <p class="circle_info_title">Desc ${item}</p>
                </div>
                    `,
            )
            .join("");

        return `
            <div class="circle_slider">
                <div class="circle_warper">
                    ${CircleMap}
                </div>
                <div class="circle_info">
                    ${CircleInfoMap}
                </div>
            </div>
        <div class="scene">
            <div class="carousel">
                ${listMap}
            </div>
        </div>
        <div class="carousel_control">
            <div class="carousel_prev">
                <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
            </div>
            <div class="carousel_next">
                <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
            </div>
        </div>
    `;
    }

    setEvent() {
        /////////////3D SLIDER//////////////
        let cellWidth,
            radius,
            theta,
            timer,
            selectedIndex = 0,
            currSlide = 0,
            prevSlide = 0;

        let cells = document.querySelectorAll(".carousel_cell");
        let carousel = document.querySelector(".carousel");

        function setCells() {
            cellWidth = carousel.offsetWidth;
        }

        function rotateCarousel(index) {
            let l = cells.length - 1;
            prevSlide = currSlide;
            cells[prevSlide].classList.remove("active");
            if (currSlide == 0 && index == -1) {
                currSlide = l;
            } else if (currSlide == l && index == 1) {
                currSlide = 0;
            } else {
                currSlide += index;
            }
            cells[currSlide].classList.add("active");

            selectedIndex += index;
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
                var cellAngle = theta * i;
                cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
                if (i == 0) {
                    cell.classList.add("active");
                }
            }
            rotateCarousel(0);
        }

        this.addEvent("click", ".carousel_prev", () => {
            rotateCarousel(-1);
        });
        this.addEvent("click", ".carousel_next", () => {
            rotateCarousel(1);
        });
        this.addEvent("click", ".goMain", () => {
            new App(document.querySelector("#app"));
        });
        this.addEvent("click", ".goMain2", () => {
            new MusicPlayer(document.querySelector("#fixed"), cellWidth);
        });

        ///////////////////CIRCLE PART////////////////////////////

        let circle_slider = document.querySelector(".circle_slider");
        let circle_warper = document.querySelector(".circle_warper");
        let circle_items = document.querySelectorAll(".circle_item");
        let circle_info_item = document.querySelectorAll(".circle_info_item");

        let stepAngle = 360 / circle_items.length,
            currentAngle = 0,
            currentSlide = 0,
            previousSlide = 0;

        function setCircleSize() {
            //circle item direction setting
            let radius = window.innerHeight;
            let itemsAngle = (2 * Math.PI) / circle_items.length;

            circle_slider.style.transform = `translateX(-${radius * 0.6}px)`;

            for (let i = 0; i < circle_items.length; i++) {
                let x = (radius / 2) * Math.cos(itemsAngle * i - Math.PI / 2),
                    y = (radius / 2) * Math.sin(itemsAngle * i - Math.PI / 2);
                circle_items[
                    i
                ].style.transform = `translate(${x}px,${y}px) rotate(${
                    ((itemsAngle * 180) / Math.PI) * i - 90
                }deg)`;
            }
            // document.querySelector(
            //     ".circle_info > .active",
            // ).style.transform = `translateX(${window.innerHeight}px)`;
        }

        function slideRotate(index) {
            let l = circle_items.length - 1;
            previousSlide = currentSlide;
            circle_info_item[previousSlide].classList.remove("active");
            circle_items[previousSlide].classList.remove("active");

            if (currentSlide == l && index == 1) {
                currentSlide = 0;
            } else if (currentSlide == 0 && index == -1) {
                currentSlide = l;
            } else {
                currentSlide += index;
            }
            currentAngle += stepAngle * -index;
            circle_warper.style.transform = `rotate(${currentAngle}deg)`;
            circle_info_item[currentSlide].classList.add("active");
            circle_items[currentSlide].classList.add("active");
        }

        this.addEvent("click", ".circle_prev", () => {
            slideRotate(-1);
        });
        this.addEvent("click", ".circle_next", () => {
            slideRotate(1);
        });
        this.addEvent("mouseover", ".circle_item img", (e) => {
            console.log(this.$target);
            console.log("a");
            // this.$target.style.animation = "rotate 3s infinite";
        });

        //default setting
        setCarousel();
        setCircleSize();

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCarousel();
                setCircleSize();
            }, 200);
        };
    }
}
