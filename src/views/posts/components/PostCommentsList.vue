<template>
  <v-card class="ma-5">
    <v-data-table
      :headers="headers"
      :items="comments"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "#ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Body", value: "body" },
    ],
  }),
  computed: {
    ...mapGetters(["getPostComments"]),
    comments() {
      return this.getPostComments;
    },
  },
  async mounted() {
    document.title = this.$route.meta.title;
  },
};
</script>

<style>
</style>
