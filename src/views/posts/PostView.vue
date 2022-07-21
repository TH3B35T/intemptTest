<template>
  <v-container>
    <div id="user-view">
      <div>
        <v-row>
          <v-col cols="12" md="5" lg="4">
            <v-row class="user-bio-panel">
              <v-col cols="12">
                <v-card class="pt-10">
                  <v-card-text class="d-flex justify-center flex-wrap pe-sm-0">
                    <div class="d-flex align-center me-4 mb-2">
                      <v-avatar
                        size="40"
                        rounded
                        color="primary"
                        class="v-avatar-light-bg primary--text me-3"
                      >
                        <v-icon color="white" size="22">
                          {{ icons.mdiPostOutline }}</v-icon
                        >
                      </v-avatar>
                      <div>
                        <h3
                          class="
                            text-xl
                            font-weight-medium
                            mb-n1
                            d-block
                            text-truncate
                          "
                          style="width: 250px"
                        >
                          {{ post.id }}
                        </h3>
                        <span>#Post ID</span>
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-text class="d-flex justify-center flex-wrap pe-sm-0">
                    <div class="d-flex align-center me-4 mb-2">
                      <v-avatar
                        size="40"
                        rounded
                        color="primary"
                        class="v-avatar-light-bg primary--text me-3"
                      >
                        <v-icon size="22" color="white"
                          >{{ icons.mdiAccount }}
                        </v-icon>
                      </v-avatar>
                      <div>
                        <h3
                          class="
                            text-xl
                            font-weight-medium
                            mb-n1
                            d-block
                            text-truncate
                          "
                          style="width: 250px"
                        >
                          {{ post.userId }}
                        </h3>
                        <span>#Author ID</span>
                      </div>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <h2 class="text-xl font-weight-semibold mb-2">Details</h2>

                    <v-divider></v-divider>

                    <v-list>
                      <v-list-item dense class="px-0 mb-n2">
                        <span class="font-weight-medium me-2 primary--text"
                          >Title:</span
                        >

                        <v-list-item-content class="">
                          <strong class="justify-content">{{
                            post.title
                          }}</strong>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item dense class="px-0 mb-n2">
                        <span class="font-weight-medium me-2 primary--text"
                          >Body:</span
                        >
                        <v-list-item-content class="justify-content">
                          {{ post.body }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn color="primary" class="me-3" @click="editPost">
                      Edit
                    </v-btn>
                    <v-btn
                      color="error"
                      outlined
                      @click="deleteConfirmDialog = !deleteConfirmDialog"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="7" lg="8">
            <v-tabs v-model="postTab" show-arrows class="user-tabs">
              <v-tab v-for="tab in tabs" :key="tab.icon">
                <v-icon size="20" class="me-3">
                  {{ tab.icon }}
                </v-icon>
                <span>{{ tab.title }}</span>
              </v-tab>
            </v-tabs>
            <v-tabs-items
              id="user-tabs-content"
              v-model="postTab"
              class="mt-5 pa-1"
            >
              <v-tab-item>
                <post-comments></post-comments>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="deleteConfirmDialog" max-width="500px">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="deleteConfirmDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="deletePost(post.id)"> OK </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiCommentTextMultiple, mdiPostOutline, mdiAccount } from "@mdi/js";

export default {
  name: "PostView",
  components: {
    postComments: () => import("@/views/posts/components/PostCommentsList.vue"),
  },
  data: () => ({
    deleteConfirmDialog: false,
    isEditPostModalOpen: false,
    postTab: null,
    tabs: [{ icon: mdiCommentTextMultiple, title: "Comments" }],
    icons: {
      mdiAccount,
      mdiPostOutline,
    },
  }),
  computed: {
    ...mapGetters(["getPost"]),
    post() {
      return this.getPost;
    },
  },
  async mounted() {
    await this.getSinglePost(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getSinglePost", "deletePost"]),
    editPost() {
      this.$router.push({
        path: `/PostCreateOrEdit/${this.post.id}`,
      });
    },
  },
};
</script>

<style>
</style>
