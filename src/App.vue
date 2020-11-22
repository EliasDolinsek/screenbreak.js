<template>
  <div id="container" v-bind:class="{ work: working, break: !working }">
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
    <Actions
      id="actions"
      :paused="paused"
      :remainingTime="remainingTime"
      :working="working"
      v-on:pause="paused = !paused"
      v-on:skip="skip()"
      v-on:extra-time="addExtraTime()"
    />
  </div>
</template>

<script>
import Actions from "./components/Actions";

export default {
  name: "Countdown",
  components: {
    Actions,
  },
  data() {
    return {
      workTime: 10,
      breakTime: 10,
      remainingTime: 10,
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
    countdown() {
      if (!this.paused) {
        this.remainingTime -= 1;
      }

      if (this.remainingTime > 0) {
        setTimeout(this.countdown, 1000);
      }
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
</style>
