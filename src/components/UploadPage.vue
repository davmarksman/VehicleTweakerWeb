<template>
    <div>
          Check here to find the mod directory: <a href="https://www.transportfever2.com/wiki/doku.php?id=gamemanual:gamefilelocations#overview">https://www.transportfever2.com/wiki/doku.php?id=gamemanual:gamefilelocations#overview</a>
        <br />
        Then its:
        <ul>
          <li>Steam:   /2668633703/res/scripts/wkvt_settings.lua</li>
          <li>Downloaded: /wk_vehicle_tweaker_1/res/scripts/wkvt_settings.lua</li>
        </ul>
        <div class="alert alert-primary" role="alert">
          <small>C:\Program Files (x86)\Steam\steamapps\workshop\content\1066780\2668633703\res\scripts</small>
        </div>
    

        <div class="form-group">
            <label for="inUpload">Upload wkvt_settings.lua file:</label>
            <input id="inUpload" type="file" @change="onFileUpload($event)" accept=".lua" class="form-control" /><br />
        </div>        
        <div class="form-group">
            <label for="textFileArea">Or paste the contents of the file here:</label>
            <textarea v-model="fileContents" class="form-control" id="textFileArea" rows="30"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="$emit('upload', fileContents)">Upload</button>
    </div>
</template>

<script setup>


import { ref } from "vue";

const fileContents = ref("");
const file = ref(null)


function onFileUpload($event) {
  if (!$event || !$event.target|| !$event.target.files) {
    return;
  }

  let file =  $event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      fileContents.value = reader.result;
    },
    false,
  );

  if (file) {
    reader.readAsText(file);
  }
}


</script>

<style scoped>

</style>