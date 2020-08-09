<template>
  <div class="form-elements">
    <div v-show="!report_pdf" class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Izvještaji">
          <div class="row">
            <div class="col-md-3">
              <fieldset>
                <div class="tree-view-advanced-preview">
                  <vuestic-tree-root ref="treeView">
                    <vuestic-tree-category isOpen label="Izbornik">
                      <vuestic-tree-node>
                        <!-- Knjiga protokola -->
                        <a
                          v-if="$store.state.reports.protokol"
                          href="#"
                          :class="{'clicked': izbor === 'Knjiga protokola', 'lnk': izbor != 'Knjiga protokola'}"
                        >
                          <div @click="doSomethingOnClick('Knjiga protokola')">Knjiga protokola</div>
                        </a>
                        <!-- Broj urađenih analiza -->
                        <a
                          v-if="$store.state.reports.ppodanu"
                          href="#"
                          :class="{'clicked': izbor === 'Potrošnja', 'lnk': izbor != 'Potrošnja'}"
                        >
                          <div @click="doSomethingOnClick('Potrošnja')">Broj urađenih analiza</div>
                        </a>
                        <!-- Pacijenti po mjestu -->
                        <a
                          v-if="$store.state.reports.ppomjestu"
                          href="#"
                          :class="{'clicked': izbor === 'Pacijenti po mjestu', 'lnk': izbor != 'Pacijenti po mjestu'}"
                        >
                          <div
                            @click="doSomethingOnClick('Pacijenti po mjestu')"
                          >Pacijenti po mjestu</div>
                        </a>
                        <!-- TAT po pacijentu -->
                        <a
                          v-if="$store.state.reports.tatpopacijentu"
                          href="#"
                          :class="{'clicked': izbor === 'TAT po pacijentu', 'lnk': izbor != 'TAT po pacijentu'}"
                        >
                          <div @click="doSomethingOnClick('TAT po pacijentu')">TAT po pacijentu</div>
                        </a>
                        <!-- Pacijenti po lokaciji -->
                        <a
                          v-if="$store.state.reports.ppolokaciji && customers.length && customersLoaded"
                          href="#"
                          :class="{'clicked': izbor === 'Pacijenti po lokaciji', 'lnk': izbor != 'Pacijenti po lokaciji'}"
                        >
                          <div
                            @click="doSomethingOnClick('Pacijenti po lokaciji')"
                          >Pacijenti po lokaciji</div>
                        </a>
                        <span
                          v-if="$store.state.reports.ppolokaciji && !customers.length && customersLoaded"
                          href="#"
                          class="empty"
                        >
                          <div>Pacijenti po lokaciji</div>
                        </span>

                        <span
                          v-if="$store.state.reports.ppolokaciji && !customersLoaded"
                          href="#"
                          class="empty"
                        >
                          <div>Pacijenti po lokaciji</div>
                        </span>
                      </vuestic-tree-node>
                      <!-- Finansijski izvještaj, po danu -->
                      <vuestic-tree-category
                        v-if="$store.state.reports.fpodanu"
                        isOpen
                        label="Finansijski izvještaji"
                      >
                        <vuestic-tree-node>
                          <a
                            href="#"
                            :class="{'clicked': izbor === 'Po danu', 'lnk': izbor != 'Po danu'}"
                          >
                            <div @click="doSomethingOnClick('Po danu')">Po danu</div>
                          </a>
                        </vuestic-tree-node>
                      </vuestic-tree-category>
                    </vuestic-tree-category>
                  </vuestic-tree-root>
                  <div>
                    <br />
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="col-md-4" v-if="izbor != 'Pacijenti po lokaciji'">
              <fieldset v-if="sites.length < 3 && sitesLoaded">
                <vuestic-radio-button
                  :label="site.naziv + ' | ' + site.adresa"
                  :id="site.naziv"
                  :value="site.naziv + ' | ' + site.adresa"
                  :name="site.naziv"
                  v-model="radioModel"
                  disabled
                />
              </fieldset>

              <fieldset v-if="sites.length > 2 && sitesLoaded">
                <div v-for="(element, index) in sites" :key="index">
                  <vuestic-radio-button
                    :label="element.naziv + ' | ' + element.adresa"
                    :id="element.naziv"
                    :value="element.naziv + ' | ' + element.adresa"
                    :name="element.naziv"
                    v-model="radioModel"
                  />
                </div>
              </fieldset>
            </div>

            <div class="col-md-4" v-if="izbor === 'Pacijenti po lokaciji'">
              <fieldset v-if="customers.length < 2 && customersLoaded">
                <vuestic-radio-button
                  :label="customers[0].opis"
                  :id="customers[0].opis"
                  :value="customers[0].opis"
                  :name="customers[0].opis"
                  v-model="customerModel"
                  disabled
                />
              </fieldset>

              <fieldset v-if="customers.length > 1 && customersLoaded">
                <div v-for="(element, index) in customers" :key="index">
                  <vuestic-radio-button
                    :label="element.opis"
                    :id="element.opis"
                    :value="element.opis"
                    :name="element.opis"
                    v-model="customerModel"
                  />
                </div>
              </fieldset>
            </div>

            <div class="col-md-5">
              <div
                class="d-flex flex-column align-items-center justify-content-between down-container"
              >
                <fieldset>
                  <div class="form-group">
                    <div class="input-group" v-show="report_selected">
                      <vuestic-date-picker
                        id="date-picker-range"
                        :config="config"
                        v-model="datepicker.range"
                        @on-change="doSomethingOnChangeDateRange"
                      />
                      <label
                        class="control-label"
                        for="date-picker-range"
                      >{{ 'Unesite opseg datuma' }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
                <br />
                <button
                  style="text-transform: none; border: 0px; border-radius: 0px;"
                  :disabled="!date_picked"
                  class="btn btn-secondary btn-sm"
                  @click.prevent="Akcija()"
                >
                  <span class="fa fa-file-pdf-o"></span>
                  {{ ' PDF Izvještaj'}}&nbsp;&nbsp;
                </button>

                <button
                  v-show="po_danu"
                  style="text-transform: none;  border: 0px; border-radius: 0px;"
                  :disabled="!date_picked"
                  class="btn btn-secondary btn-sm"
                  @click.prevent="LineChart()"
                >
                  <span class="vuestic-icon vuestic-icon-graph"></span>
                  {{ ' Grafički prikaz'}}
                </button>
              </div>
            </div>
          </div>
        </vuestic-widget>

        <vuestic-modal-reports
          :show.sync="show"
          v-bind:large="true"
          ref="largeModalGraph"
          :cancelText="'ZATVORI'"
          :range="headerChart"
        >
          <div slot="title">
            {{"Grafički prikaz "}}
            <span
              style="color: #e34a4a;"
            >({{site.naziv + ' | ' + site.adresa}})</span>
          </div>
          <div>
            <div class="row" style="min-height: 420px;">
              <div class="col-md-6" v-if="showLineChart">
                <line-chart :options="optionsLineChart" :data="dataLineChart" type="line"></line-chart>
              </div>

              <div class="col-md-6" v-if="showHorizontalBarChart">
                <horizontal-bar-chart
                  :options="optionsHorizontalBarChart"
                  :data="dataHorizontalBarChart"
                  type="horizontal-bar"
                ></horizontal-bar-chart>
              </div>

              <div class="col-md-12" v-if="!showLineChart && !showHorizontalBarChart">
                <div
                  style="display:flex; flex-direction: row; justify-content: center; align-items: center"
                >
                  <div style="float:left;"></div>
                  <span style="vertical-align:middle; ">
                    <atom-spinner
                      style="opacity: 0.25;"
                      :animation-duration="1000"
                      :size="300"
                      :color="'#4ae387'"
                    />
                  </span>
                  <div style="float:right;"></div>
                </div>
              </div>
            </div>
          </div>
        </vuestic-modal-reports>
      </div>
    </div>

    <div v-show="report_pdf" class="row">
      <div class="col-md-12">
        <div class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="Nazad">
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <span class="blockquote">{{ izborText }}</span>
        </div>
        <hr />

        <div id="pdf-container"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="col-md-6">
          <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :on-cancel="onCancel"
            color="#4ae387"
            :is-full-page="fullPage"
          ></loading>
        </div>
        <div class="col-md-6">
          <button v-if="false" @click.prevent="Test">{{'Loading...'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { AtomSpinner } from "epic-spinners";
import LineChart from "../vuestic-components/vuestic-chart/chart-types/LineChart";
import HorizontalBarChart from "../vuestic-components/vuestic-chart/chart-types/HorizontalBarChart";
import router from "../../router";
import store from "vuex-store";
import utils from "services/utils";
import PDFObject from "pdfobject";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { server } from "../../../config/config.js";

export default {
  name: "reports",

  data() {
    return {
      show: false,
      site: {},
      customers: [],
      customer: {},
      sites: [
        {
          adresa: "Sve lokacije",
          created_at: "...",
          created_by: "...",
          email: "...",
          lokal: "...",
          mjesta: "...",
          naziv: "Kompletan izvještaj",
          odgovornoLice: "...",
          opis: "...",
          postavke: "...",
          sifra: "...",
          telefon: "...",
          updated_at: "...",
          updated_by: "...",
          web: "...",
          __v: "...",
          _id: "..."
        }
      ],
      sitesLoaded: false,
      customersLoaded: false,

      radioModel: "",
      customerModel: "",
      izbor: "Knjiga protokola",
      izborText: "Knjiga protokola",
      datepicker: {
        range: null
      },
      config: {
        mode: "range",
        minDate: new Date("2020.08.09"),
        maxDate: new Date(),
        altFormat: "F j, Y",
        dateFormat: "d.m.Y",
        locale: {
          firstDayOfWeek: 1,
          rangeSeparator: " do ",
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      },
      date_picked: false,
      report_selected: true,
      report_pdf: false,
      show_chart: false,
      po_danu: false,
      timestamp: "",
      showLineChart: false,
      optionsLineChart: {},
      dataLineChart: {},
      showHorizontalBarChart: false,
      optionsHorizontalBarChart: {},
      dataHorizontalBarChart: {},
      headerChart: "",

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  components: {
    AtomSpinner,
    LineChart,
    Loading,
    HorizontalBarChart
  },

  watch: {
    radioModel: function() {
      this.sites.forEach(site => {
        if (site.naziv + " | " + site.adresa == this.radioModel) {
          this.site = site;
        }
      });
    },

    customerModel: function() {
      this.customers.forEach(loc => {
        if (loc.opis == this.customerModel) {
          this.customer = loc;
        }
      });
    }
  },

  created() {
    http
      .get(
        "postavke/list/sites?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.$store.state.sites.forEach(site => {
          res.data.sites.forEach(element => {
            if (this.$store.state.site == element._id) {
              this.site = element;
              this.radioModel = element.naziv + " | " + element.adresa;
            }
            if (site == element._id) {
              this.sites.push(element);
            }
          });

          this.sitesLoaded = true;
        });
      });

    http
      .get(
        "postavke/list/customers?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(response => {
        if (response.data.success) {
          response.data.customers.forEach(loc => {
            this.customers.push(loc);
          });

          if (this.customers.length) {
            this.customerModel = this.customers[0].opis;
          }
          this.customersLoaded = true;
        }
      });
  },

  mounted() {
    this.$refs.treeView.expand();
    this.timestamp = new Date().getTime().toString();
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Akcija() {
      var daterange = this.datepicker.range;

      var range = daterange.split("do");

      if (range.length === 2) {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[1].trim();
        to = to.slice(6, 10) + "-" + to.slice(3, 5) + "-" + to.slice(0, 2);
        daterange = from + " do " + to;
      } else {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[0].trim();
        to =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        daterange = from;
      }

      switch (this.izbor) {
        case "Knjiga protokola":
          this.isLoading = true;

          http
            .post("/reports/kprotokola", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url =
                  server + "reports/protokol/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });

                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;

        case "Po danu":
          this.isLoading = true;

          http
            .post("/reports/fpodanu", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/fpodanu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;

        case "Potrošnja":
          this.isLoading = true;

          http
            .post("/reports/ppodanu", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url = server + "reports/ppodanu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;

        case "Pacijenti po mjestu":
          this.isLoading = true;

          http
            .post("/reports/ppomjestu", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url =
                  server + "reports/ppomjestu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;

        case "Pacijenti po lokaciji":
          this.isLoading = true;
          this.izborText = "Pošiljatelj | " + this.customer.opis;

          http
            .post("/reports/ppolokaciji", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site,

              customer: this.customer
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url =
                  server + "reports/ppolokaciji/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;
        case "TAT po pacijentu":
          this.isLoading = true;

          http
            .post("/reports/tatpopacijentu", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (
                res.data.success &&
                res.data.message != "Nema dostupnih podataka."
              ) {
                this.report_pdf = true;

                var options = {
                  width: "100%",
                  height: "800px"
                };

                var url =
                  server + "reports/ppomjestu/" + this.timestamp + ".pdf";

                PDFObject.embed(url, "#pdf-container", options);

                this.isLoading = false;
              } else {
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;
        default:
          break;
      }
    },

    doSomethingOnClick(input) {
      // this.customerModel = this.customers[0].opis;

      this.datepicker.range = null;
      this.date_picked = false;
      this.report_selected = true;
      this.report_pdf = false;
      this.show_chart = false;

      if (input === "Po danu") {
        this.po_danu = true;
        this.izbor = input;
        this.izborText = "Finansijski izvještaj | " + input;
      } else if (input === "Potrošnja") {
        this.po_danu = false;
        this.izbor = input;
        this.izborText = "Broj urađenih analiza";
      } else if (input === "Pacijenti po mjestu") {
        this.po_danu = false;
        this.izbor = input;
        this.izborText = "Pacijenti po mjestu";
      } else if (input === "Pacijenti po lokaciji") {
        this.po_danu = false;
        this.izbor = input;
        // console.log(this.customer.opis)
        this.izborText = "Pošiljatelj | " + this.customer.opis;
      } else {
        this.po_danu = false;
        this.izbor = input;
        this.izborText = input;
      }
    },

    doSomethingOnChangeDateRange(input) {
      if (input[1] != undefined) {
        this.date_picked = true;
      }
    },

    Nazad: function() {
      this.$refs.treeView.expand();
      this.report_pdf = false;
      this.datepicker.range = null;
      this.date_picked = false;
      this.show_chart = false;
    },

    LineChart() {
      var daterange = this.datepicker.range;

      var range = daterange.split("do");
      let palette = store.getters.palette;

      this.headerChart = daterange;

      if (range.length === 2) {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[1].trim();
        to = to.slice(6, 10) + "-" + to.slice(3, 5) + "-" + to.slice(0, 2);
        daterange = from + " do " + to;
      } else {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[0].trim();
        to =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        daterange = from;
      }

      switch (this.izbor) {
        case "Knjiga protokola":
          break;

        case "Po danu":
          this.showLineChart = false;
          this.isLoading = true;
          this.showHorizontalBarChart = false;

          http
            .post("/reports/fpodanu/graph", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sites: this.sites,
              izbor: this.site
            })
            .then(res => {
              if (res.data.success) {
                var labels = [];
                var kontrola = [];
                var data = [];
                var temp = "";

                var pacijenata = [];
                var uzoraka = [];
                var testova = [];

                res.data.rows.forEach(element => {
                  if (element[0] != "UKUPNO") {
                    kontrola.push(palette.info);
                    labels.push(element[0]);
                    data.push(element[4]);

                    pacijenata.push(element[1]);
                    uzoraka.push(element[2]);
                    testova.push(element[3]);
                  } else {
                    temp = element[4];
                  }
                });

                this.dataLineChart = {
                  labels: labels,
                  datasets: [
                    {
                      label: "Promet",
                      backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
                      pointBorderColor: kontrola,
                      pointBackgroundColor: kontrola,
                      borderColor: palette.transparent,
                      data: data
                    }
                  ]
                };

                this.dataHorizontalBarChart = {
                  labels: labels,
                  datasets: [
                    {
                      label: "Pacijenata",
                      backgroundColor: palette.info,
                      borderColor: palette.transparent,
                      data: pacijenata
                    },
                    {
                      label: "Uzoraka",
                      backgroundColor: palette.primary,
                      borderColor: palette.transparent,
                      data: uzoraka
                    },
                    {
                      label: "Analiza",
                      backgroundColor: palette.danger,
                      borderColor: palette.transparent,
                      data: testova
                    },
                    {
                      label: "Promet",
                      backgroundColor: palette.warning,
                      borderColor: palette.transparent,
                      data: data
                    }
                  ]
                };

                this.optionsLineChart = {
                  responsive: true,
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: temp + " BAM"
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee"
                        }
                      }
                    ],
                    yAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee"
                        }
                      }
                    ]
                  }
                };

                this.optionsHorizontalBarChart = {
                  responsive: true,
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: ""
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee"
                        }
                      }
                    ],
                    yAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee"
                        }
                      }
                    ]
                  }
                };

                this.isLoading = false;
                this.showLineChart = true;
                this.showHorizontalBarChart = true;
                this.show_chart = true;
                this.po_danu = true;
                this.$refs.largeModalGraph.open();

                setTimeout(() => {
                  this.datepicker.range = null;
                }, 500);

                this.date_picked = false;
              } else {
                this.show_chart = false;
                this.isLoading = false;

                this.toastText = "Nema dostupnih podataka!";
                this.toastIcon = "fa-warning";
                this.toastPosition = "top-right";
                this.className = "vuestic-toast-warning";

                this.showToast(this.toastText, {
                  icon: this.toastIcon,
                  position: this.toastPosition,
                  duration: this.toastDuration,
                  fullWidth: this.isToastFullWidth,
                  className: this.className
                });
                this.$refs.treeView.expand();
                this.report_pdf = false;
                this.datepicker.range = null;
                this.date_picked = false;
              }
            });

          break;

        case "Potrošnja":
          break;

        case "Pacijenti po mjestu":
          break;

        case "Pacijenti po lokaciji":
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/toasts";

.abc-checkbox,
.abc-radio {
  display: flex !important;
  justify-content: flex-start;
}

input[type="checkbox"]:disabled + label,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled,
input[type="radio"]:disabled {
  cursor: not-allowed;
}

.lnk {
  color: $dark-gray;
  text-decoration: none;
}

a:hover {
  color: $vue-green;
}

.clicked {
  color: $vue-green;
  text-transform: uppercase;
}

.empty {
  color: #acb5be;
}
</style>
