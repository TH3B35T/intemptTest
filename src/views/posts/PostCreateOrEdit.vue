<template>
  <v-container>
    <v-card class="ma-5 pa-5">
      <v-form ref="form">
        <v-text-field
          v-model="post.title"
          label="Title"
          required
        ></v-text-field>

        <v-textarea v-model="post.body" label="Body" required></v-textarea>
        <v-text-field
          v-model="post.userId"
          type="number"
          label="Author"
          required
        ></v-text-field>
        <v-card-actions>
          <v-btn color="primary" class="mx-5 mt-5" @click="save"> SAVE </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mx-5 mt-5" @click="$refs.form.reset()">
            Reset Form
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="resSnackbar.active" :color="resSnackbar.color">
      {{ resSnackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="resSnackbar.active = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PostCreateOrEdit",
  data: () => ({
    // post: {
    //   title: "",
    //   body: "",
    //   userId: "",
    // },
    resSnackbar: {
      active: false,
      message: "",
      color: "",
    },
  }),
  computed: {
    ...mapGetters(["getPost"]),
    postId() {
      return this.$route.params.postId;
    },
    post: {
      get() {
        return this.getPost;
      },
      set() {
        return {
          title: "",
          body: "",
          userId: "",
        };
      },
    },
  },
  async mounted() {
    if (this.postId) {
      await this.getSinglePost(this.postId);
    }
  },
  methods: {
    ...mapActions(["addPost", "getSinglePost", "editPost"]),

    async save() {
      const response = this.postId
        ? await this.editPost(this.post)
        : await this.addPost(this.post);
      if (response.status === 201 || response.status === 200) {
        this.resSnackbar.message = this.postId
          ? `${response.data?.title} has been edited successfully!`
          : `${response.data?.title} has been added successfully!`;
        this.resSnackbar.color = "success";
        this.resSnackbar.active = true;
      } else {
        this.resSnackbar.message = "Something went wrong!";
        this.resSnackbar.color = "error";
        this.resSnackbar.active = true;
      }
    },
  },
};
</script>

<style>
</style>