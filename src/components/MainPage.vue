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
    <Editor v-if="state === 'editState'" @insert="addEntry" @cancel="cancelEdit" :itemToEdit="itemToEdit"></Editor>
    <div v-if="state === 'listState'">
      <button type="button" class="btn btn-primary" @click="showEditor">Add</button>
      <button type="button" class="btn btn-secondary ml-3" @click="toFile">Export</button>
      <h3 class="mt-2">Speed</h3>
      <div class="list-group">
        <SpeedEntry v-for="(item) in configContents['speed']" :item="item" :key="item.join()" 
          @delete="deleteItem('speed', item.join())" @edit="editItem('speed', item.join())" />
      </div>
      

      <h3 class="mt-2">Availability</h3>
      <div class="list-group">
        <AvailabilityEntry v-for="item in configContents['availability']" :item="item" :key="item.join()" 
          @delete="deleteItem('availability', item.join())"  @edit="editItem('availability', item.join())" />
      </div>

      <h3 class="mt-2">Capacity</h3>
      <div class="list-group">
        <CapacityEntry v-for="item in configContents['capacity']" :item="item" :key="item.join()" 
        @delete="deleteItem('capacity', item.join())"  @edit="editItem('capacity', item.join())" />
      </div>

      <h3 class="mt-2">Load Speed</h3>
      <p>Values are per a door</p>
      <div class="list-group">
        <LoadSpeedEntry v-for="item in configContents['loadSpeed']" :item="item" :key="item.join()" 
        @delete="deleteItem('loadSpeed', item.join())"  @edit="editItem('loadSpeed', item.join())"/>
      </div>
      
      <h3 class="mt-2">Power</h3>
      <p>Please note for aircraft values below are the idle AND maximum thrust in N instead.</p>
      <div class="list-group">
        <PowerEntry v-for="item in configContents['power']" :item="item" :key="item.join()" 
        @delete="deleteItem('power', item.join())"  @edit="editItem('power', item.join())"/>
      </div>

      <h3 class="mt-2">Weight</h3>
      <div class="list-group">
        <WeightEntry v-for="item in configContents['weight']" :item="item" :key="item.join()" 
        @delete="deleteItem('weight', item.join())"  @edit="editItem('weight', item.join())"/>
      </div>

      <h3 class="mt-2">Price</h3>
      <div class="list-group">
        <PriceEntry v-for="item in configContents['price']" :item="item" :key="item.join()" 
        @delete="deleteItem('price', item.join())"  @edit="editItem('price', item.join())"/>

      </div>

      <h3 class="mt-2">Running Costs</h3>
      <div class="list-group">
        <PriceEntry v-for="item in configContents['runningCosts']" :item="item" :key="item.join()"
         @delete="deleteItem('runningCosts', item.join())"  @edit="editItem('runningCosts', item.join())"/>
      </div>

      <h3 class="mt-2">Lifespan</h3>
      <div class="list-group">
        <LifespanEntry v-for="item in configContents['lifespan']" :item="item" :key="item.join()" 
        @delete="deleteItem('lifespan', item.join())"  @edit="editItem('lifespan', item.join())"/>
      </div>

      <h3 class="mt-2">Reversible</h3>
      <div class="list-group">
        <ReversibleEntry v-for="item in configContents['reversible']" :item="item" :key="item.join()"
         @delete="deleteItem('reversible', item.join())"  @edit="editItem('reversible', item.join())"/>
      </div>
    </div>
  </div>

  <Results v-if="state === 'export'" :contents="resultTxt" @done="state = 'listState'" />
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
let state = ref('introState')
let itemToEdit = ref(null);

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


function deleteItem(section, toRemoveKey){
  console.log(`Deleteing ${section} @ ${toRemoveKey}`)
  let array = configContents.value[section];
  for (let index = 0; index < array.length; index++) {
    const entry = array[index];
    let key = entry.join();
    if(key == toRemoveKey){
      array.splice(index, 1)
      return;
    }
  }
}

function editItem(section, itemKey){
  console.log(`Editing ${section} @ ${itemKey}`)
  let array = configContents.value[section];
  for (let index = 0; index < array.length; index++) {
    const entry = array[index];
    let key = entry.join();
    if(key == itemKey){
      itemToEdit.value = { section:section, entry: entry, key: itemKey};
      showEditor();
      return;
    }
  }
}

function updateItem(section, itemKey, newVehConfig){
  console.log(`Updating ${section} @ ${itemKey}. With ${newVehConfig}`)
  let array = configContents.value[section];
  for (let index = 0; index < array.length; index++) {
    const entry = array[index];
    let key = entry.join();
    if(key == itemKey){
      entry.length = 0 // clear array
      entry.push(...newVehConfig);
      return;
    }
  }
}

function showEditor(){
  state.value = 'editState'
}

function addEntry(entry){
  state.value = 'listState'
  if(itemToEdit.value){
    updateItem(itemToEdit.value.section, itemToEdit.value.key, entry.vehicleConfig);
    itemToEdit.value = null;
  } else {
    configContents.value[entry.section].push(entry.vehicleConfig);
  }
}

function cancelEdit(){
  state.value = 'listState'
  itemToEdit.value = null;
}
</script>

<style scoped></style>
