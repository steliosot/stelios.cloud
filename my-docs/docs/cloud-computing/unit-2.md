# Unit 2

---
title: Stroke Button Demo
hide: [navigation, toc]
---

<!-- ==================== STYLES ==================== -->
<style>
/* === Background for preview (optional) === */
html[data-md-path$="button-demo"]::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("/assets/home-bg.png") center/cover no-repeat;
  z-index: -2;
}

/* === Base layout === */
body, .md-main, .md-content {
  background: transparent !important;
}
.demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  gap: 2rem;
  color: #fff;
  text-align: center;
}

/* === STROKE BUTTON STYLE === */
.stroke-button {
  position: relative;
  display: inline-block;
  padding: 0.7rem 1.4rem;
  color: #f2f6a0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 8px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s ease;
}

/* faint abstract strokes */
.stroke-button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
      75deg,
      rgba(255,255,255,0.07) 0px,
      rgba(255,255,255,0.07) 1px,
      transparent 1px,
      transparent 6px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.05) 0px,
      rgba(255,255,255,0.05) 2px,
      transparent 2px,
      transparent 10px
    );
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.4;
}

/* Hover glow */
.stroke-button:hover {
  border-color: rgba(255,255,255,0.6);
  box-shadow: 0 0 8px rgba(255,255,255,0.2);
  transform: translateY(-1px);
}

/* === BLENDED BUTTON (inherits background texture) === */
.texture-button {
  position: relative;
  color: #fff;
  font-weight: 500;
  padding: 0.8rem 1.6rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  backdrop-filter: blur(2px) brightness(1.1);
  mix-blend-mode: lighten;
  transition: all 0.3s ease;
  text-decoration: none;
}

.texture-button:hover {
  border-color: rgba(255,255,255,0.4);
  backdrop-filter: blur(3px) brightness(1.3);
  transform: translateY(-1px);
}

/* === Animated shimmer for the stroke button === */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

.stroke-animated::before {
  animation: shimmer 5s linear infinite;
  background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255,255,255,0.08) 20%,
      transparent 40%
    ),
    repeating-linear-gradient(
      70deg,
      rgba(255,255,255,0.05) 0,
      rgba(255,255,255,0.05) 1px,
      transparent 2px,
      transparent 6px
    );
  background-size: 200% 100%;
  mix-blend-mode: overlay;
  opacity: 0.4;
}
</style>

<!-- ==================== DEMO ==================== -->
<div class="demo-container">
  <h1>Stroke Button Demo</h1>
  <a href="#" class="stroke-button">Static Stroke</a>
  <a href="#" class="stroke-button stroke-animated">Animated Stroke</a>
  <a href="#" class="texture-button">Blended Texture</a>
</div>
