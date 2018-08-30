<template>
  <div class="main" v-bind:style="{backgroundColor: backColor}">
    <button class="home" v-on:click="$router.push('/')">Back</button>
    <div class="optionsPane">
      <input class="colorInput" type="color" @change="updateColor($event)" value="#5e96a2"/>
      <input class="exampleInput" v-model="example" placeholder="example text" />
    </div>
    <div class="example" v-bind:style="{color: displayColor, backgroundColor: backColor}"><span>{{example}}</span></div>
  </div>
</template>

<script>
import brain from 'brain.js'
export default {
  name: 'color',
  data: function () {
    return {
      displayColor: '',
      example: 'Example Text',
      backColor: '#5e96a2',
      rgb: {},
      network: {}
    }
  },
  created () {
    let vue = this
    vue.createNetwork()
  },
  watch: {
    backColor () {
      let vue = this
      vue.rgb = vue.getRgb(vue.backColor)
      const result = brain.likely(vue.rgb, vue.network)
      console.log(result)
      vue.displayColor = result === 'dark' ? 'white' : 'black'
    }
  },
  methods: {
    createNetwork () {
      let vue = this
      vue.network = new brain.NeuralNetwork()
      console.log('training')
      vue.network.train([
        { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
        { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
        { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
        { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
        { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
        { input: {r: 1, g: 0.99, b: 0}, output: { light: 1 } },
        { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } }
      ])
      console.log('training complete')
    },
    updateColor (value) {
      let vue = this
      vue.backColor = value.target.value
    },
    getRgb (hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b
      })

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100
      } : null
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-columns: 5vw 90vw 5vw;
    grid-template-rows: 15vh 20vh 15vh 50vh;
  }

  button {
    color: black;
    background: white;
    border: none;
    border-radius: 10vh;
    height: 8vh;
    border: 2px solid #808080;
    align-self: center;
    justify-self: center;
    font-weight: 300;
    font-size: 1em;
  }

  button.home {
    grid-column: 2;
    grid-row: 1;
    width: 24vw;
    height: 8vh;
    align-self: start;
    justify-self: right;
    margin-top: 3vh;
  }

  .optionsPane {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    width: 80vw;
    align-self: center;
    justify-self: center;
    background-color: white;
    border: 2px solid #808080;
    border-radius: 10px;
    grid-template-rows: repeat(2, 10vh);
  }

  .colorInput {
    grid-row: 1;
    width: 60vw;
    height: 6vh;
    align-self: center;
    border-radius: 2vw;
    justify-self: center;
  }

  .exampleInput {
    grid-row: 2;
    width: 60vw;
    height: 6vh;
    align-self: center;
    border-radius: 2vw;
    padding-left: 2vw;
    justify-self: center;
  }

  .home {
    grid-row: 3;
    width: 60vw;
    height: 4vh;
    text-align: center;
    align-self: center;
    justify-self: center;
  }

  .example {
    grid-column: 2;
    grid-row: 4;
    text-align: center;
  }

  .example span {
    font-size: 3em;
    font-weight: 300;
    vertical-align: middle;
  }

  @media only screen and (min-width: 768px) {
    .optionsPane {
      width: 50vw;
      border: 5px solid #808080;
    }

    .optionsPane input {
      width: 40vw;
    }

    .colorInput  {
      padding: 7px;
    }

    .exampleInput {
      font-size: 2em;
    }

    button.home {
      font-size: 2em;
      border: 5px solid #808080;
    }

    .example span {
      font-size: 5em;
    }
  }

  @media only screen and (min-width: 1024px) {
    .main {
      grid-template-rows: 15vh 30vh 5vh 50vh;
    }
    .optionsPane {
      width: 35vw;
      grid-template-rows: repeat(2, 15vh);
    }

    .optionsPane input {
      width: 25vw;
      height: 8vh;
    }

    .colorInput  {
      padding: 7px;
    }

    .exampleInput {
      font-size: 2em;
    }

    button.home {
      width: 12vw;
      font-size: 2em;
      border: 5px solid #808080;
    }

    .example span {
      font-size: 5em;
    }
  }
</style>
