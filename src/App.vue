<template>
  <router-view></router-view>
</template>
<style>
@font-face {
  font-family: 'planet-gamers';
  src: url('/assets/fonts/Planet-Gamers/Planet-Gamers.otf');
  src: url('/assets/fonts/Planet-Gamers/Planet-Gamers.woff');
}

.font-gamers {
  font-family: 'planet-gamers' !important;
}

.color-blue {
  color: #69C9D0 !important;
}

.cursor-auto {
  cursor: auto !important;
}

.color-rojo {
  color: #EE1D52 !important;
}

.color-verde {
  color: #25E007 !important;
}

.text-shadow-green {
  color: #25E007 !important;
  text-shadow: -1px 2px 9px #25E007;
}

.text-shadow-red {
  color: #EE1D52 !important;
  text-shadow: -1px 2px 9px #EE1D52;
}

html,
body,
* {
  scroll-behavior: smooth;
}

.evento .text-inline-evento .p-inline-message-text {
  font-size: 3rem;
}

.app {
  background-color: #000000 !important;
}

.p-inputtext {
  width: 100% !important;
}

@media (max-width: 575px) {
  .xs\:flex-column {
    flex-direction: column !important;
  }

  .xs\:w-full {
    width: 100% !important;
  }

  .xs\:flex-wrap {
    flex-wrap: wrap !important;
  }

  .xs\:text-center {
    text-align: center !important;
  }

  .xs\:justify-content-center {
    justify-content: center !important;
  }

  .xs\:justify-content-start {
    justify-content: flex-start !important;
  }

  .xs\:gap-3 {
    gap: 3rem !important;
  }
}
</style>
