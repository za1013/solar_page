const header = document.getElementById("header");

new fullpage("#body_container", {
  sectionSelector: ".section",
  navigation: true,
  scrollingSpeed: 1200,
  scrollOverflow: false,

  anchors: [
    "first_page",
    "second_page",
    "third_page",
    "fourth_page",
    "fifth_page",
    "sixth_page",
    "seventh_page",
    "footer_page",
  ],

  lazyLoading: true,

  afterLoad: (origin, dest, direction) => {
    if (dest.anchor === "second_page" || dest.anchor === "footer_page") {
      header.classList.add("black_theme");
    } else {
      header.classList.remove("black_theme");
    }
  },
});
