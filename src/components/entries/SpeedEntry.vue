<template>

  <button class="list-group-item list-group-item-action flex-column align-items-start"
    style="padding-top: 6px; padding-bottom: 6px;">
    <div>
      <div class="d-flex justify-content-between" style="margin-right: 50px;">
        <h5 v-if="hasSteamLink" class="mb-1">
          <a :href="steamLink" target="_blank">{{ searchTerm}}</a>
        </h5>
        <h5 v-else class="mb-1">{{ searchTerm }}</h5>
        <small>{{ speed }} km/h</small>
      </div>
      <IconDelete @click="$emit('delete')"  class="icon"/>
    </div>
  </button>
</template>

<script setup>
import IconDelete from '../icons/IconDelete.vue';
import { ref, computed } from 'vue';

const props = defineProps(['item'])

const searchTerm = ref(props.item[0]);
const speed = ref(props.item[1]);

const hasSteamLink = computed(() => {
  return /^\d+$/.test(searchTerm.value)
})
const steamLink = ref('https://steamcommunity.com/sharedfiles/filedetails/?id='+ searchTerm.value)

console.log("Speed Entry", props.item, hasSteamLink.value)


</script>

<style scoped>
.icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
