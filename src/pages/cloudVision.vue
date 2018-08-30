<template>
  <div class="main">
    <div class="results" v-if="modal==='success'">
      <div class="imagePreTwo">
        <img v-bind:src="imageUrl" height="100%" v-if="imageUrl!==''"/>
      </div>
      <h4 class="response" v-if="response.text!==null">{{response.text.text}}</h4>
      <h4 class="responseFail" v-if="response.text===null">Failed to Extract Text</h4>
      <button class="back" v-on:click="modal=''; imageUrl=''; imageFile={}">Back</button>
    </div>
    <div class="working" v-else-if="modal==='working'">
      <h4>Please wait while the request is Processed</h4>
    </div>
    <div class="Error" v-else-if="modal==='error'">
      <h4>{{errorText}}</h4>
      <button class="back" v-on:click="modal=''; imageUrl=''; imageFile={}">Back</button>
    </div>
    <div class="else" v-else>
      <div class="fileInputStyle">Browse</div>
      <input class="fileInput" type="file" @change="onFileChange($event.target.name, $event.target.files)" v-if="input" />
      <div class="imagePre">
        <img v-bind:src="imageUrl" height="100%" v-if="imageUrl!==''"/>
      </div>
      <button class="upload" v-on:click="upload()">Upload</button>
      <button class="back" v-on:click="$router.push('/')">Back</button>
    </div>
  </div>
</template>

<script>
import decimal from 'decimal'
export default {
  name: 'cloudVision',
  data: function () {
    return {
      modal: '',
      errorText: '',
      input: true,
      maxSize: 2048,
      imageFile: {},
      imageUrl: '',
      response: {}
    }
  },
  methods: {
    onFileChange (fieldName, file) {
      let vue = this
      vue.imageFile = file[0]
      if (file.length > 0) {
        let size = decimal(vue.imageFile.size).div(vue.maxSize).div(vue.maxSize).toNumber()
        if (!vue.imageFile.type.match('image.*')) {
          vue.modal = 'error'
          vue.errorText = 'Please choose an image file'
        } else if (size > 1) {
          vue.modal = 'error'
          vue.errorText = 'Your file is too big! Please select an image under 1MB'
        } else {
          vue.imageUrl = URL.createObjectURL(vue.imageFile)
        }
      }
    },
    upload () {
      let vue = this
      vue.modal = 'working'
      let formData = new FormData()
      formData.append('file', vue.imageFile)
      var url = 'https://api.screenartstudios.com/deep'
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          vue.modal = 'success'
          vue.response = JSON.parse(xhr.response)
        } else if (xhr.readyState === 4) {
          console.log(xhr.responseText)
        }
      }
      xhr.send(formData)
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
  background: linear-gradient(208deg, #25c4da, #ce28d2, #2db45f, #ff7900);
  background-size: 800% 800%;
  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}

.Error {
  margin-top: 15vh;
  text-align: center;
  color: white;
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
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 300;
  text-align: center;
  line-height: 6vh;
  height: 6vh;
  font-size: 1.4em;
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

image {
  justify-self: center;
  align-self: center;
}

.else {
  display: grid;
  grid-template-rows: 20vh 15vh 40vh 15vh 10vh;
  grid-template-columns: 5vw 90vw 5vw;
}

.fileInputStyle, .upload{
  color: white;
  text-align: center;
  line-height: 8vh;
  height: 8vh;
  font-size: 1.4em;
  background: transparent;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 300;
  align-self: center;
}

.fileInput {
  grid-column: 2;
  grid-row: 2;
  opacity: 0;
  z-index: 4;
}

.fileInputStyle {
  grid-column: 2;
  grid-row: 2;
}

.imagePre {
  grid-column: 2;
  height: 40vh;
  overflow: hidden;
  grid-row: 3;
  text-align: center;
  align-items: center;
  justify-self: center;
  justify-content: center;
  display: flex;
}

.upload {
  grid-column: 2;
  grid-row: 4;
}

.working {
  margin-top: 40vh;
  text-align: center;
  color: white;
  font-size: 2em;
  font-style: italic;
}

.results {
  display: grid;
  grid-template-rows: 14vh 30vh 2.5vh 50vh 2.5vh;
  grid-template-columns: 5vw 90vw 5vw;
}

.imagePreTwo {
  grid-column: 2;
  grid-row: 2;
  height: 30vh;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}

.response {
  grid-column: 2;
  grid-row: 4;
  overflow-y: scroll;
  color: black;
  margin: 0;
  background-color: white;
  border-radius: 10vw;
  padding: 3vw;
}

.responseFail {
  grid-column: 2;
  grid-row: 5;
  text-align: center;
  color: white;
}

.back {
  grid-row: 2;
  grid-column-start: 2;
  grid-column-end: 4;
}

@media only screen and (min-width: 768px) {
  button.back {
    font-size: 2.5em;
  }

  .fileInputStyle, .upload {
    font-size: 2.5em;
    width: 40vw;
    justify-self: center;
  }
}

@media only screen and (min-width: 1024px) {
  button.back {
    font-size: 2em;
    width: 15vw;
  }

  .fileInputStyle, .upload {
    font-size: 2em;
    width: 20vw;
    justify-self: center;
  }

  .results {
    display: grid;
    grid-template-rows: 15vh 15vh 40vh 15vh 15vh;
    grid-template-columns: 5vw 42.5vw 5vw 42.5vw 5vw;
  }

  .results .back {
    grid-column: 4;
  }

  .imagePreTwo {
    grid-column: 2;
    grid-row: 3;
    height: 40vh;
  }

  .response {
    border-radius: 5vw;
    grid-column: 4;
    grid-row-start: 2;
    grid-row-end: 5;
  }
}
</style>
