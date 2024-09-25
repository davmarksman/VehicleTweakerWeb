<template>
  <div>
    <label for="inSteamLink">Steam Link</label>
    <input v-model="steamLink" class="form-control" id="inSteamLink"
      placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=2668633703" />
    <label for="inSearchTerm" class="mt-2">OR Search Term</label>
    <input v-model="searchTerm" class="form-control" id="inSearchTerm" placeholder="modelToChange.mdl" />
    <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
      aria-controls="collapseExample">
      [Search Term Instructions]
    </a>
    <div class="collapse" id="collapseExample">
      <small>
        This can be:
        <ul>
          <li>The mod's folder name (for Steam will be workshop ID)</li>
          <li>Model file name (e.g model.mdl)</li>
          <li>A combination of mod and model name (e.g. 2459275833.*example_model.mdl)</li>
        </ul>
        <div class="alert alert-info">
          <strong>How to find the model file name:</strong>
          In the vehicle store hold AltGr and hover on the vehicle icon to show the mod mdl path as
          tooltip.
          <br />
          <br />
          <ol>
            <li>Type the mod id (2nd line of tool tip, without the *)</li>
            <li>Then ".*"</li>
            <li>Then the model filename (from the 1st line of the tooltip)</li>
          </ol>
          eg.
          <div class="row">
            <div class="alert alert-primary col-4 ml-5" role="alert">
              vehicle/bus/model.mdl
              <br />
              *3000000001
            </div>
            <div class="col-1">
              <IconArrowRight />
            </div>
            <div class="alert alert-primary col-4" role="alert">3000000001.*model.mdl</div>
          </div>
        </div>
      </small>
    </div>
    <hr />
    <div class="card">
      <div class="form-group card-body">
        <div>
          <div class="form-group pb-3">
            <label for="inParam">Edit</label>
            <select class="form-control" id="inParam" v-model="selected" :disabled="sectionDisabled">
              <option>speed</option>
              <option>availability</option>
              <option>capacity</option>
              <option>loadSpeed</option>
              <option>power</option>
              <option>weight</option>
              <option>price</option>
              <option>runningCosts</option>
              <option>lifespan</option>
              <option>reversible</option>
            </select>
          </div>

          <!-- Number Input -->
          <div class="form-group" v-if="isNumberInput || selected === 'power'">
            <label for="inNumber">{{ numberInputText }}</label>
            <input class="form-control" id="inNumber" type="number" v-model="numberVal" />
          </div>

          <!-- Number Input 2 for power -->
          <div class="form-group" v-if="selected === 'power'">
            <label for="inNumber">Tractive effort in kN (optional) or Maximum thrust in N (Airplanes, mandatory)
            </label>
            <input class="form-control" id="inNumber" type="number" v-model="numberVal2" />
          </div>

          <!-- Availability -->
          <div v-if="selected === 'availability'">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="inStartYear">Start Year</label>

                <div class="form-inline">
                  <input class="form-control" id="inNumber2" type="number" v-model="startYear" />
                  <button type="button" class="btn btn-info" @click="startYear = -1">
                    Unchanged
                  </button>
                  <button type="button" class="btn btn-dark" @click="startYear = 0">
                    From Start
                  </button>
                </div>
              </div>

              <div class="form-group col-md-6">
                <label for="inEndYear">End Year</label>

                <div class="form-inline">
                  <input class="form-control" id="inEndYear" type="number" v-model="endYear" />
                  <button type="button" class="btn btn-info" @click="endYear = -1">
                    Unchanged
                  </button>
                  <button type="button" class="btn btn-dark" @click="endYear = 0">Infinite</button>
                </div>
              </div>
            </div>
            <hr />
            <p>Result: {{ availabilityText }}</p>
          </div>

          <!-- reversible -->
          <div v-if="selected === 'reversible'">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="reversibleRadio" id="reversibleRadio1" value="true"
                v-model="reversible" />
              <label class="form-check-label" for="reversibleRadio1"> Reversible </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="reversibleRadio" id="reversibleRadio2" value="false"
                v-model="reversible" />
              <label class="form-check-label" for="reversibleRadio2"> Not Reversible </label>
            </div>
          </div>

          <!-- Capacity -->
          <div v-if="selected === 'capacity'">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="capacityRadio" id="capacityRadio2" value="value"
                v-model="capacityAction" />
              <label class="form-check-label" for="capacityRadio2">
                <small>Set capacity</small>
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="capacityRadio" id="capacityRadio3" value="multiplier"
                v-model="capacityAction" />
              <label class="form-check-label" for="capacityRadio3">
                <small>Multiply the original capacity will by this value</small>
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="capacityRadio" id="capacityRadio1" value="exclude"
                v-model="capacityAction" />
              <label class="form-check-label" for="capacityRadio1">
                <small>Exclude cargo type</small>
              </label>
            </div>

            <div class="form-group mt-3" v-if="capacityAction !== 'exclude'">
              <label for="inCapacity">{{ capactityText }}</label>
              <input class="form-control" id="inCapacity" v-model="capacityVal"  @keyup="onKeyCapacity"/>
              <small>Note: With Multiple Units this will be per a carriage/unit.</small>
            </div>

            <div class="form-group mt-3">
              <label for="selCargoType">Cargo Type (Only one):</label>
              <input class="form-control" id="inCapacity" v-model="selectedCargoType" />
              <small>
                Common types:
                <ul>
                  <li>
                    UNCHANGED <a class="use-link" @click="selectedCargoType = 'UNCHANGED'">use</a>
                    (Use this to leave the cargo types unchanged)
                  </li>
                  <li>
                    PASSENGERS <a class="use-link" @click="selectedCargoType = 'PASSENGERS'">use</a>
                  </li>
                  <li>
                    MACHINES <a class="use-link" @click="selectedCargoType = 'MACHINES'">use</a>
                  </li>
                  <li>TOOLS <a class="use-link" @click="selectedCargoType = 'TOOLS'">use</a></li>
                  <li>STEEL <a class="use-link" @click="selectedCargoType = 'STEEL'">use</a></li>
                  <li>FOOD <a class="use-link" @click="selectedCargoType = 'FOOD'">use</a></li>
                  <li>GOODS <a class="use-link" @click="selectedCargoType = 'GOODS'">use</a></li>
                  <li>
                    IRON_ORE <a class="use-link" @click="selectedCargoType = 'IRON_ORE'">use</a>
                  </li>
                  <li>STONE <a class="use-link" @click="selectedCargoType = 'STONE'">use</a></li>
                  <li>GRAIN <a class="use-link" @click="selectedCargoType = 'GRAIN'">use</a></li>
                  <li>
                    CONSTRUCTION_MATERIALS
                    <a class="use-link" @click="selectedCargoType = 'CONSTRUCTION_MATERIALS'">use</a>
                  </li>
                  <li>PLANKS <a class="use-link" @click="selectedCargoType = 'PLANKS'">use</a></li>
                  <li>COAL <a class="use-link" @click="selectedCargoType = 'COAL'">use</a></li>
                  <li>LOGS <a class="use-link" @click="selectedCargoType = 'LOGS'">use</a></li>
                  <li>
                    PLASTIC <a class="use-link" @click="selectedCargoType = 'PLASTIC'">use</a>
                  </li>
                  <li>OIL <a class="use-link" @click="selectedCargoType = 'OIL'">use</a></li>
                  <li>FUEL <a class="use-link" @click="selectedCargoType = 'FUEL'">use</a></li>
                  <li>CRUDE <a class="use-link" @click="selectedCargoType = 'CRUDE'">use</a></li>
                </ul>
                Note: You can't add a new cargo type to a vehicle. You can only change existing cargo types on the vehicle
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <button type="button" v-bind:disabled="!isValid" class="btn btn-success" @click="addEntry">
        Done
      </button>
      <button type="button" class="btn btn-secondary ml-3" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'
import IconArrowRight from '../icons/IconArrowRight.vue'

const emit = defineEmits(['insert'])
const props = defineProps(['itemToEdit'])

const searchTerm = ref('')
const steamLink = ref('')
const selected = ref('speed')
const numberVal = ref(0)
const numberVal2 = ref(0)
const startYear = ref(-1)
const endYear = ref(-1)
const reversible = ref('true')
const capacityVal = ref(1)
const capacityAction = ref('value') // value, exclude, multiplier
const selectedCargoType = ref('UNCHANGED')
const sectionDisabled = ref(false)

const isNumberInput = computed(() => {
  return (
    selected.value === 'speed' ||
    selected.value === 'loadSpeed' ||
    selected.value === 'weight' ||
    selected.value === 'price' ||
    selected.value === 'runningCosts' ||
    selected.value === 'lifespan'
  )
})

if (props.itemToEdit) {
  sectionDisabled.value = true

  const entry = props.itemToEdit.entry
  selected.value = props.itemToEdit.section
  searchTerm.value = entry[0]

  if (isNumberInput.value === true) {
    numberVal.value = entry[1]
  }

  if (isNumberInput.value === true) {
    numberVal.value = entry[1]
  } else if (selected.value === 'availability') {
    startYear.value = entry[1]
    endYear.value = entry[2]
  } else if (selected.value === 'power') {
    numberVal.value = entry[1]
    numberVal2.value = entry[2]
  } else if (selected.value === 'reversible') {
    reversible.value = entry[1] ? 'true' : 'false'
  } else if (selected.value === 'capacity') {
    // 2nd param
    if (entry[1] === 0) {
      capacityAction.value = 'exclude'
    } else if (typeof entry[1] === 'string' || entry[1] instanceof String) {
      capacityAction.value = 'multiplier'
      capacityVal.value = entry[1]
    } else {
      capacityVal.value = entry[1]
    }

    // 3rd param
    if (entry.length > 2) {
      selectedCargoType.value = entry[2]
    } else {
      selectedCargoType.value = 'UNCHANGED'
    }
  }
} else {
  sectionDisabled.value = false
}

const numberInputText = computed(() => {
  if (selected.value === 'speed') {
    return 'Enter the speed in km/h:'
  }
  if (selected.value === 'loadSpeed') {
    return 'Enter the load speed, usually a factor up to approx. 20, proportional e.g. to the number of doors:'
  }
  if (selected.value === 'weight') {
    return 'Enter the weight in t:'
  }
  if (selected.value === 'price') {
    return 'Enter the price. To activate automatic price calculation, set the price to -1'
  }
  if (selected.value === 'runningCosts') {
    return 'Enter the running costs. To activate automatic calculation, set the value to -1'
  }
  if (selected.value === 'lifespan') {
    return 'Enter the lifespan in years. Decimal values (with dot) are allowed:'
  }
  if (selected.value === 'power') {
    return 'Specific power in kW or for aircraft specify the idle thrust in N'
  }
  return ''
})

const capactityText = computed(() => {
  if (capacityAction && capacityAction.value && capacityAction.value === 'multiplier')
  {
    return "Capacity multiplier (up to a maximum of 10):"
  }

  return "Capacity. This number will be divided by 4 to get the in game capacity:";
});

const isValid = computed(() => {
  if (searchTerm.value === '' && steamLink.value === '') return false

  if (steamLink.value !== '' && !steamLink.value.includes('https://steamcommunity.com/sharedfiles/filedetails')) {
    return false
  }

  if (isNumberInput.value === true) {
    if (numberVal.value < -1) {
      return false
    }
  } else if (selected.value === 'availability') {
    if (startYear.value < -1 || startYear.value < -1) {
      return false
    }
  } else if (selected.value === 'capacity') {
  }

  return true
})

function addEntry() {
  if (steamLink.value.includes('https://steamcommunity.com/sharedfiles/filedetails')) {
    const urlParams = new URLSearchParams(steamLink.value)
    searchTerm.value =
      urlParams.get('id') || urlParams.get('https://steamcommunity.com/sharedfiles/filedetails/?id')
    if (!searchTerm.value) {
      alert('Unable to process steam link. Please manually enter the steam id instead.')
      steamLink.value = ''
      return
    }
  }
  let vehicleConfigVals = []

  if (isNumberInput.value === true) {
    vehicleConfigVals = [searchTerm.value, numberVal.value]
  } else if (selected.value === 'availability') {
    vehicleConfigVals = [searchTerm.value, startYear.value, endYear.value]
  } else if (selected.value === 'power') {
    vehicleConfigVals = [searchTerm.value, numberVal.value, numberVal2.value]
  } else if (selected.value === 'reversible') {
    vehicleConfigVals = [searchTerm.value, reversible.value === 'true']
  } else if (selected.value === 'capacity') {
    vehicleConfigVals = [searchTerm.value]

    // 2nd param
    if (typeof capacityVal.value === 'string' || capacityVal.value instanceof String ){
      capacityVal.value = capacityVal.value.replace("'", "");
      if(!isNumeric(capacityVal)){
        capacityVal.value = '0';
      }
    };

    if (capacityAction.value === 'exclude') {
      vehicleConfigVals.push(0)
    } else if (capacityAction.value === 'multiplier') {
      vehicleConfigVals.push(String(capacityVal.value))
    } else {
      vehicleConfigVals.push(Number(capacityVal.value))
    }

    // 3rd param
    if (selectedCargoType.value !== 'UNCHANGED') {
      vehicleConfigVals.push(selectedCargoType.value)
    }
  }

  console.log('insert', selected.value, vehicleConfigVals)
  emit('insert', { section: selected.value, vehicleConfig: vehicleConfigVals })
}

const availabilityText = computed(() => {
  if (startYear.value == endYear.value && startYear.value != 0 && startYear.value != -1) {
    return 'Hidden from game'
  }

  let startText = startYear.value
  if (startYear.value === 0) {
    startText = 'From Beginning'
  } else if (startYear.value == -1) {
    startText = 'Unchanged'
  }

  let endText = endYear.value
  if (endYear.value === 0) {
    endText = 'Infinite'
  } else if (endYear.value == -1) {
    endText = 'Unchanged'
  }

  return `${startText} - ${endText}`
})

function onKeyCapacity(){
  console.log('onKeyCapacity');
  let val = capacityVal.value;
  if((typeof val === 'string' || val instanceof String ) && val.startsWith("'")){
    capacityAction.value = 'multiplier'
  }
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

</script>

<style scoped>
.use-link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

.use-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
