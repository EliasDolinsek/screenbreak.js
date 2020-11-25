<template>
  <div id="container" v-bind:class="{ work: working, break: !working }">
    <div id="settings-modal">
      <Settings 
        v-on:close-settings="closeSettings()"
        :workTime="workTime"
        :breakTime="breakTime"
        v-on:update-break-time="breakTime = parseInt($event)"
        v-on:update-work-time="workTime = parseInt($event)"
      />
    </div>
    <div id="content-container">
      <h1 id="countdown" class="white-text">{{ remainingTime | countdown }}</h1>
      <div>
        <div v-if="working">
          <p class="subtitle">until break starts</p>
        </div>
        <div v-else>
          <p class="subtitle">until break ends</p>
        </div>
      </div>
    </div>
    <button id="btn-settings" class="img-button" v-on:click="onSettingsClicked()">
        <img
          src="@/assets/settings.svg"
          width="24"
        />
     </button>
    <Actions
      id="actions"
      :paused="paused"
      :remainingTime="remainingTime"
      :working="working"
      v-on:pause="paused = !paused"
      v-on:skip="skip()"
      v-on:extra-time="addExtraTime()"
    />

    <audio
      id="single-bing"
      preload="autio"
      src="@/assets/clock_single_bing.wav"
    ></audio>
    <audio
      id="double-bing"
      preload="autio"
      src="@/assets/clock_double_bing.wav"
    ></audio>
  </div>
</template>

<script>
const electron = window.require("electron");

import Actions from "./components/Actions";
import Settings from "./components/Settings";


export default {
  name: "Countdown",
  components: {
    Actions,
    Settings
  },
  data() {
    return {
      workTime: 15 * 60,
      breakTime: 30,
      remainingTime: 15 * 60,
      paused: false,
      working: true,
    };
  },
  filters: {
    countdown: function (value) {
      let minutes = parseInt(value / 60);
      let seconds = value % 60;

      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      return minutes + ":" + seconds;
    },
  },
  mounted() {
    this.countdown();
  },
  methods: {
    showSettings(){
      document.getElementById("settings-modal").style.display = "block";
    },
    closeSettings(){
      document.getElementById("settings-modal").style.display = "none";
    },
    onSettingsClicked(){
      let settingsModal = document.getElementById("settings-modal");
      if(settingsModal.style.display == "block"){
        settingsModal.style.display = "none";
      } else {
        settingsModal.style.display = "block";
      }
    },
    showNotification(title, message){
      const notification = {
        title: title,
        body: message 
      }
      new electron.remote.Notification(notification).show()
    },
    countdown() {
      if (!this.paused) {
        this.remainingTime -= 1;
      }

      if (this.remainingTime > 0) {
        setTimeout(this.countdown, 1000);
      } else {
        this.onCountdownFinished();
      }
    },
    onCountdownFinished(){
      this.playFinishedSound();
      if(this.working){
        this.showNotification("Time for a break", "Start moving!")
      } else {
        this.showNotification("Get back to work", "Time to get things done!")
      }
    },
    playFinishedSound() {
      let audio = null;
      if (this.working) {
        audio = document.getElementById("single-bing");
      } else {
        audio = document.getElementById("double-bing");
      }

      audio.play();
    },
    pauseContinueCountdown() {
      this.paused = !this.paused;
    },
    changeMode() {
      this.working = !this.working;

      if (this.working) {
        this.remainingTime = this.workTime;
      } else {
        this.remainingTime = this.breakTime;
      }
    },
    skip() {
      this.paused = false;
      if (this.remainingTime <= 0) {
        setTimeout(this.countdown, 1000);
      }

      this.changeMode();
    },
    addExtraTime() {
      const time = 5 * 60;
      if (this.remainingTime == 0) {
        this.remainingTime += time;
        this.countdown();
      } else {
        this.remainingTime += time;
      }
    },
  },
};
</script>

<style scoped>
#actions {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: row;
  align-items: center;
}

#content-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.work {
  background-color: #2a9d8f;
}

.break {
  background-color: #e76f51;
}

.subtitle {
  font-size: 1.2em;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

#countdown {
  color: white;
  font-weight: 600;
  font-size: 6em;
  text-align: center;
  line-height: 0.9em;
}

#container {
  height: 100vh;
}

#btn-settings {
  position: absolute;
  top: 10px;
  right: 10px;
}

#settings-modal {
  display: none;
  position: fixed;
  z-index: 1;
  top: 5vh;
  left: 10vw;
  width: 80vw;
  height: 100%;
  overflow: auto;
}

</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

* {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.img-button {
  background: none;
  border: none;
  outline: none;
}
</style>
