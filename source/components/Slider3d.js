import Component from "../core/Component.js";
import App from "../App.js";
import MusicPlayer from "./MusicPlayer.js";

export default class Slider3D extends Component {
    template() {
        //임시??
        const list = [1, 2, 3, 4, 5];
        const listMap = list
            .map(
                (item, index) => `
                <div class="carousel_cell ${index == 0 ? `active` : ""}">
                    <div class="album_list">${item}</div>
                    <div class="artist_img"></div>
                </div>
                `,
            )
            .join("");

        return `
        <div class="slider_warp">
            <div class="wrapper">
                <div class="controls">
                    <div class="controls__left">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#F9F8F6"><path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
                    </div>
                    <div class="controls__right">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#F9F8F6"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </div>
                </div>
                <div class="slides-holder">
                    <div class="slides-holder__item slides-holder__item_active">
                        1
                    </div>
                    <div class="slides-holder__item">a</div>
                    <div class="slides-holder__item">b</div>
                    <div class="slides-holder__item">c</div>
                    <div class="slides-holder__item">d</div>
                    <div class="slides-holder__item">e</div>
                </div>
                <div class="descriptions">
                    <div class="descriptions__item descriptions__item_visible">
                        <h1>Slide 1</h1>
                        <p class="description">Desc 1</p>
                    </div>
                    <div class="descriptions__item">
                        <h1>Slide 2</h1>
                        <p class="description">Desc 2</p>
                    </div>
                    <div class="descriptions__item">
                        <h1>Slide 3</h1>
                        <p class="description">Desc 3</p>
                    </div>
                    <div class="descriptions__item">
                        <h1>Slide 4</h1>
                        <p class="description">Desc 4</p>
                    </div>
                    <div class="descriptions__item">
                        <h1>Slide 5</h1>
                        <p class="description">Desc 1</p>
                    </div>
                    <div class="descriptions__item">
                        <h1>Slide 6</h1>
                        <p class="description">Desc 1</p>
                    </div>
                </div>
            </div>
        </div>
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
        //3d part
        let carousel,
            cells,
            cellWidth,
            radius,
            theta,
            timer,
            selectedIndex = 0,
            currSlide = 0,
            prevSlide = 0;

        function setCells() {
            carousel = document.querySelector(".carousel");
            cells = document.querySelectorAll(".carousel_cell");
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

        this.addEvent("click", ".previous-button", () => {
            rotateCarousel(-1);
        });
        this.addEvent("click", ".next-button", () => {
            rotateCarousel(1);
        });

        this.addEvent("click", ".goMain", (e) => {
            new App(document.querySelector("#app"));
        });
        this.addEvent("click", ".goMain2", (e) => {
            new MusicPlayer(document.querySelector("#fixed"), cellWidth);
        });

        //circle part

        let slider = document.querySelector(".slider_warp");
        let wrapper = document.querySelector(".wrapper");
        let slides = document.querySelectorAll(".slides-holder__item");
        let descriptionsHolder = document.querySelector(".descriptions");
        let descriptions = document.querySelectorAll(".descriptions__item");
        let slidesHolder = document.querySelector(".slides-holder");
        let btnLeft = document.querySelector(".controls__left");
        let btnRight = document.querySelector(".controls__right");

        let stepAngle = (2 * Math.PI) / slides.length,
            slideSize = 0.2,
            slidesSize,
            animationDuration = 600,
            currentAngle = 0,
            currentSlide = 0,
            previousSlide = 0;

        slidesHolder.style.transitionDuration = `${animationDuration}ms`;

        function slideResize() {
            let radius,
                w = slider.getBoundingClientRect().width,
                h = slider.getBoundingClientRect().height;

            w > h ? (radius = w / 2) : (radius = h / 1.6);

            setSlideSize(Math.round(radius));
        }
        function setSlideSize(radius) {
            // wrapper.style.width = `${radius * 2}px`;
            wrapper.style.width = `1000px`;
            wrapper.style.height = `1000px`;
            // wrapper.style.height = `${radius * 2}px`;

            let r = 2 * radius * (1 - slideSize);
            // slidesHolder.style.width = `${r}px`;
            slidesHolder.style.width = `800px`;
            slidesHolder.style.height = `800px`;
            // slidesHolder.style.height = `${r}px`;
            slidesRepositioning(r / 2);

            // descriptionsHolder.style.width = (r / 2 - r * slideSize) * 2 + "px";
            descriptionsHolder.style.width = "300px";
            descriptionsHolder.style.height = "300px";
            // descriptionsHolder.style.height = r / 2 - r * slideSize + "px";

            // slidesSize = Math.max(stepAngle * radius * (1 - slideSize) - 200);
            slidesSize = 300;

            descriptionsHolder.style.fontSize =
                window.innerHeight < window.innerWidth ? "1.2vh" : "1.2vw";
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.width = slides[i].style.height =
                    slidesSize + "px";
            }
        }
        function slidesRepositioning(radius) {
            for (let i = 0; i < slides.length; i++) {
                let x = radius * Math.cos(stepAngle * i - Math.PI / 2),
                    y = radius * Math.sin(stepAngle * i - Math.PI / 2);
                slides[i].style.transform = `translate(${x}px,${y}px) rotate(${
                    ((stepAngle * 180) / Math.PI) * i - 90
                }deg)`;
            }
        }
        function slideRotate(multiplier) {
            removeStyle();

            if (currentSlide === slides.length - 1 && multiplier === -1) {
                slidesHolder.style.transform = "rotate( -360deg )";
                currentSlide = 0;
                currentAngle = 0;
                addActiveStyle();

                setTimeout(() => {
                    slidesHolder.style.transitionDuration = 0 + "s";
                    slidesHolder.style.transform = `rotate(${currentAngle}deg)`;
                    setTimeout(function () {
                        slidesHolder.style.transitionDuration =
                            animationDuration + "ms";
                    }, 20);
                }, animationDuration);
            } else if (currentSlide === 0 && multiplier === 1) {
                slidesHolder.style.transform = `rotate(${
                    (stepAngle * 180) / Math.PI
                }deg )`;
                currentSlide = slides.length - 1;
                currentAngle = (-(2 * Math.PI - stepAngle) * 180) / Math.PI;
                addActiveStyle();

                setTimeout(function () {
                    slidesHolder.style.transitionDuration = 0 + "s";
                    slidesHolder.style.transform = `rotate(${currentAngle}deg)`;
                    setTimeout(function () {
                        slidesHolder.style.transitionDuration =
                            animationDuration + "ms";
                    }, 20);
                }, animationDuration);
            } else {
                currentSlide -= multiplier;
                currentAngle += ((stepAngle * 180) / Math.PI) * multiplier;
                slidesHolder.style.transform = `rotate(${currentAngle}deg)`;
                addActiveStyle();
            }
        }

        function removeStyle() {
            let x = currentSlide;

            descriptions[x].classList.remove("descriptions__item_visible");
            slides[x].classList.remove("slides-holder__item_active");
            slides[x].style.height = slides[x].style.width = slidesSize + "px";
        }
        function addActiveStyle() {
            let x = currentSlide;

            descriptions[x].classList.add("descriptions__item_visible");
            slides[x].classList.add("slides-holder__item_active");
            slides[x].style.height = slides[x].style.width =
                slidesSize + 40 + "px";
        }

        setTimeout(() => {
            btnRight.addEventListener("click", () => {
                slideRotate(-1);
            });
        }, animationDuration);
        setTimeout(() => {
            btnLeft.addEventListener("click", () => {
                slideRotate(1);
            });
        }, animationDuration);

        //default setting
        setCarousel();
        slideResize();

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCarousel();
                slideResize();
            }, 200);
        };
    }
}
