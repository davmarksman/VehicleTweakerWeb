<template>

  <div class="list-group-item list-group-item-action flex-column align-items-start"
    style="padding-top: 6px; padding-bottom: 6px;">
    <div>
      <div class="d-flex justify-content-between" style="margin-right: 50px;">
        <h5 v-if="hasSteamLink" class="mb-1">
          <a :href="steamLink" target="_blank">{{ searchTerm}}</a>
        </h5>
        <h5 v-else class="mb-1">{{ searchTerm }}</h5>
        <small>{{ capacityTxt }} 
        
          <img v-if="cargoType==='PASSENGERS'" src="../../assets/cargoTypes/passenger.png" alt="PASSENGERS" />
          <img v-else-if="cargoType==='MACHINES'" src="../../assets/cargoTypes/MACHINES.png" alt="MACHINES" />
          <img v-else-if="cargoType==='TOOLS'" src="../../assets/cargoTypes/TOOLS.png" alt="TOOLS" />
          <img v-else-if="cargoType==='STEEL'" src="../../assets/cargoTypes/STEEL.png" alt="MACHINES" />
          <img v-else-if="cargoType==='FOOD'" src="../../assets/cargoTypes/FOOD.png" alt="FOOD" />
          <img v-else-if="cargoType==='GOODS'" src="../../assets/cargoTypes/GOODS.png" alt="GOODS" />
          <img v-else-if="cargoType==='IRON_ORE'" src="../../assets/cargoTypes/IRON_ORE.png" alt="IRON_ORE" />
          <img v-else-if="cargoType==='STONE'" src="../../assets/cargoTypes/STONE.png" alt="STONE" />
          <img v-else-if="cargoType==='GRAIN'" src="../../assets/cargoTypes/GRAIN.png" alt="GRAIN" />
          <img v-else-if="cargoType==='CONSTRUCTION_MATERIALS'" src="../../assets/cargoTypes/CONSTRUCTION_MATERIALS.png" alt="CONSTRUCTION_MATERIALS" />
          <img v-else-if="cargoType==='COAL'" src="../../assets/cargoTypes/COAL.png" alt="COAL" />
          <img v-else-if="cargoType==='LOGS'" src="../../assets/cargoTypes/LOGS.png" alt="LOGS" />
          <img v-else-if="cargoType==='PLASTIC'" src="../../assets/cargoTypes/PLASTIC.png" alt="PLASTIC" />
          <img v-else-if="cargoType==='OIL'" src="../../assets/cargoTypes/OIL.png" alt="OIL" />
          <img v-else-if="cargoType==='FUEL'" src="../../assets/cargoTypes/FUEL.png" alt="FUEL" />
          <img v-else-if="cargoType==='CRUDE'" src="../../assets/cargoTypes/CRUDE.png" alt="CRUDE" />
          <span v-else>{{ cargoType}} </span>
        </small>
      </div>
      <div class="icon">
        <IconEntryEdit @click="$emit('edit')" />
        <IconDelete @click="$emit('delete')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconDelete from '../icons/IconDelete.vue'
import IconEntryEdit from '../icons/IconEntryEdit.vue'
import { ref, computed } from 'vue'

const props = defineProps(['item'])

const searchTerm = ref(props.item[0])
const capactity = ref(props.item[1])
let cargoType = ref('')
if (props.item.length > 2) {
  cargoType = ref(props.item[2])
}

const hasSteamLink = computed(() => {
  return /^\d+/.test(searchTerm.value)
})

const capacityTxt = computed(() => {
  if (typeof capactity.value === 'string' || capactity.value instanceof String) {
    // If you put the capacity in quotation marks, the original capacity will be multiplied by this value (up to a maximum of 10).
    return capactity.value + 'x'
  }

  if (capactity.value === 0) {
    return 'Excluded'
  }

  return `(Real: ${capactity.value}) Game: ${Math.floor(capactity.value / 4)}`
})

const steamLink = computed(() => {
  let id = ''
  if (searchTerm.value) {
    let match = searchTerm.value.match(/^\d+/)
    if (match && match.length && match.length > 0) {
      id = match[0]
    }
  }
  return 'https://steamcommunity.com/sharedfiles/filedetails/?id=' + id
})

console.log('Capacity Entry', props.item, hasSteamLink.value)
</script>

<style scoped>
.icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
