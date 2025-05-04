<template>
    <div>
        <label> The wkvt_settings.lua file should have downloaded to your computer. Paste it in the correct directory</label>

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
        </div>
        
        <div class="form-group">
            <label for="textFileArea">
                You can copy the text from here if the download failed:
            </label>
            <textarea :value="contents" class="form-control mt-3" id="textFileArea" rows="30"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="$emit('done')">Done</button>
    </div>
</template>

<script setup>
const props = defineProps(['contents'])

console.log('contents', props.contents)


function downloadToComputer(data, mimeType, filename ){
  let blob = new Blob([data], { type: mimeType });
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

downloadToComputer(props.contents, 'text/plain', 'wkvt_settings.lua')


</script>

<style scoped>

</style>
