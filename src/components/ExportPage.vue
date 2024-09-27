<template>
    <div>
        <label> The wkvt_settings.lua file should have downloaded to your computer.</label>
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