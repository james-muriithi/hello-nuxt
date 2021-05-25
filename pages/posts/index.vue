<template>
  <div class="posts-page">
      <posts-list />
  </div>
</template>

<script>

import PostsList from '~/components/Posts/PostsList.vue';

export default {
  components: {
    PostsList
  }
}
</script>
