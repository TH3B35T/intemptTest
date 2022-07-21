<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from "@vue/composition-api";
import { useRouter } from "@/utils";
import LayoutBlank from "@/layouts/Blank.vue";

export default {
  components: {
    LayoutBlank,
  },
  setup() {
    const { route } = useRouter();

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null;

      if (route.value.meta.layout === "blank") return "layout-blank";
    });

    return {
      resolveLayout,
    };
  },
};
</script>
