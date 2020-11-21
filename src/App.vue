<template>
  <div id="container" v-bind:class="{ work: working, break: !working }">
    <h1 id="countdown" class="white-text">{{ remainingTime | countdown }}</h1>
    <div v-if="working">
      <p class="subtitle">until break starts</p>
    </div>
    <div v-else>
      <p class="subtitle">until break ends</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
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
  },
};
</script>

<style scoped>
.work {
  background-color: #2a9d8f;
}

.break {
  background-color: #e76f51;
}

.subtitle {
  font-size: 1.4em;
  font-weight: 400;
  text-align: center;
  color: rgba(255,255,255,0.8)
}

#countdown {
  color: white;
  font-weight: 600;
  font-size: 6em;
  text-align: center;
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

* {
  margin: 0;
}

#container {
  height: 100vh;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>
