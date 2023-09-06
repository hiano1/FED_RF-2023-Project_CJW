import Component from "../core/Component";

export default class CircleSlider extends Component {
    template() {
        return `
        <div class="slider">
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
        `;
    }

    setEvents() {
        let slider = document.querySelector(".slider");
        let slideSize = 0.2;
        let slidesSize;
        let animationDuration = parseFloat(600);
        let currentAngle = 0;
        let currentSlide = 0;
        let timer;

        let wrapper = document.querySelector(".wrapper");
        let slides = document.querySelectorAll(".slides-holder__item");
        let descriptionsHolder = document.querySelector(".descriptions");
        let descriptions = document.querySelectorAll(".descriptions__item");
        let slidesHolder = document.querySelector(".slides-holder");
        let btnLeft = document.querySelector(".controls__left");
        let btnRight = document.querySelector(".controls__right");

        let stepAngle = (2 * Math.PI) / slides.length;

        slidesHolder.style.transitionDuration = `${animationDuration}ms`;

        function slideResize() {
            let radius,
                w = slider.getBoundingClientRect().width,
                h = slider.getBoundingClientRect().height;

            w > h ? (radius = w / 2) : (radius = h / 1.6);

            setSlideSize(Math.round(radius));
        }
        function setSlideSize(radius) {
            wrapper.style.width = `${radius * 2}px`;
            wrapper.style.height = `${radius * 2}px`;

            let r = 2 * radius * (1 - slideSize);
            slidesHolder.style.width = `${r}px`;
            slidesHolder.style.height = `${r}px`;
            slidesRepositioning(r / 2);

            descriptionsHolder.style.width = (r / 2 - r * slideSize) * 2 + "px";
            descriptionsHolder.style.height = r / 2 - r * slideSize + "px";

            slidesSize = Math.max(stepAngle * radius * (1 - slideSize) - 200);

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
        slideResize();

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                slideResize();
            }, 200);
        };
    }
}
