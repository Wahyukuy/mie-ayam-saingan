const video = document.getElementById('video');
const likeBtn = document.getElementById('likeBtn');
const heart = document.getElementById('heart');
const tapzone = document.getElementById('tapzone');
const viewer = document.getElementById('viewer');

function tryAutoplay() {
  video.play().catch(() => {});
}
tryAutoplay();

let lastTap = 0;
tapzone.addEventListener('click', (e) => {
  const now = Date.now();
  const dt = now - lastTap;
  lastTap = now;

  if (dt < 300) {
    doLike();
    return;
  }

  if (video.paused) video.play();
  else video.pause();
});

let liked = false;
likeBtn.addEventListener('click', (ev) => {
  ev.stopPropagation();
  doLike();
});

function doLike() {
  if (!liked) {
    liked = true;
    likeBtn.innerHTML = '❤️<div style="font-size:12px;margin-top:4px">124</div>';
    pulseHeart();
  } else {
    liked = false;
    likeBtn.innerHTML = '♡<div style="font-size:12px;margin-top:4px">123</div>';
  }
}

function pulseHeart() {
  heart.classList.remove('pop');
  void heart.offsetWidth;
  heart.classList.add('pop');
  setTimeout(() => heart.classList.remove('pop'), 800);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (video.paused) video.play();
    else video.pause();
  }
  if (e.key.toLowerCase() === 'l') doLike();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
});

viewer.addEventListener('mousemove', (ev) => {
  const w = viewer.clientWidth, h = viewer.clientHeight;
  const nx = (ev.clientX / w - 0.5) * 0.02;
  const ny = (ev.clientY / h - 0.5) * 0.02;
  video.style.transform = `scale(1.02) translate(${nx * 100}px, ${ny * 100}px)`;
});
viewer.addEventListener('mouseleave', () => video.style.transform = 'scale(1)');

window.loadLocalVideo = function(file) {
  const url = URL.createObjectURL(file);
  video.src = url;
  video.load();
  video.play().catch(()=>{});
};
