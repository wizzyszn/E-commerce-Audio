<template>
    <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="spinner" cx="12" cy="5" rx="5" ry="5" />
    </svg>
  </template>
  
  <style scoped>
  @keyframes spinner_YeBj {
    0% {
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
      cy: 5px;
    }
    46.875% {
      cy: 20px;
      rx: 5px;
      ry: 5px;
    }
    50% {
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
      cy: 20.5px;
      rx: 5.8px;
      ry: 4px;
    }
    53.125% {
      rx: 5px;
      ry: 5px;
    }
    100% {
      cy: 5px;
    }
  }
  
  .spinner {
    animation: spinner_YeBj 0.8s infinite;
    fill: darkgreen; /* Color of the ball */
  }
  </style>
  
  <script>
  export default {
    name: 'Bounce'
  }
  </script>
  