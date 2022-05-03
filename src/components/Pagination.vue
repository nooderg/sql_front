<template>
  <v-container>
    <div class="sorts">
      <v-radio-group v-model="radioSort">
        <h2>Catégorie:</h2>

        <v-radio
          @click="setSort(sort)"
          v-for="sort in order_by"
          :key="sort.key"
          :label="sort.value"
          :value="sort.key"
        ></v-radio>
      </v-radio-group>
      <v-radio-group v-model="radioAsc">
        <h2>Direction:</h2>
        <v-radio
          @click="setDirection(direction)"
          v-for="direction in directions"
          :key="direction.key"
          :label="direction.value"
          :value="direction.key"
        ></v-radio>
      </v-radio-group>
      <div>
        <h2>Page:</h2>
        <v-text-field
          v-model="currentPage"
          hide-details
          single-line
          type="number"
          @input="page => changePage(page)"
        />
      </div>
      <div>
        <h2>Movies per pages:</h2>
        <v-text-field
          v-model="currentNumberOfPage"
          hide-details
          single-line
          type="number"
          @input="page => changeNumberOfPage(page)"
        />
      </div>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">title</th>
            <th class="text-left">rental</th>
            <th class="text-left">category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in movies" :key="item.name">
            <td>{{ item.title }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.total_rental }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "Pagination",

  data: () => ({
    headers: [
      { text: "Title", value: "title" },
      { text: "Genre", value: "category" },
      { text: "Rentals", value: "total_rental" }
    ],
    movies: [],
    order_by: [
      {
        key: "title",
        value: "Title"
      },
      {
        key: "category",
        value: "Genre"
      },
      {
        key: "rental",
        value: "Rentals"
      }
    ],
    current_sort: "title",
    directions: [
      {
        key: "asc",
        value: "Up"
      },
      {
        key: "desc",
        value: "Down"
      }
    ],
    current_direction: "asc",
    radioSort: 1,
    radioAsc: 1,
    currentPage: 1,
    currentNumberOfPage: 10
  }),
  methods: {
    setSort(sort) {
      this.current_sort = sort.key;
      this.$http
        .get("/movies", {
          params: {
            limit: 10,
            offset: this.currentPage * 10,
            order_by: this.current_sort,
            asc: this.current_asc
          }
        })
        .then(res => (this.movies = res.data));
    },
    setDirection(direction) {
      this.current_direction = direction.key;
      this.$http
        .get("/movies", {
          params: {
            limit: 10,
            offset: this.currentPage * this.currentNumberOfPage,
            order_by: this.current_sort,
            asc: this.current_direction
          }
        })
        .then(res => {
          this.movies = res.data;
          console.log(res.data);
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.$http
        .get("/movies", {
          params: {
            limit: this.currentNumberOfPage,
            offset: this.currentPage * this.currentNumberOfPage,
            order_by: this.current_sort,
            asc: this.current_asc
          }
        })
        .then(res => (this.movies = res.data));
    },
    changeNumberOfPage(number) {
      this.currentNumberOfPage = number;
      this.$http
        .get("/movies", {
          params: {
            limit: this.currentNumberOfPage,
            offset: this.currentPage * this.currentNumberOfPage,
            order_by: this.current_sort,
            asc: this.current_asc
          }
        })
        .then(res => (this.movies = res.data));
    }
  },
  mounted() {
    this.$http
      .get("/movies", {
        params: {
          limit: this.currentNumberOfPage,
          offset: this.currentPage * this.currentNumberOfPage,
          order_by: this.current_sort,
          asc: this.current_asc
        }
      })
      .then(res => (this.movies = res.data));

    this.$http.get("/count_pages").then(res => console.log(res.data));
  }
};
</script>

<style lang="scss" scoped>
.sorts {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.1);
  & > * {
    margin: 10px;
  }
}
</style>