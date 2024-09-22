<template>
    <div>
        <div v-if="isValid()">
            <h3>Speed</h3>
            <!-- eslint-disable-next-line -->

            <h3>Capacity</h3>
            <h1>{{model.value["capacity"][0][0]}}</h1>

        </div>
        <div v-else>
            <h1>Model is not valid</h1>
        </div>
   
        <button type="button" class="btn btn-primary" @click="updateFunction">Update</button>
    </div>
</template>

<script setup>
// Errors with model & model not initialised. Not sure what happening as expected to be passed in initialised
import { ref, defineModel } from "vue";


const model = defineModel({ type: Object })
function update() {
  model.value++
}
console.log("EditorPage", model.value)

let capactity = ref([]);


function isValid(){
    return model && model.value 
        && model.value["speed"] !== undefined
        && model.value["availability"] !== undefined
        && model.value["capacity"] !== undefined
        && model.value["loadSpeed"] !== undefined
        && model.value["power"] !== undefined
        && model.value["weight"] !== undefined
        && model.value["price"] !== undefined
        && model.value["runningCosts"] !== undefined
        && model.value["lifespan"] !== undefined
        && model.value["reversible"] !== undefined
}

function updateFunction(){
    console.log("isvalid", isValid());
    console.log("EditorPage", model.value)
    console.log("Capacity", model.value["capacity"]);
    console.log("Speed", model.value.speed);
    capactity = model.value["capacity"];
}

</script>

<style scoped>

</style>