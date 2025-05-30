<template>
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.9482 6.79916L17.3903 18.6556C17.2131 19.497 16.6958 19.6987 15.9731 19.3093L11.0602 15.359C10.6316 15.0144 10.6203 14.3514 11.0374 13.9922C12.9006 12.3876 16.6 8.5625 16.6 8.5625C16.6 8.5625 11.4873 11.692 9.48998 13.1186C8.87495 13.5579 8.10716 13.7017 7.38226 13.5094L3.60831 12.5083C2.77218 12.265 2.76509 11.7017 3.79254 11.2914L18.857 5.58918C19.5443 5.29016 20.2033 5.75607 19.9412 6.79221L19.9482 6.79916Z"
      :stroke="props.type == 'leave' ? '#FF3B30' : 'currentcolor'" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
  },
})
</script>