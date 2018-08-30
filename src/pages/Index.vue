<template>
  <div class="main">
    <h2>Examples of Machine Learning</h2>
    <button class="xorView" v-on:click="$router.push('/xor')">Xor Example</button>
    <button class="colorView" v-on:click="$router.push('/color')">Color Picker Example</button>
    <button class="chatView" v-on:click="$router.push('/chatBot')">Chat Bot Example</button>
    <button class="cloudView" v-on:click="$router.push('/cloudVision')">Google Cloud Vision Example</button>
  </div>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style scoped lang="less">
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-rows: 20vh 15vh 8vh repeat(4, 12vh);
    grid-template-columns: 5vw 90vw 5vw;
    background: linear-gradient(208deg, #25c4da, #ce28d2, #2db45f, #ff7900);
    background-size: 800% 800%;
    -webkit-animation: AnimationName 15s ease infinite;
    -moz-animation: AnimationName 15s ease infinite;
    animation: AnimationName 15s ease infinite;
  }

  @-webkit-keyframes AnimationName {
      0%{background-position:51% 0%}
      50%{background-position:50% 100%}
      100%{background-position:51% 0%}
  }

  @-moz-keyframes AnimationName {
      0%{background-position:51% 0%}
      50%{background-position:50% 100%}
      100%{background-position:51% 0%}
  }

  @keyframes AnimationName {
      0%{background-position:51% 0%}
      50%{background-position:50% 100%}
      100%{background-position:51% 0%}
  }

  h2 {
    grid-column: 2;
    grid-row: 2;
    font-weight: 300;
    line-height: 7.5vh;
    text-align: center;
    align-self: end;
    font-size: 2em;
    color: white;
    padding: 0;
    margin: 0;
  }

  .xorView {
    grid-column: 2;
    grid-row: 4;
  }

  .colorView {
    grid-column: 2;
    grid-row: 5;
  }

  .chatView {
    grid-column: 2;
    grid-row: 6;
  }

  .cloudView {
    grid-column: 2;
    grid-row: 7;
  }

  button {
    color: white;
    background: transparent;
    border: 2px solid white;
    border-radius: 10vh;
    height: 8vh;
    width: 90vw;
    align-self: center;
    justify-self: center;
    font-weight: 300;
    font-size: 1em;
  }

  @media only screen and (min-width: 375px) {
    h2 {
      font-size: 2.4em;
    }

    button {
      font-size: 1.2em;
    }
  }

  @media only screen and (min-width: 425px) {
    h2 {
      font-size: 2.8em;
    }
  }

  @media only screen and (min-width: 768px) {
    .main {
      grid-template-columns: 10vw 40vw 40vw 10vw;
      grid-template-rows: 15vh 30vh 4vh repeat(2, 20vh);
    }

    h2 {
      font-size: 5em;
      line-height: 15vh;
      grid-column-start: 2;
      grid-column-end: 4;
    }

    button {
      width: 37.5vw;
      font-size: 1.625em;
      height: 10vh;
    }

    .xorView {
      grid-column: 2;
      grid-row: 4;
    }

    .colorView {
      grid-column: 3;
      grid-row: 4;
    }

    .chatView {
      grid-column: 2;
      grid-row: 5;
    }

    .cloudView {
      grid-column: 3;
      grid-row: 5;
    }
  }

  @media only screen and (min-width: 1024px) {
    .main {
      grid-template-columns: 25vw 50vw 25vw;
      grid-template-rows: 15vh 25vh 6vh repeat(4, 12vh);
    }

    h2 {
      font-size: 4em;
      line-height: 15vh;
      grid-column: 2;
    }

    button {
      width: 30vw;
      font-size: 1.2em;
      height: 8vh;
    }

    .xorView {
      grid-column: 2;
      grid-row: 4;
    }

    .colorView {
      grid-column: 2;
      grid-row: 5;
    }

    .chatView {
      grid-column: 2;
      grid-row: 6;
    }

    .cloudView {
      grid-column: 2;
      grid-row: 7;
    }
  }
</style>
