<template>
  <div>
    <h1>
      Bienvenue
      <label>
        <input
          class="big"
          type="text"
          v-model="form.newUsername"
          v-if="edit === true"
        />
      </label>
      <button class="big" @click="editUser" v-if="edit === true">
        Valider
      </button>
      <span v-if="edit === false" @click="editField" class="hover">
        {{ user.newUsername }}
      </span>
    </h1>
    <!--<h2>{{ value }}</h2>-->
    <datepicker
      v-model="selectedDate"
      format="dd-MM-yyyy"
      placeholder="Select a date"
      @selected="handleDate"
    >
    </datepicker>
    <apexchart
      ref="chart"
      class="chart"
      type="line"
      :options="chart.options"
      :series="chart.series"
    >
    </apexchart>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
export default {
  name: "Stats",
  components: {
    Datepicker
  },
  data() {
    return {
      interval: null,
      edit: false,
      user: JSON.parse(localStorage.getItem("user")),
      form: {
        newUsername: ""
      },
      value: {
        raw: 0,
        filtered: 0
      },
      selectedDate: "",
      series: {
        data1: [],
        data2: []
      },
      chart: {
        width: "100%",
        options: {
          xaxis: {
            type: "datetime",
            tickAmount: 6
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm:ss"
            }
          }
        },
        series: []
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    const self = this;
    this.interval = setInterval(function() {
      self.getData();
    }, 5000);
  },
  methods: {
    getData() {
      this.url = this.selectedDate
        ? "http://localhost:9000/api/fakeprobedate/" + this.selectedDate
        : "http://localhost:9000/api/fakeprobe";
      console.log(this.url);
      axios.get(this.url).then(data => {
        this.series = {
          data1: [],
          data2: []
        };
        data.data.map(function(obj) {
          this.series.data1.push([obj.date, obj.raw]);
          this.series.data2.push([obj.date, obj.filtered]);
        }, this);
        this.showSeries();
      });
    },
    handleDate(date) {
      clearInterval(this.interval);
      this.selectedDate = moment(date).format("YYYY-MM-DD");
      this.getData();
    },
    editField() {
      this.form.newUsername = this.user.newUsername;
      this.edit = !this.edit;
    },
    editUser() {
      this.user = {
        oldUsername: this.user.newUsername,
        newUsername: this.form.newUsername,
        date: new Date()
      };
      localStorage.setItem("user", JSON.stringify(this.user));
      this.edit = false;
    },
    showSeries() {
      this.chart.series = [
        { name: "Raw", data: this.series.data1 },
        { name: "Filtered", data: this.series.data2 }
      ];
    }
  }
};
</script>
<style>
.big {
  font-size: 20px;
}
.hover:hover {
  cursor: pointer;
}
</style>
