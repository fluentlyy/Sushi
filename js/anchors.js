/* let anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

for (let anchorn of anchors) {
  anchorn.addEventListener("click", function (e) {
    e.preventDefault();

    const blockId = anchorn.getAttribute("href").substring(1);
    const target = document.getElementById(blockId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
} */
