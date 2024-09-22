<template>
  <div class="container-fluid">
    <div v-if="state === 'introState'">
      <TheWelcome />
      <div class="mt-4">
        <button type="button" class="btn btn-primary" @click="uploadState">Paste File</button>
        <button type="button" class="btn btn-secondary" @click="createNew">Create New</button>
      </div>
    </div>
    <UploadData v-if="state === 'uploadState'" @upload="uploadFile" />
    <Editor v-if="state === 'editState'" @insert="addEntry"></Editor>
    <div v-if="state === 'listState'">
      <button type="button" class="btn btn-primary" @click="showEditor">Add</button>
      <button type="button" class="btn btn-secondary ml-3" @click="toFile">Export</button>
      <h3 class="mt-2">Speed</h3>
      <div class="list-group">
        <SpeedEntry v-for="(item, index) in configContents['speed']" :item="item" :key="index" @delete="deleteItem('speed', index)"/>
      </div>
      

      <h3 class="mt-2">Availability</h3>
      <div class="list-group">
        <AvailabilityEntry v-for="(item, index) in configContents['availability']" :item="item" :key="index" @delete="deleteItem('availability', index)"/>
      </div>

      <h3 class="mt-2">Capacity</h3>
      <div class="list-group">
        <CapacityEntry v-for="(item, index) in configContents['capacity']" :item="item" :key="index" @delete="deleteItem('capacity', index)"/>
      </div>

      <h3 class="mt-2">Load Speed</h3>
      <p>Values are per a door</p>
      <div class="list-group">
        <LoadSpeedEntry v-for="(item, index) in configContents['loadSpeed']" :item="item" :key="index" @delete="deleteItem('loadSpeed', index)"/>
      </div>
      
      <h3 class="mt-2">Power</h3>
      <p>Please note for aircraft values below are the idle AND maximum thrust in N instead.</p>
      <div class="list-group">
        <PowerEntry v-for="(item, index) in configContents['power']" :item="item" :key="index" @delete="deleteItem('power', index)"/>
      </div>

      <h3 class="mt-2">Weight</h3>
      <div class="list-group">
        <WeightEntry v-for="(item, index) in configContents['weight']" :item="item" :key="index" @delete="deleteItem('weight', index)"/>
      </div>

      <h3 class="mt-2">Price</h3>
      <div class="list-group">
        <PriceEntry v-for="(item, index) in configContents['price']" :item="item" :key="index" @delete="deleteItem('price', index)"/>

      </div>

      <h3 class="mt-2">Running Costs</h3>
      <div class="list-group">
        <PriceEntry v-for="(item, index) in configContents['runningCosts']" :item="item" :key="index" @delete="deleteItem('runningCosts', index)"/>
      </div>

      <h3 class="mt-2">Lifespan</h3>
      <div class="list-group">
        <LifespanEntry v-for="(item, index) in configContents['lifespan']" :item="item" :key="index" @delete="deleteItem('lifespan', index)"/>
      </div>

      <h3 class="mt-2">Reversible</h3>
      <div class="list-group">
        <ReversibleEntry v-for="(item, index) in configContents['reversible']" :item="item" :key="index" @delete="deleteItem('reversible', index)"/>
      </div>
    </div>
  </div>

  <Results v-if="state === 'export'" :contents="resultTxt" @done="state = 'listState'" />
  <!-- <EditorPage v-if="state === 'edit'" v-model="configContents"></EditorPage> -->
</template>

<script setup>
import UploadData from './UploadData.vue'
import Results from './Results.vue'
import { ref, defineProps } from 'vue'
import { toLuaConfigFile, readConfigFile } from './functions/fileIntrepreter.js'
import TheWelcome from './TheWelcome.vue'
import SpeedEntry from './entries/SpeedEntry.vue'
import AvailabilityEntry from './entries/AvailabilityEntry.vue'
import CapacityEntry from './entries/CapacityEntry.vue'
import LoadSpeedEntry from './entries/LoadSpeedEntry.vue'
import PriceEntry from './entries/PriceEntry.vue'
import ReversibleEntry from './entries/ReversibleEntry.vue'
import LifespanEntry from './entries/LifespanEntry.vue'
import WeightEntry from './entries/WeightEntry.vue'
import PowerEntry from './entries/PowerEntry.vue'
import Editor from './editors/Editor.vue'

let resultTxt = ref('')
// let state = ref('introState')
let state = ref('introState')

let configContents = ref({
  speed: [],
  availability: [],
  capacity: [],
  loadSpeed: [],
  power: [],
  weight: [],
  price: [],
  runningCosts: [],
  lifespan: [],
  reversible: []
})

function uploadState() {
  state.value = 'uploadState'
}
function uploadFile(data) {
  configContents.value = readConfigFile(data)
  state.value = 'listState'
  console.log(configContents)
}

function createNew() {
  state.value = 'listState'
}

function toFile() {
  let str = toLuaConfigFile(configContents.value)
  console.log(str)
  resultTxt.value = str
  state.value = 'export'
}

function deleteItem(section, idx){
  console.log(`Deleteing ${section} @ ${idx}`)
  configContents.value[section].splice(idx, 1)
}

function showEditor(){
  state.value = 'editState'
}

function addEntry(entry){
  state.value = 'listState'
  configContents.value[entry.section].push(entry.value);
}
</script>

<style scoped></style>
