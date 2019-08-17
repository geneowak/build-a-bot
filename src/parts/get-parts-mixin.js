export default {
  created() {
    this.$store.dispatch('robots/getParts');
  },
  computed: {
    parts() {
      return (
        this.$store.state.robots.cartparts || {
          heads: [],
          arms: [],
          torsos: [],
          bases: [],
        }
      );
    },
  },
};
