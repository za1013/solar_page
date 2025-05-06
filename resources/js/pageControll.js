const sections = document.querySelectorAll('.section');
    let current = 0;
    let isScrolling = false;

    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
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

    window.addEventListener('wheel', (e) => {
      if (isScrolling) return;

      if (e.deltaY > 0 && current < sections.length - 1) {
        sections[current].classList.remove("visited_page")
        current++;
        sections[current].classList.add("visited_page")
      } else if (e.deltaY < 0 && current > 0) {
        sections[current].classList.remove("visited_page")
        current--;
        sections[current].classList.add("visited_page")
      } else {
        return;
      }

      

      isScrolling = true;
      const targetOffset = sections[current].offsetTop;
      smoothScrollTo(targetOffset, 1200); // 원하는 스크롤 시간 설정
    });

    // 페이지 로드 시 초기 위치
    window.scrollTo(0, 0);