<template>
  <v-app>
    <v-main>
      <v-card class="ma-5 mb-10">
        <v-data-table
          :headers="headers"
          :items="posts"
          class="elevation-1"
          @click:row="viewPost"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <p class="black--text">{{ item.id }}</p>
              </td>
              <td>
                <a @click="viewPost(item)"
                  ><p class="primary--text">{{ item.title }}</p></a
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-card class="mx-3 mt-5">
        <v-fab-transition>
          <v-btn
            class=""
            fab
            absolute
            bottom
            right
            color="primary"
            @click="addPost"
          >
            <v-icon large>
              {{ icons.mdiPlus }}
            </v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card>
    </v-main>
  </v-app>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { mdiPlus } from "@mdi/js";
export default {
  data: () => ({
    headers: [
      {
        text: "#ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Title",
        sortable: false,
        value: "title",
      },
    ],
    icons: {
      mdiPlus,
    },
  }),
  computed: {
    ...mapGetters(["getPosts"]),
    posts() {
      return this.getPosts;
    },
  },
  async mounted() {
    document.title = this.$route.meta.title;
    await this.getAllPosts();
  },
  methods: {
    ...mapActions(["getAllPosts"]),
    viewPost(post) {
      this.$router.push({ name: "PostView", params: { id: post.id } });
    },
    addPost(post) {
      this.$router.push({ name: "PostCreateOrEdit", params: { id: post.id } });
    },
  },
};
</script>

<style>
</style>
