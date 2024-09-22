<template>
    <div>
        <div class="form-group">
            <label for="textFileArea">Do Something:</label>
            <textarea :value="contents" class="form-control" id="textFileArea" rows="30"></textarea>
        </div>
        <button type="button" class="btn btn-primary" @click="$emit('done')">Done</button>
    </div>
</template>

<script setup>
const props = defineProps(['contents'])

console.log('contents', props.contents)

</script>

<style scoped>

</style>