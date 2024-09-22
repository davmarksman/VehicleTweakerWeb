<template>
    <div>
        <div class="form-group">
            <label for="textFileArea">Paste the contents of the file here:</label>
            <textarea v-model="fileContents" class="form-control" id="textFileArea" rows="30"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="$emit('upload', fileContents)">Upload</button>
    </div>
</template>

<script setup>


import { ref } from "vue";

const fileContents = ref("");



</script>

<style scoped>

</style>