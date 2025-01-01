<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    error() {
      return this.$store.getters['requests/error']
    },
    requests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    },
  },
  created() {
    this.loadRequests()
  },
  methods: {
    handleError() {
      this.$store.dispatch('requests/setError', null)
    },
    async loadRequests() {
      this.isLoading = true
      await this.$store.dispatch('requests/fetchRequests')

      this.isLoading = false
    },
  },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
