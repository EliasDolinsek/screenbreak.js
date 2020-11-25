<template>
  <div id="settings-content">
  <h2 id="settings-title">Settings</h2>
    <div id="settings-container">
      <div>
        <input
          type="checkbox"
          v-model="playSoundEffects"
          placeholder="Play sound effects"
          @change="$emit('play-sound-effects-change')">
        <label for="checkbox">Play sound effects</label>

        <br>

        <input 
          type="checkbox"
          v-model="showNotifications"
          placeholder="Show notifications"
          @change="$emit('show-notifications-change')">
        <label for="checkbox">Show notification</label>
      </div>
      <div>
        <div>
          <select v-model="breakTime" @change="$emit('update-break-time', $event.target.value)">
            <option v-for="option in breakTimeOptions" v-bind:value="option.value" :key="option.value" >
              {{ option.text }}
            </option>
          </select>
          <label for="breakTime">Break time</label>
        </div>
        <div>
          <select v-model="workTime" @change="$emit('update-work-time', $event.target.value)">
            <option v-for="option in workTimeOptions" v-bind:value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
          <label for="breakTime">Work time</label>
        </div>
      </div>
    </div>
    <button id="btn-close" v-on:click="$emit('close-settings')">CLOSE</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        breakTimeOptions: [
          { value: 30, text: "30s"},
          { value: 60, text: "1 min"},
          { value: 120, text: "2 min"},
          { value: 300, text: "5 min"},
          { value: 600, text: "10 min"}
        ],
        workTimeOptions: [
          { value: 900, text: "15 min"},
          { value: 1200, text: "20 min"},
          { value: 1500, text: "25 min"},
          { value: 1800, text: "30 min"},
          { value: 2700, text: "45 min"},
          { value: 3600, text: "60 min"}
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  #settings-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  input[type="checkbox"], select{
    margin-top: 10px;
    margin-right: 10px;
  }

  #btn-close {
    margin-top: 5px;
  }
</style>
