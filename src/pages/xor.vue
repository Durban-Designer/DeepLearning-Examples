<template>
  <div class="main">
    <div class="success" v-if="modal==='success'">
      <h1>Example Results</h1>
      <div class="xorResult xor1">
        <h4>input:</h4>
        <h5>[0, 1]</h5>
        <h4>result:</h4>
        <h5>{{results[0]}}</h5>
      </div>
      <div class="xorResult xor2">
        <h4>input:</h4>
        <h5>[1, 0]</h5>
        <h4>result:</h4>
        <h5>{{results[1]}}</h5>
      </div>
      <div class="xorResult xor3">
        <h4>input:</h4>
        <h5>[1, 1]</h5>
        <h4>result:</h4>
        <h5>{{results[2]}}</h5>
      </div>
      <div class="xorResult xor4">
        <h4>input:</h4>
        <h5>[0, 0]</h5>
        <h4>result:</h4>
        <h5>{{results[3]}}</h5>
      </div>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="training" v-else-if="modal==='training'">
      <div class="static"></div>
      <transition name="slide"><div class="slide slide1" v-if="show === 0"></div></transition>
      <transition name="slide"><div class="slide slide2" v-if="show === 1"></div></transition>
      <transition name="slide"><div class="slide slide3" v-if="show === 2"></div></transition>
      <transition name="slide"><div class="slide slide4" v-if="show === 3"></div></transition>
      <transition name="slide"><div class="slide slide5" v-if="show === 4"></div></transition>
      <transition name="slide"><div class="slide slide6" v-if="show === 5"></div></transition>
      <transition name="slide"><div class="slide slide7" v-if="show === 6"></div></transition>
      <transition name="slide"><div class="slide slide8" v-if="show === 7"></div></transition>
      <transition name="slide"><div class="slide slide9" v-if="show === 8"></div></transition>
      <transition name="slide"><div class="slide slide10" v-if="show === 9"></div></transition>
      <button class="test" v-on:click="modal='success'; clearInterval(toggleShow())" v-if="success">Test</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="else" v-else>
      <h1>Xor Example</h1>
      <button class="create" v-on:click="createXor()">Create Network</button>
      <button class="back" v-on:click="$router.push('/')">Back</button>
    </div>
  </div>
</template>

<script>
import { Layer, Network } from 'synaptic'
export default {
  name: 'xor',
  data: function () {
    return {
      show: 0,
      success: false,
      modal: '',
      results: [],
      toggle: ''
    }
  },
  methods: {
    toggleShow () {
      let vue = this
      if (vue.show === 0) {
        vue.show = 1
      } else if (vue.show === 1) {
        vue.show = 2
      } else if (vue.show === 2) {
        vue.show = 3
      } else if (vue.show === 3) {
        vue.show = 4
      } else if (vue.show === 4) {
        vue.show = 5
      } else if (vue.show === 5) {
        vue.show = 6
      } else if (vue.show === 6) {
        vue.show = 7
      } else if (vue.show === 7) {
        vue.show = 8
      } else if (vue.show === 8) {
        vue.show = 9
      } else if (vue.show === 9) {
        vue.show = 0
      }
    },
    createXor () {
      let vue = this
      setInterval(vue.toggleShow, 800)
      vue.modal = 'training'
      const inputLayer = new Layer(2)
      const hiddenLayer = new Layer(8)
      const outputLayer = new Layer(1)
      inputLayer.project(hiddenLayer)
      hiddenLayer.project(outputLayer)
      var localNetworkInstance = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
      })
      const learningRate = 0.3
      for (let i = 0; i < 2000; i++) {
        localNetworkInstance.activate([0, 0])
        localNetworkInstance.propagate(learningRate, [0])
        localNetworkInstance.activate([1, 0])
        localNetworkInstance.propagate(learningRate, [1])
        localNetworkInstance.activate([0, 1])
        localNetworkInstance.propagate(learningRate, [1])
        localNetworkInstance.activate([1, 1])
        localNetworkInstance.propagate(learningRate, [0])
      }
      this.testXor(localNetworkInstance)
    },
    testXor (network) {
      let vue = this
      var testResults = []
      testResults[0] = network.activate([0, 1])
      testResults[1] = network.activate([1, 0])
      testResults[2] = network.activate([1, 1])
      testResults[3] = network.activate([0, 0])
      vue.results = testResults
      vue.success = true
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  width: 100%;
  color: white;
  z-index: 0;
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

button {
  border-radius: 10vw;
  border: 1px solid white;
  background-color: transparent;
  color: white;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

button.back {
  grid-column: 2;
  grid-row: 1;
  width: 24vw;
  height: 8vh;
  align-self: start;
  justify-self: right;
  margin-top: 3vh;
}

.success {
  display: grid;
  grid-template-columns: 5vw 90vw 5vw;
  grid-template-rows: 24vh 4vh repeat(4, 14vh 2vh) 8vh;
}

.success h1 {
  grid-row: 1;
  grid-column: 2;
  align-self: end;
  font-size: 2.4em;
  text-align: center;
}

.xorResult {
  grid-column: 2;
  font-size: 1.75em;
  align-self: center;
  text-align: center;
  justify-self: center;
  background-color: none;
  border-radius: 3vh;
  border: 1px white solid;
  display: grid;
  grid-template-columns: 30vw 60vw;
  grid-template-rows: repeat(2, 7vh)
}

.xorResult h4 {
  grid-row: 1;
  font-size: .9em;
  align-self: start;
  text-align: left;
  padding-left: 3vw;
  text-decoration: underline;
  opacity: 1;
}

.xorResult h5 {
  grid-row: 2;
  font-size: .475em;
  align-self: start;
  text-align: left;
  padding-left: 3vw;
  opacity: 1;
}

.xor1 {
  grid-row: 3
}

.xor2 {
  grid-row: 5;
}

.xor3 {
  grid-row: 7;
}

.xor4 {
  grid-row: 9;
}

.else {
  display: grid;
  grid-template-columns: 5vw 90vw 5vw;
  grid-template-rows: 20vh 15vh 5vh repeat(5, 12vh);
  text-align: center;
}

.else h1 {
  grid-column: 2;
  grid-row: 2;
  font-size: 3em;
  align-self: center;
}

.create {
  grid-column: 2;
  grid-row: 6;
  height: 8vh;
  width: 90vw;
  align-self: center;
  justify-self: center;
}

.training {
  display: grid;
  grid-template-columns: 5vw 90vw 5vw;
  grid-template-rows: 10vh 70vh 20vh;
}

.slide, .static {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  grid-column: 2;
  grid-row: 2;
}

.training .test {
  grid-column: 2;
  grid-row: 3;
  height: 8vh;
  width: 90vw;
  justify-self: center;
  align-self: start;
}

.static {
  background-image: url('../assets/static.svg');
  z-index: 1;
}

.slide1 {
  background-image: url('../assets/net1.svg');
  z-index: 2;
}

.slide2 {
  background-image: url('../assets/net2.svg');
  z-index: 3;
}

.slide3 {
  background-image: url('../assets/net3.svg');
  z-index: 4;
}

.slide4 {
  background-image: url('../assets/net4.svg');
  z-index: 5;
}

.slide5 {
  background-image: url('../assets/net5.svg');
  z-index: 6;
}

.slide6 {
  background-image: url('../assets/net6.svg');
  z-index: 7;
}

.slide7 {
  background-image: url('../assets/net7.svg');
  z-index: 8;
}

.slide8 {
  background-image: url('../assets/net8.svg');
  z-index: 9;
}

.slide9 {
  background-image: url('../assets/net9.svg');
  z-index: 10;
}

.slide10 {
  background-image: url('../assets/net10.svg');
  z-index: 11;
}

.slide-enter-active, .slide-leave-active {
  transition: opacity .25s cubic-bezier(.5,.25,.5,.75);
}

.slide-enter {
  opacity: 0.5;
}

.slide-leave-to {
  opacity: 0.5;
}

@media only screen and (min-width: 375px) {
  .else h1 {
    font-size: 4em;
  }

  button {
    font-size: 1.375em;
  }

  .xorResult h5 {
    align-self: center;
    font-size: .625em;
  }
}

@media only screen and (min-width: 768px) {
  button {
    font-size: 2em;
  }

  .else {
    grid-template-rows: 20vh 15vh repeat(5, 15vh);

  }
  .else h1 {
    font-size: 6em;
  }

  .create {
    grid-row: 5;
    width: 50vw;
  }

  .training {
    grid-template-rows: 12vh 68vh 20vh;
  }

  .training .test {
    width: 30vh;
  }

  .training .back {
    grid-column: 2;
    grid-row: 1;
  }

  .success h1 {
    font-size: 5em
  }

  .xorResult h4 {
    align-self: center;
    font-size: 1.5em;
  }

  .xorResult h5 {
    align-self: center;
    font-size: .8em;
  }
}
@media only screen and (min-width: 1024px) {
  button.back {
    grid-column: 2;
    width: 10vw;
    height: 6vh;
    font-size: 1.5em
  }

  .create {
    width: 25vw;
    font-size: 1.5em;
  }

  .xorResult {
    width: 50vw;
    grid-template-columns: 20vw 30vw;
  }
}
</style>
