<template>
  <div>
    <button class="img-button" v-on:click="$emit('extra-time')">
      <span id="txt-extra-time">+5</span>
    </button>
    <div v-if="remainingTime > 0">
      <button class="img-button spacing-left" v-on:click="$emit('pause')">
        <img
          v-bind:class="{ 'img-active': paused }"
          src="@/assets/pause.svg"
          width="32"
        />
      </button>
      <button class="img-button spacing-left" v-on:click="$emit('skip')">
        <img src="@/assets/forward.svg" width="32" />
      </button>
    </div>
    <div v-else>
      <button class="img-button spacing-left" v-on:click="$emit('skip')">
        <img src="@/assets/check.svg" width="32" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Actions",
  props: {
    working: Boolean,
    paused: Boolean,
    remainingTime: Number,
  },
};
</script>

<style scoped>
@keyframes activate-img-button {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
}

.spacing-left {
    margin-left: 20px;
}

.img-button {
  background: none;
  border: none;
  outline: none;
}

.img-active {
  animation-name: activate-img-button;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

#txt-extra-time {
  font-size: 32px;
  font-weight: 600;
  color: white;
}
</style>