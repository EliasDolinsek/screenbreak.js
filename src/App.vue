<template>
  <div v-bind:class="{ work: working }">
    <h1 class="text-center">{{ remainingTime }}</h1>
    <div v-if="working">
      <p>until next break</p>
    </div>
    <div v-else>
      <p>until break ends</p>
    </div>
    <b-row>
      <b-icon icon="pause-fill"></b-icon>
    </b-row>
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
  mounted() {
    this.countdown();
  },
  methods: {
    countdown() {
      if (!this.paused) {
        this.remainingTime -= 1;
      }

      if (this.remainingTime < 0) {
        this.changeMode();
      }

      setTimeout(this.countdown, 1000);
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
  background-color: #5998c5;
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

* {
  margin: 0;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
