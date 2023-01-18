<template>
  <div class="table-responsive">
    <div
      class="d-flex flex-md-row flex-column justify-content-md-between align-items-center"
    >
      <filter-bar @filter="onFilterSet"></filter-bar>
      <date-range v-show="true" @date-range="onDateRangeSet"></date-range>
      <items-per-page
        :range_max="this.date_range.max"
        :range_min="this.date_range.min"
        :options="itemsPerPage"
        :defaultPerPage="perPage"
        @items-per-page="onItemsPerPage"
      ></items-per-page>
    </div>
    <vuetable
      ref="vuetable"
      :apiUrl="apiUrl"
      :apiMode="apiMode"
      :fields="tableFields"
      :data="tableData"
      :dataTotal="dataCount"
      :dataManager="dataManager"
      :css="css.table"
      data-path="data"
      v-bind:paginationPath="paginationPath"
      :appendParams="moreParams"
      :perPage="brStr"
      :datum="perPage"
      :token="token"
      :site="site"
      v-on:vuetable:cell-clicked="(...args) => this.prikaziDetalje([args])"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <div class="d-flex justify-content-center mb-4">
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        :onEachSide="onEachSide"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuestic-modal
      :show.sync="show"
      v-bind:large="true"
      ref="largeModalComment"
      :okText="potvrdi"
      :cancelText="odustani"
      :transition="patient"
    >
      <div slot="title">{{ modalTitle }}</div>
      <div>
        <div class="form-group">
          <div class="col-md-12 info-widget-inner">
            <div class="col-md-12">
              <div class="col-md-12">
                <div class="input-group">
                  <div class="table-responsive">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <td>ID UZORKA</td>
                          <td>datum</td>
                          <td>vrijeme</td>
                          <td>izbor</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="sample in samples" :key="sample.id">
                          <td>{{ sample.id }}</td>
                          <td
                            v-if="
                              danas ===
                              sample.updated_at.slice(8, 10) +
                                '.' +
                                sample.updated_at.slice(5, 7) +
                                '.' +
                                sample.updated_at.slice(0, 4)
                            "
                          >
                            <strong>
                              {{
                                sample.updated_at.slice(8, 10) +
                                "." +
                                sample.updated_at.slice(5, 7) +
                                "." +
                                sample.updated_at.slice(0, 4)
                              }}
                            </strong>
                          </td>
                          <td
                            v-if="
                              danas !=
                              sample.updated_at.slice(8, 10) +
                                '.' +
                                sample.updated_at.slice(5, 7) +
                                '.' +
                                sample.updated_at.slice(0, 4)
                            "
                          >
                            {{
                              sample.updated_at.slice(8, 10) +
                              "." +
                              sample.updated_at.slice(5, 7) +
                              "." +
                              sample.updated_at.slice(0, 4)
                            }}
                          </td>
                          <td>{{ Test(sample.updated_at) }}</td>
                          <td>
                            <div
                              v-if="
                                danas ===
                                sample.updated_at.slice(8, 10) +
                                  '.' +
                                  sample.updated_at.slice(5, 7) +
                                  '.' +
                                  sample.updated_at.slice(0, 4)
                              "
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                class="form-check-input"
                                :id="sample._id"
                                type="checkbox"
                                checked
                                @click="UpdateSamples"
                              />
                              <label class="form-check-label" :for="sample._id">
                                <span class="abc-label-text"
                                  >Uključi u predračun</span
                                >
                              </label>
                            </div>
                            <div
                              v-if="
                                danas !=
                                sample.updated_at.slice(8, 10) +
                                  '.' +
                                  sample.updated_at.slice(5, 7) +
                                  '.' +
                                  sample.updated_at.slice(0, 4)
                              "
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                class="form-check-input"
                                :id="sample._id"
                                type="checkbox"
                                @click="UpdateSamples"
                              />
                              <label class="form-check-label" :for="sample._id">
                                <span class="abc-label-text"
                                  >Uključi u predračun</span
                                >
                              </label>
                            </div>
                          </td>

                          <td align="middle" class="valid">
                            <i
                              :class="{
                                'fa fa-check success-icon icon-right input-icon': false,
                              }"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vuestic-modal>
    <vuestic-modal-s
      v-bind:force="true"
      :show.sync="show"
      :closeIconShown="false"
      ref="upozoriModal"
      okText="nastavi"
      :cancelText="odustani"
      :transition="patient"
      :cancelClass="'btn btn-sm btn-warning'"
      :okClass="'btn btn-sm btn-primary'"
    >
      <div slot="title">{{ modalTitle }}</div>
      <div>
        <div class="form-group">
          <div class="col-md-12 info-widget-inner">
            <div class="col-md-12">
              <div class="col-md-12">
                <h5>
                  Pacijent:
                  <span style="color: #e34a4a;">{{ klijent }}</span>
                </h5>
                <h5>Nisu kompletirani uzorci:</h5>
                <br />
                <div class="input-group">
                  <div class="table-responsive">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <td>ID UZORKA</td>
                          <td>STATUS</td>
                          <!-- <td></td> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="sample in samples" :key="sample.id">
                          <td>{{ sample.id }}</td>
                          <td>{{ sample.status }}</td>

                          <!-- <td align="middle" class="valid">
                            <i :class="{"fa fa-check success-icon icon-right input-icon": false}"></i>
                          </td>-->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vuestic-modal-s>

    <vuestic-modal-uzorci
      :show.sync="show"
      ref="staticModalUzorci"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        {{ "Pacijent: " }}
        <span style="color: #4ae387;">{{ partials.pacijent }}</span>
      </div>

      <div v-if="partials_array.length > 0">
        <vuestic-accordion-obrada>
          <vuestic-collapse-uzorak 
            v-for="element in partials_array"
            :key="element"
            :sample="element"
            :color="'primary'"
          >
            <span slot="header">{{ element }}</span>
            <div slot="body">
              <div class="va-row"></div>
            </div>
          </vuestic-collapse-uzorak>

        </vuestic-accordion-obrada>
      </div>

      <hr v-if="partials_array_disabled.length > 0 && partials_array.length > 0">


      <div v-if="partials_array_disabled.length > 0">
        <vuestic-accordion-obrada>

          <vuestic-collapse-uzorak
            v-for="element in partials_array_disabled"
            :key="element"
            :sample="element"
            :color="'pale'"
          >
            <span slot="header">{{ element }}</span>
            <div slot="body">
              <div class="va-row"></div>
            </div>

          </vuestic-collapse-uzorak>

        </vuestic-accordion-obrada>
      </div>

    </vuestic-modal-uzorci>
  </div>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FilterBar from "./datatable-components/FilterBar.vue";
import DateRange from "./datatable-components/DateRange.vue";
import ItemsPerPage from "./datatable-components/ItemsPerPage.vue";
import Vue from "vue";
import LocalData from "./data/local-data";
import DataTableStyles from "../../vuestic-components/vuestic-datatable/data/data-table-styles";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import { server } from "../../../../config/config.js";
import { bus } from "../../../../src/main.js";

const originalData = LocalData.data;

export default {
  name: "vuestic-data-table",
  components: {
    FilterBar,
    DateRange,
    Vuetable,
    VuetablePagination,
    ItemsPerPage,
  },
  props: {
    site: {
      type: String,
    },
    token: {
      type: String,
    },
    sekcija: {
      type: String,
    },
    apiUrl: {
      type: String,
    },
    tableFields: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Array,
      required: true,
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      },
    },
    apiMode: {
      type: Boolean,
      default() {
        return true;
      },
    },
    data: {
      type: Array,
    },
    sortFunctions: {
      type: Object,
    },
    paginationPath: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      klijent: "",
      tableData: LocalData,
      perPage: "RADNA LISTA",
      brStr: 10,
      colorClasses: {},
      moreParams: {},
      dataCount: 0,
      css: DataTableStyles,
      show: true,
      potvrdi: "POTVRDI",
      odustani: "ODUSTANI",
      patient: "",
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      checkboxSixModel: "",
      samples: [],
      includedSamples: [],
      danas: "",
      modalTitle: "Izbor uzoraka ",
      izbor: "",
      uzorci: [],
      nouzorci: [],
      partials: {},
      partials_array: [],
      partials_array_disabled: [],
      date_range: {
        min: "",
        max: "",
      },
      filterString: "",
    };
  },
  created() {
    // console.warn(">> STORE");
    // console.log(this.$store.state.pretraga);

    this.datum();
    var current = this.$router.currentRoute.path;

    if (
      current.includes("obrada/pregled") &&
      !this.$store.state.mikrobioloski
    ) {
      this.$store.dispatch("dropdownChange", "RADNA LISTA");
      this.$store.dispatch("filterChange", "");
    } else if (
      current.includes("obrada/pregled") &&
      this.$store.state.mikrobioloski
    ) {
      this.$store.dispatch("dropdownChange", "Mikrobiologija");
      this.$store.dispatch("filterChange", "");
    } else if (!current.includes("nalazi/pregled")) {
      this.$store.dispatch("dropdownChange", "DANAS");
      this.$store.dispatch("filterChange", "");
    } else if (current.includes("kontrole/")) {
      this.$store.dispatch("dropdownChange", "RADNA LISTA");
      this.$store.dispatch("filterChange", "");
    } else {
      // Do nothing
    }

    if (this.$router.currentRoute.path.includes("nalazi/pregled")) {
      this.onFilterSet(this.$store.state.pretraga.filterBar);
    } else {
      this.perPage = this.$store.state.dropdown;
      this.onFilterSet(this.$store.state.filter);
    }
  },
  mounted() {
    if (this.$router.currentRoute.path.includes("nalazi/pregled")) {
      bus.$emit("setFilterBar", this.$store.state.pretraga.filterBar);
      bus.$emit("setDateRange", this.$store.state.pretraga.dateRange);

      if (
        this.$store.state.pretraga.dateRange.from[0] == "" &&
        this.$store.state.pretraga.dateRange.to[0] == "" &&
        this.$store.state.pretraga.itemsPerPage != ""
      ) {
        bus.$emit("setItemsPerPage", this.$store.state.pretraga.itemsPerPage);
      }
    }

    bus.$on("UzorakFromCollapse", (data) => {
      router.push("/nalazi/pregled/" + data.sample);
    });

    bus.$on("FilterBar", (data) => {
      this.$store.dispatch("FilterBarChange", data);
    });

    bus.$on("ItemsPerPage", (data) => {
      this.$store.dispatch("ItemsPerPageChange", data);

      var data = {
        od: "",
        do: "",
        from: "",
        to: "",
      };
      this.$store.dispatch("DateRangeChange", data);
    });

    bus.$on("DateRange", (data) => {
      this.$store.dispatch("DateRangeChange", data);
    });
  },
  beforeDestroy() {
    if (!this.$router.currentRoute.path.includes("nalazi/pregled")) {
      var data = {
        od: "",
        do: "",
        from: "",
        to: "",
      };

      this.$store.dispatch("FilterBarChange", "");
      this.$store.dispatch("ItemsPerPageChange", "DANAS");
      this.$store.dispatch("DateRangeChange", data);
      this.$store.dispatch("PaginationPageChange", "1");
    }

    bus.$off("UzorakFromCollapse");
    bus.$off("FilterBar");
    bus.$off("ItemsPerPage");
    bus.$off("DateRange");
  },
  methods: {
    UpdateSamples: function () {},
    convertUTCDateToLocalDate(date) {
      var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
      );
      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      var minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var sec = date.getSeconds();
      if (sec < 10) {
        sec = "0" + sec;
      }
      newDate.setHours(hours - offset);
      return hours + ":" + minutes + ":" + sec;
    },
    Test(date) {
      var datum = this.convertUTCDateToLocalDate(new Date(date));
      return datum;
    },
    catchDialog: function (event) {
      this.$dialog
        .confirm(
          'Jeste li sigurni da želite obrisati zapis? <strong style="color: #E34A4A;"><br>Brisanjem uzorka, brišete i pripadajuće mu rezultate!</strong>',
          {
            type: "hard",
            html: true,
            verification: "Da",
          }
        )
        .then(() => {
          var uzorakid = event.target.id;

          http
            .post("uzorci/delete", {
              id: event.target.id,
              email: this.$store.state.user,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {
              if (res.data.success === false) {
                this.toastText = "Greška prilikom brisanja!";
                this.toastIcon = "fa-remove";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-danger";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
              } else {
                this.toastText = "Zapis uspješno obrisan!";
                this.toastIcon = "fa-check";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-primary";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
                this.onFilterSet("");
              }
            });
        })
        .catch(function () {});
    },
    catchDialogKontrola: function (event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da",
        })
        .then(() => {
          var kontrolaid = event.target.id;

          http
            .post("kontrole/pregled/delete/", {
              _id: event.target.id,
              site: this.$store.state.site,
              token: this.$store.state.token,
            })
            .then((res) => {
              if (res.data.success === false) {
                this.toastText = "Greška prilikom brisanja!";
                this.toastIcon = "fa-remove";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-danger";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
              } else {
                this.toastText = "Zapis uspješno obrisan!";
                this.toastIcon = "fa-check";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-primary";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
                this.onFilterSet("");
              }
            });
        })
        .catch(function () {});
    },
    catchDialogOutbox: function (event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da",
        })
        .then(() => {
          var idNalaza = event.target.id;
          var eNalaz = event.target.getAttribute("name");

          http
            .post("outbox/delete", {
              email: this.$store.state.userId,
              token: this.$store.state.token,
              site: this.$store.state.site,
              status: true,
              idNalaza: idNalaza,
              eNalaz: eNalaz,
              flag: true,
            })
            .then((res) => {
              if (res.data.success === false) {
                this.toastText = "Greška prilikom brisanja!";
                this.toastIcon = "fa-remove";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-danger";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
              } else {
                this.toastText = "Zapis uspješno obrisan!";
                this.toastIcon = "fa-check";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-primary";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
                this.onFilterSet("");
              }
            });
        })
        .catch(function () {});
    },
    catchDialogNalaz: function (event) {
      this.$dialog
        .confirm("Jeste li sigurni da želite obrisati zapis?", {
          type: "hard",
          html: true,
          verification: "Da",
        })
        .then(() => {
          var idNalaza = event.target.id;

          http
            .post("nalazi/delete", {
              email: this.$store.state.userId,
              token: this.$store.state.token,
              site: this.$store.state.site,
              status: true,
              idNalaza: idNalaza,
              flag: true,
            })
            .then((res) => {
              if (res.data.success === false) {
                this.toastText = "Greška prilikom brisanja!";
                this.toastIcon = "fa-remove";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-danger";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
              } else {
                this.toastText = "Zapis uspješno obrisan!";
                this.toastIcon = "fa-check";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-primary";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className,
                });
                this.onFilterSet("");
              }
            });
        })
        .catch(function () {});
    },
    objToString(obj) {
      var str = "";
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str += p + "::" + obj[p] + "\n";
        }
      }
      return str;
    },
    prikaziDetalje: function (args) {
      var niz = args[0];

      if (
        args[0][2].srcElement.cellIndex === undefined &&
        !args[0][2].srcElement.classList.contains("disabled")
      ) {
        if (niz[1].name === "barkod") {
          this.printajBarcode(args, niz[2]);
        }
        if (niz[1].name === "izbrisi") {
          this.catchDialog(niz[2]);
        }
        if (niz[1].name === "izbrisiKontrolu") {
          this.catchDialogKontrola(niz[2]);
        }
        if (niz[1].name === "brisanje") {
          this.catchDialogNalaz(niz[2]);
        }
        if (niz[1].name === "brisanjeOutbox") {
          this.catchDialogOutbox(niz[2]);
        }
        if (niz[1].name === "integracija") {
          console.log(niz[2].target.id);
          http
            .post("api/retry", {
              id: niz[2].target.id,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {});
        }
        if (niz[1].name === "barcodes") {
          http
            .get(
              "/rezultati/odobravanje/barcodes/" +
                niz[2].target.id +
                "/" +
                niz[0].id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                niz[0].datum.replace(/\./g, "-"),
              {}
            )
            .then((res) => {
              res.data.results.forEach((element) => {
                var godiste = element.patient.jmbg.substring(4, 7);
                switch (godiste[0]) {
                  case "9":
                    godiste = "1" + godiste;
                    break;
                  case "0":
                    godiste = "2" + godiste;
                    break;

                  default:
                    break;
                }

                var datum = element.created_at.substring(0, 10).split("-");
                var vrijeme = element.created_at.split("T")[1].substring(0, 5);
                datum =
                  datum[2] + "." + datum[1] + "." + datum[0].substring(2, 4);
                datum = datum + "" + vrijeme;
                var link = server + "images/barcodes/" + element.id + ".png";

                printEPL(
                  element.patient.ime + " " + element.patient.prezime,
                  element.id,
                  element.sample.pid,
                  godiste,
                  datum,
                  link,
                  element.sample.code,
                  this.$store.state.site,
                  undefined,
                  undefined
                );
              });
            });
        }
        if (niz[1].name === "nalazipregled") {

          // console.log(niz)

          if(niz[0].nalazipregled.includes("ERROR")){

          }else{
            router.push("/nalazi/pregled/" + niz[2].target.id);

          }

          
        }


        if (niz[1].name === "outbox") {

          if(niz[0].outbox.includes("ERROR")){

          }else{
            router.push("/nalazi/outbox/" + niz[2].target.id);

          }
     
          
        }

        if (niz[1].name === "racun") {
          router.push("/obrada/predracun/" + niz[2].target.id);
        }























        if (niz[1].name === "partneri") {

          if(niz[0].posiljaoc != null){
            console.log("Pošiljaoc:")
            console.log(niz[0].posiljaoc)

            niz[0].uzorci.forEach(element => {
              console.log(element)
              
            });

          }else if(niz[0].narucioc != null){
            console.log("Naručioc:")
            console.log(niz[0].narucioc)
            niz[0].uzorci.forEach(element => {
              console.log(element)
              
            });


          }else{

          }
          
        }

























        

        if (niz[1].name === "obrada") {
          router.push(
            "/obrada/rezultati/" +
              niz[0]._id +
              "/" +
              niz[0].id +
              "?date=" +
              niz[0].date
          );
        }

        //
        //
        //
        //
        //
        //
        //
        //
        //
        //

        // Kontrole OBRADA

        if (niz[1].name === "kontrole") {
          // console.log(niz[0]);
          // console.log(niz[0].id)
          // console.log(niz[0].created)
          router.push({
            path:
              "/kontrole/obrada/rezultati/",
            query: {
              kontrola: niz[0]._id
            },
          });
        }

        //
        //
        //
        //
        //
        //
        //
        //
        //
        //

        // Kontrole BARCODE

        if (niz[1].name === "barcode") {
          var link =
            server + "images/barcodes/kontrole/" + niz[0].control + ".png";
          var datum = niz[0].created.substring(0, 10).split("-");
          var vrijeme = niz[0].created.split("T")[1].substring(0, 5);

          datum = datum[2] + "." + datum[1] + "." + datum[0].substring(2, 4);
          datum = datum + "" + vrijeme;

          // console.log(link);

          printEPL(
            "",
            "",
            "",
            "",
            datum,
            link,
            "",
            this.$store.state.site,
            undefined,
            undefined
          );
        }

        if (niz[1].name === "partials") {

          console.log( niz[2].target.id)
          console.log(niz[2].target.title)
          
          this.partials = {};
          this.partials_array = [];
          this.partials_array_disabled = [];

          if(niz[2].target.id.trim() != ""){
            this.partials.uzorci = niz[2].target.id;
            this.partials_array = this.partials.uzorci.split(",");
          }

          if(niz[2].target.title.trim() != ""){
            this.partials.uzorci_disabled = niz[2].target.title;
            this.partials_array_disabled = this.partials.uzorci_disabled.split(",");
          }
          
          
          
          this.partials.pacijent = niz[2].target.getAttribute("name");
          // console.log(niz[2].target.id)

          if(niz[2].target.id != "unavailable"){

            console.log(this.partials_array)
            console.log(this.partials_array_disabled)

            this.$refs.staticModalUzorci.open();
          }
          
        }
      }
    },
    izbrisiUzorak(event) {
      var uzorakid = event.target.id;
    },
    printajBarcode(args, event) {
      http
        .get(
          "uzorci/barcode/" +
            args[0][0].id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          printEPL(
            args[0][0].ime + " " + args[0][0].prezime,
            args[0][0].id,
            res.data.pacijentRBr,
            res.data.godiste,
            res.data.datum,
            event.target.id,
            res.data.code,
            this.$store.state.site
          );
        });
    },
    datum() {
      var d = new Date();
      var mjesec = d.getMonth() + 1;
      var dan = d.getUTCDate();
      if (dan < 10) {
        dan = "0" + dan;
      }
      if (mjesec < 10) {
        mjesec = "0" + mjesec;
      }
      this.perPage = d.getFullYear() + "-" + mjesec + "-" + dan;
      this.perPage = "RADNA LISTA";
    },
    onFilterSet(filterText, event) {
      this.filterString = "";

      this.filterString = filterText;

      if (event != undefined && filterText.trim() != "") {
        if (event.keyCode == 13) {
          if (this.apiMode) {
            this.moreParams = {
              filter: filterText,
              dateRangeMin: this.date_range.min,
              dateRangeMax: this.date_range.max,
            };
          } else {
            const txt = new RegExp(filterText, "i");
            this.tableData.data = originalData.filter(function (item) {
              return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
            });
          }

          Vue.nextTick(() => this.$refs.vuetable.refresh());
        } else {
          // console.warn('Waiting for Enter...')
        }
      } else {
        if (this.apiMode) {
          this.moreParams = {
            filter: filterText,
            dateRangeMin: this.date_range.min,
            dateRangeMax: this.date_range.max,
          };
        } else {
          const txt = new RegExp(filterText, "i");
          this.tableData.data = originalData.filter(function (item) {
            return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
          });
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      }
    },

    onDateRangeSet(val1, val2) {
      this.date_range.min = val1;
      this.date_range.max = val2;
      if (this.apiMode) {
        this.moreParams = {
          filter: this.filterString,
          dateRangeMin: this.date_range.min,
          dateRangeMax: this.date_range.max,
        };
      } else {
        const txt = new RegExp(filterText, "i");
        this.tableData.data = originalData.filter(function (item) {
          return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
        });
      }
      if (this.date_range.min != "" && this.date_range.max != "") {
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      }
    },

    onItemsPerPage(itemsPerPageValue) {
      this.date_range = {
        min: "",
        max: "",
      };

      this.moreParams = {
        filter: this.filterString,
        dateRangeMin: this.date_range.min,
        dateRangeMax: this.date_range.max,
      };

      this.perPage = itemsPerPageValue;
      this.$store.dispatch("dropdownChange", this.perPage);

      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);

      if (!isNaN(page)) {
        // console.log(page)
        this.$store.dispatch("PaginationPageChange", page.toString());
      } else {
        switch (page) {
          case "prev":
            console.log("<");
            break;
          case "next":
            console.log(">");
            break;

          default:
            break;
        }
      }
    },
    dataManager(sortOrder, pagination) {
      let data = this.tableData.data;
      let sortFunctions = this.sortFunctions;

      if (sortOrder.length > 0) {
        data.sort(function (item1, item2) {
          const sortField = sortOrder[0].sortField;
          let fn = sortFunctions[sortField];
          if (fn) {
            return fn(item1[sortField], item2[sortField]);
          }
        });
        if (sortOrder[0].direction === "desc") {
          data.reverse();
        }
      }
      pagination = this.$refs.vuetable.makePagination(data.length);
      return {
        pagination: pagination,
        data: data.slice(pagination.from - 1, pagination.to),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";
@import "../../../sass/toasts";
@media (max-width: 1258px) {
  .pagination-link-btn:first-child,
  .pagination-link-btn:last-child {
    display: none;
  }
  .pagination-link-btn:nth-child(2) {
    border-top-left-radius: $btn-border-radius !important;
    border-bottom-left-radius: $btn-border-radius !important;
  }
  .pagination-link-btn:nth-last-child(2) {
    border-top-right-radius: $btn-border-radius !important;
    border-bottom-right-radius: $btn-border-radius !important;
  }
}

@media (max-width: 576px) {
  .hide-not-focused-btn:not(.focus) {
    display: none;
  }
}

.vuetable th#_odobravanje {
  width: 220px;
}
</style>
