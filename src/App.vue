<template>
  <v-app>
    <v-main>
      <Pagination />
    </v-main>
  </v-app>
</template>

<script>
import Pagination from "./components/Pagination";

export default {
  name: "App",

  components: {
    Pagination
  }
};
</script>
