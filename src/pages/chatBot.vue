<template>
  <div class="main" v-bind:style="{color: color}">
    <div ref="pane" class="leftPane" v-if="leftPane">
      <button class="collapsePane" v-on:click="leftPane=!leftPane">toggle</button>
      <button class="home" v-on:click="$router.push('/')">Back</button>
      <input class="input" type="text" maxlength="12" v-model="input" placeholder="Training Input"/>
      <input class="output" type="text" maxlength="12" v-model="output" placeholder="Training Output"/>
      <button class="pushOntoTrain" v-on:click="trainingPush()">Add to Queue</button>
      <button class="reset" v-on:click="reset()">reset</button>
      <h2 class="queue">Training Queue</h2>
      <button class="trainNetwork" v-on:click="trainNetwork()">Train Network</button>
      <div class="headerBox">
        <h4>Input</h4>
        <h4>Output</h4>
      </div>
      <div class="trainingQueueBox">
        <div class="trainCol" v-for="train in trainingSet" v-bind:key="train._id">
          <div class="trainingInput">{{train.input}}</div>
          <div class="trainingOutput">{{train.output}}</div>
          <button class="deleteTraining" v-on:click="deleteTrain(train)">Delete</button>
        </div>
      </div>
    </div>
    <div class="collapsedPane" v-else>
      <button class="collapsePane" v-on:click="leftPane=!leftPane">toggle</button>
    </div>
    <div id="chatPane" class="chatPane">
      <div v-bind:class="messageLogic">
        <div class="message" v-for="message in messages" v-bind:key="message._id">
          <span v-bind:class="{left: message.sender === 'ai', right: message.sender !== 'ai'}">{{message.message}}</span>
        </div>
      </div>
      <input class="chat" v-model="chat" v-on:keyup.enter="chatMethod()" placeholder="Say Hello" />
      <button class="send" v-on:click="chatMethod()">Send</button>
    </div>
  </div>
</template>

<script>
import brain from 'brain.js'
export default {
  name: 'chatBot',
  data: function () {
    return {
      leftPane: true,
      chat: '',
      input: '',
      output: '',
      color: '',
      trained: false,
      iterations: 0,
      network: {},
      trainingSet: [],
      messages: []
    }
  },
  created () {
    let vue = this
    vue.createNetwork()
  },
  computed: {
    messageLogic () {
      let vue = this
      return {
        messagePadTwo: vue.messages.length === 2,
        messagePadFour: vue.messages.length === 4,
        messagePadSix: vue.messages.length === 6,
        messagePadEight: vue.messages.length === 8,
        messagePadTen: vue.messages.length === 10,
        messagePadTwelve: vue.messages.length === 12,
        messagePadFourteen: vue.messages.length === 14,
        messagePadSixteen: vue.messages.length === 16
      }
    }
  },
  methods: {
    createNetwork () {
      let vue = this
      vue.network = new brain.recurrent.LSTM()
    },
    reset () {
      let vue = this
      vue.network = {}
      vue.chat = ''
      vue.input = ''
      vue.output = ''
      vue.iterations = 0
      vue.trainingSet = []
      vue.messages = []
      vue.createNetwork()
    },
    trainingPush () {
      let vue = this
      vue.trainingSet.push({ input: vue.input, output: vue.output })
      vue.input = ''
      vue.output = ''
    },
    deleteTrain (train) {
      let vue = this
      let index = vue.trainingSet.indexOf(train)
      vue.trainingSet.splice(index, 1)
    },
    trainNetwork () {
      let vue = this
      if (vue.trained) {
        vue.createNetwork()
        vue.trained = false
      }
      vue.network.train(vue.trainingSet, { iterations: 2000, errorThresh: 0.012, log: true })
      vue.trained = true
      console.log('done training')
    },
    chatMethod () {
      let vue = this
      let output = vue.network.run(vue.chat)
      vue.messages.push({sender: 'user', message: vue.chat, date: new Date()})
      if (output.includes('stop-input') !== true && output.includes('start-output') !== true && output !== '') {
        vue.messages.push({sender: 'ai', message: output, date: new Date()})
      } else {
        vue.messages.push({sender: 'ai', message: 'Error please use a trained input', date: new Date()})
      }
      vue.chat = ''
      vue.scroll()
    },
    scroll () {
      let chatPane = document.getElementById('chatPane')
      chatPane.scrollTop = chatPane.scrollHeight
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
    grid-template-rows: 40vw 60vw;
    grid-template-rows: 10vh 10vh 40vh 40vh;
  }

  .leftPane {
    grid-row-start: 1;
    grid-row-end: 5;
    grid-column: 1;
    width: 40vw;
    height: 100%;
    display: grid;
    grid-gap: 1vh;
    padding-top: 10vh;
    grid-template-columns: .2fr 1fr 1fr .2fr;
    grid-template-rows: 4vh 4vh 4vh 4vh 10vh 4vh 6vh 46vh 10vh;
    background: linear-gradient(208deg, #25c4da, #ce28d2, #2db45f, #ff7900);
    background-size: 800% 800%;
    -webkit-animation: AnimationName 20s ease infinite;
    -moz-animation: AnimationName 20s ease infinite;
    animation: AnimationName 20s ease infinite;
  }

  .collapsePane {
    display: none;
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

  .training {
    grid-row-start: 1;
    grid-row-end: 8;
    grid-column-start: 1;
    grid-column-end: 5;
    background-color: grey;
    text-align: center;
    vertical-align: middle;
    line-height: 100vh;
    z-index: 5;
  }

  .home {
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  .input {
    grid-row-start: 2;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 4;
    border: none;
    border-radius: 10px;
    padding-left: 10px;
  }

  .output {
    grid-row-start: 3;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 4;
    border: none;
    border-radius: 10px;
    padding-left: 10px;
  }

  .pushOntoTrain {
    grid-row-start: 4;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .reset {
    grid-row-start: 4;
    grid-row-end: 4;
    grid-column-start: 3;
    grid-column-end: 4;
  }

  .queue {
    grid-row: 5;
    grid-column-start: 2;
    grid-column-end: 4;
    text-align: center;
    font-size: 1.5em;
    color: white;
  }

  .trainNetwork {
    grid-row: 6;
    height: 4vh;
    grid-column-start: 2;
    grid-column-end: 4;
    text-align: center;
  }

  .headerBox {
    grid-row: 7;
    grid-column-start: 2;
    grid-column-end: 4;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1vh;
  }

  .headerBox h4 {
    color: white;
    text-decoration: underline;
    font-size: 1.2em;
    height: 4vh;
    line-height: 4vh;
    margin: 0;
    margin-top: 1vh;
    padding: 0;
  }

  .trainingQueueBox {
    grid-row: 8;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  .trainCol {
    display: grid;
    height: 4vh;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 10px;
    font-size: 1.2em;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    overflow: hidden;
  }

  .trainingInput {
    padding-left: 10px;
    line-height: 4vh;
    color: black;
    z-index: 3;
    border-radius: 10px;
  }

  .trainingOutput {
    line-height: 4vh;
    color: black;
    z-index: 3;
    border-radius: 10px;
  }

  .deleteTraining {
    font-size: 1em;
    background-color: none;
    height: 4vh;
    border-left: solid black 1px;
    color: black;
  }

  .deleteTraining:hover {
    background-color: lightGrey;
  }

  .chatPane {
    grid-row-start: 1;
    grid-row-end: 5;
    grid-column: 2;
    background-color: #eaeaea;
    width: 60vw;
    height: 92vh;
    padding-top: 7vh;
    overflow-y: scroll;
  }

  .chat {
    border-top: 1px solid grey;
    padding-left: 20px;
    position: absolute;
    width: 60vw;
    height: 8vh;
    z-index: 4;
    bottom: 0;
    right: 0;
  }

  button.send {
    color: grey;
    border: 1px solid grey;
    background-color: #eaeaea;
    border-radius: 0;
    position: absolute;
    width: 8vw;
    height: 8vh;
    z-index: 4;
    bottom: 0;
    right: 0;
  }

  .message {
    margin-top: 1vh;
    height: 4vh;
    line-height: 4vh;
    vertical-align: middle;
    display: grid;
    grid-template-columns: 1fr .4fr 1fr;
    border-radius: 10px;
  }

  .messagePadTwo {
    margin-top: 70vh;
  }

  .messagePadFour {
    margin-top: 60vh;
  }

  .messagePadSix {
    margin-top: 50vh;
  }

  .messagePadEight {
    margin-top: 40vh;
  }

  .messagePadTen {
    margin-top: 30vh;
  }

  .messagePadTwelve {
    margin-top: 20vh;
  }

  .messagePadFourteen {
    margin-top: 10vh;
  }

  .messagePadSixteen {
    margin-top: 5vh;
  }

  .left {
    margin-left: 40px;
    text-align: center;
    grid-column: 1;
    background-color: lightGrey;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    box-shadow: 0px 1px 5px grey;
  }

  .right {
    margin-right: 40px;
    text-align: center;
    grid-column: 3;
    background-color: lightBlue;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    box-shadow: 0px 1px 5px grey;
  }

  button {
    color: white;
    background: transparent;
    border: 2px solid white;
    border-radius: 50px;
    font-weight: 300;
  }

  @media only screen and (max-width: 1024px) {
    .leftPane {
      grid-row-start: 1;
      grid-row-end: 5;
      grid-column-start: 1;
      grid-column-end: 3;
      width: 100vw;
      height: 100%;
      display: grid;
      grid-gap: 1vh;
      padding-top: 10vh;
      grid-template-columns: .2fr 1fr 1fr .2fr;
      grid-template-rows: 4vh 4vh 4vh 4vh 10vh 4vh 6vh 46vh 10vh;
      background: linear-gradient(208deg, #25c4da, #ce28d2, #2db45f, #ff7900);
      background-size: 800% 800%;
      -webkit-animation: AnimationName 20s ease infinite;
      -moz-animation: AnimationName 20s ease infinite;
      animation: AnimationName 20s ease infinite;
      z-index: 2;
    }

    .collapsePane {
      display: inline;
      position: absolute;
      top: 2vh;
      right: 2vw;
    }

    .collapsedPane {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 10vw;
      height: 100%;
      background: linear-gradient(208deg, #25c4da, #ce28d2, #2db45f, #ff7900);
      background-size: 800% 800%;
      -webkit-animation: AnimationName 20s ease infinite;
      -moz-animation: AnimationName 20s ease infinite;
      animation: AnimationName 20s ease infinite;
      z-index: 2;
    }

    .chatPane {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 90vw;
      height: 100vh;
      z-index: 1;
    }

    .chat {
      width: 90vw;
    }

    .send {
      width: 12vw !important;
    }
  }
</style>
