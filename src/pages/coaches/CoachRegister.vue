<template>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <coach-form @save-data="saveCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveCoach(coachData) {
      this.$store.dispatch('coaches/registerCoach', coachData)
      // this.$router.push({ name: 'coachesList' })
      this.$router.replace({ name: 'coachesList' })
    },
  },
}
</script>
