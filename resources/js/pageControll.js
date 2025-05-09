const sections = document.querySelectorAll(".section");
const header = document.getElementById("header");
const menu_item_list = document.querySelectorAll(".menu_item");

let current = 0;
let isScrolling = false;

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animateScroll(time) {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easing = easeInOutQuad(progress);

    window.scrollTo(0, startY + distance * easing);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      isScrolling = false;
    }
  }

  requestAnimationFrame(animateScroll);
}

window.addEventListener("touchmove", (e) => {
  e.preventDefault()

  if (isScrolling) return;

  if (e.deltaY > 0 && current < sections.length - 1) {
    sections[current].classList.remove("visited_page");
    current++;
    sections[current].classList.add("visited_page");
  } else if (e.deltaY < 0 && current > 0) {
    sections[current].classList.remove("visited_page");
    current--;
    sections[current].classList.add("visited_page");
  } else {
    return;
  }

  if ((current === 1) | (current === 7)) {
    header.classList.add("black_theme");
  } else {
    header.classList.remove("black_theme");
  }

  isScrolling = true;
  const targetOffset = sections[current].offsetTop;
  smoothScrollTo(targetOffset, 1200); // 원하는 스크롤 시간 설정
}, { passive:false})

window.addEventListener("scroll", (e) => {
  e.preventDefault()
}, { passive:false})

window.addEventListener("wheel", (e) => {
  e.preventDefault()

  console.log("Event Wheel")
  if (isScrolling) return;

  if (e.deltaY > 0 && current < sections.length - 1) {
    sections[current].classList.remove("visited_page");
    current++;
    sections[current].classList.add("visited_page");
  } else if (e.deltaY < 0 && current > 0) {
    sections[current].classList.remove("visited_page");
    current--;
    sections[current].classList.add("visited_page");
  } else {
    return;
  }

  if ((current === 1) | (current === 7)) {
    header.classList.add("black_theme");
  } else {
    header.classList.remove("black_theme");
  }

  isScrolling = true;
  const targetOffset = sections[current].offsetTop;
  smoothScrollTo(targetOffset, 1200); // 원하는 스크롤 시간 설정
}, {passive:false});

for (let i = 0; i < menu_item_list.length; i++) {
  let item_link = menu_item_list[i].querySelector("a");

  item_link.addEventListener("click", (e) => {
    e.preventDefault();

    if (current !== i) {
      sections[current].classList.remove("visited_page");
      current = i;
      sections[current].classList.add("visited_page");
    } else {
      return;
    }

    if ((current === 1) | (current === 7)) {
      header.classList.add("black_theme");
    } else {
      header.classList.remove("black_theme");
    }

    isScrolling = true;
    const targetOffset = sections[current].offsetTop;
    smoothScrollTo(targetOffset, 1200);
  });
}
// 페이지 로드 시 초기 위치
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
})
