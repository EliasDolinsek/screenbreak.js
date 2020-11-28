<template>
  <div id="settings-content">
    <h2 id="settings-title">Settings</h2>
    <div id="settings-container">
      <div>
        <label>
          <input
              type="checkbox"
              v-model="playSoundEffects"
              placeholder="Play sound effects"
              @change="$emit('play-sound-effects-change')">
          Play sound effects
        </label>
        <br>
        <label>
          <input
              type="checkbox"
              v-model="showNotifications"
              placeholder="Show notifications"
              @change="$emit('show-notifications-change')">
          Show notification
        </label>
        <br>
        <label>
          <input
            type="checkbox"
            v-model="bringIntoForegroundOnCountdownFinished"
            placeholder="Bring into foreground when countdown finished"
            @change="$emit('bring-into-foreground-change')">
          Bring into foreground when countdown finished
        </label>
      </div>
      <div>
        <div>
          <label>
            <select v-model="breakTime" @change="$emit('update-break-time', $event.target.value)">
              <option v-for="option in breakTimeOptions" v-bind:value="option.value" :key="option.value">
                {{ option.text }}
              </option>
            </select>
            Break time
          </label>
        </div>
        <div>
          <label>
            <select v-model="workTime" @change="$emit('update-work-time', $event.target.value)">
              <option v-for="option in workTimeOptions" v-bind:value="option.value" :key="option.value">
                {{ option.text }}
              </option>
            </select>
            Work time
          </label>
        </div>
      </div>
    </div>
    <button id="btn-close" v-on:click="$emit('close-settings')">CLOSE</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breakTimeOptions: [
        {value: 30, text: "30s"},
        {value: 60, text: "1 min"},
        {value: 120, text: "2 min"},
        {value: 300, text: "5 min"},
        {value: 600, text: "10 min"}
      ],
      workTimeOptions: [
        {value: 900, text: "15 min"},
        {value: 1200, text: "20 min"},
        {value: 1500, text: "25 min"},
        {value: 1800, text: "30 min"},
        {value: 2700, text: "45 min"},
        {value: 3600, text: "60 min"}
      ]
    }
  },
  props: {
    breakTime: {
      type: Number,
      required: true
    },
    workTime: {
      type: Number,
      required: true
    },
    showNotifications: {
      type: Boolean,
      required: true
    },
    playSoundEffects: {
      type: Boolean,
      required: true
    },
    bringIntoForegroundOnCountdownFinished: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style scoped>
#settings-title {
  margin-bottom: 5px;
}

#settings-content {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 9px 0 rgba(50, 50, 50, 0.49);
}

#settings-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

input[type="checkbox"], select {
  margin-top: 10px;
  margin-right: 10px;
}

#btn-close {
  margin-top: 5px;
}
</style>
