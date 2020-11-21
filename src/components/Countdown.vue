<template>
  <div>
    <h1>{{ remainingTime }}</h1>
    <button @click="pauseContinueCountdown()">PAUSE/CONTINUE</button>
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
      mode: "work", //work, break
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
        this.changeMode()
      }

      setTimeout(this.countdown, 1000);
    },
    pauseContinueCountdown() {
      this.paused = !this.paused;
    },
    changeMode() {
      if (this.mode == "work") {
        this.mode = "break"
        this.remainingTime = this.breakTime
      } else {
        this.mode = "work"
        this.remainingTime = this.workTime
      }
    },
  },
};
</script>

<style scoped>
</style>