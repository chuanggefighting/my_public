export default function Draggable(el, callback) {

  let startX = 0;
  let isTouchStart = false;

  el.addEventListener("touchstart", handleDown);
  window.addEventListener("touchmove", handleMove);
  window.addEventListener('touchend', handleUp);

  function handleDown(e) {
    isTouchStart = true;
    startX = e.touches[0].pageX;
  }

  function handleMove(e) {
    if (isTouchStart) {
      let deltX = e.touches[0].pageX - startX;
      startX = e.touches[0].pageX;
      callback(deltX);
    }
  }

  function handleUp() {
    isTouchStart = false;
  }

  function destroy() {
    el.removeEventListener("touchstart", handleDown);
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener('touchup', handleUp);
  }

  return {
    destroy
  }
}