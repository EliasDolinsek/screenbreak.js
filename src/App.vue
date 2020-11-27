<template>
  <div id="container" v-bind:class="{ work: working, break: !working }">
    <div id="settings-modal">
      <Settings 
        v-on:close-settings="closeSettings()"
        :workTime="workTime"
        :breakTime="breakTime"
        :playSoundEffects="playSoundEffects"
        :showNotifications="showNotifications"
        v-on:update-break-time="breakTime = parseInt($event)"
        v-on:update-work-time="workTime = parseInt($event)"
        v-on:show-notifications-change="showNotifications = !showNotifications"
        v-on:play-sound-effects-change="playSoundEffects = !playSoundEffects"
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
      v-on:extra-time="addExtraTime()" />

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
const path = window.require("path");
const fs = window.require("fs");

import Actions from "./components/Actions";
import Settings from "./components/Settings";

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const configFile = path.join(userDataPath, "config.json");

export default {
  name: "Countdown",
  components: {
    Actions,
    Settings
  },
  data() {
    return {
      workTime: 1800,
      breakTime: 120,
      remainingTime: 1800,
      paused: false,
      working: true,
      playSoundEffects: true,
      showNotifications: true
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
      if(this.playSoundEffects){
        this.playFinishedSound();
      }

      if(this.showNotifications){
        if(this.working){
          this.showNotification("Time for a break", "Start moving!")
        } else {
          this.showNotification("Get back to work", "Time to get things done!")
        }
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
    writeConfig(){
      let config = {
        playSoundEffects: this.playSoundEffects,
        showNotifications: this.showNotifications,
        workTime: this.workTime,
        breakTime: this.breakTime
      }

      fs.writeFileSync(configFile, JSON.stringify(config));
    }
  },
  watch: {
    workTime: function(){
      this.writeConfig()
    },
    breakTime: function(){
      this.writeConfig();
    },
    showNotifications: function(){
      this.writeConfig();
    },
    playSoundEffects: function(){
      this.writeConfig();
    }
  },
  created: function(){
    let content = JSON.parse(fs.readFileSync(configFile, "utf-8"));

    this.showNotifications = content["showNotifications"];
    this.playSoundEffects = content["playSoundEffects"];
    this.workTime = content["workTime"];
    this.breakTime = content["breakTime"];
    
    this.remainingTime = this.workTime;
  }
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
  background-color: var(--primary-color);
}

.break {
  background-color: var(--break-color);
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
  padding: 20px;
  overflow: auto;
}

</style>

<style>
@font-face {
  font-family: "Open Sans";
  src: url("./assets/open_sans/OpenSans-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: url("./assets/open_sans/OpenSans-SemiBold.ttf");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: url("./assets/open_sans/OpenSans-Bold.ttf");
  font-weight: 700;
  font-style: normal;
}
* {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  --primary-color: #2a9d8f;
  --primary-color-dark: #20796f;
  --break-color: #e76f51;
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

button {
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  font-size: 0.8em;
  padding: 8px 16px 8px 16px;
  border-radius: 4px;
  outline: none;
}

button:active {
  background-color: var(--primary-color-dark);
}
</style>
