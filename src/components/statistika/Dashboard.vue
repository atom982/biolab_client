<template>
  <div @contextmenu="Dashboard($event)" class="dashboard" v-show="$store.state.access != undefined">
    <dashboard-info-widgets></dashboard-info-widgets>

    <div class="statistika" v-show="$store.state.access != undefined">
      <data-visualisation-tab></data-visualisation-tab>
    </div>

    <sites-data-modal :show.sync="show" ref="sitesDataModal" cancelText="ZATVORI" okText="POTVRDI">
      <div slot="title">
        <span>{{'Statistika | Sve lokacije'}}</span>
      </div>

      <div class="row" v-if="loadedData">
        <div class="col-md-6 col-xl-3" v-for="(data,index) in Data" :key="index">
          <vuestic-widget
            :headerText="data.site.sifra + ' | ' + data.site.naziv"
            class="info-widget"
            style="border-top-color: #4ae387;"
          >
            <div class="info-widget-inner">
              Zaprimljeno uzoraka: {{data.ZaprimljenoUzoraka + data.KompletiranoUzoraka}}
              <br />
              Kompletirano uzoraka: {{data.KompletiranoUzoraka}}
              <br />
              Ukupno testova: {{data.UkupnoTestova}}
              <br />
              Kompletirano testova: {{data.KompletiranoTestova}} ({{data.Procenat}}%)
              <br />
              Ukupno pacijenata: {{data.UkupnoPacijenata}}
              <br />
            </div>
          </vuestic-widget>
        </div>
      </div>
    </sites-data-modal>

    <initial-password
      :show.sync="show"
      ref="staticInitialPassword"
      cancelText="ODUSTANI"
      okText="POTVRDI"
      :cancelDisabled="true"
    >
      <div slot="title">
        <span style="color:#4ae387;">
          <i class="fa fa-key" style="transform: rotate(90deg);"></i>
          <span style="color: #e34a4a;">{{' | Vaša šifra je istekla'}}</span>
        </span>
      </div>
      <div>
        <form>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <fieldset>
                <div v-show="false" class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="oldPasswordInit"
                      title=" "
                      type="password"
                      v-model="initialSifra"
                      name="oldPasswordInit"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{'Unesite trenutnu šifru'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="newPasswordInit"
                      title=" "
                      type="password"
                      v-model="novaSifra"
                      name="newPasswordInit"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{'Unesite novu šifru'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="confirmPasswordInit"
                      title=" "
                      type="password"
                      v-model="potvrdaSifra"
                      name="confirmPasswordInit"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{'Potvrdite novu šifru'}}</label>
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-md-3"></div>
          </div>
        </form>
      </div>
    </initial-password>

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
import Vue from "vue";
import DashboardInfoWidgets from "./DashboardInfoWidgets";
import DataVisualisationTab from "./DataVisualisation.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "dashboard",

  data() {
    return {
      show: true,
      loadedData: false,

      site: {},
      sites: [],

      Data: [],

      isLoading: false,
      fullPage: true,

      // Change Password
      initialSifra: "Proba123",
      novaSifra: "",
      potvrdaSifra: "",

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
    Loading,
    DashboardInfoWidgets,
    DataVisualisationTab
  },

  beforeDestroy() {
    bus.$off("ChangePasswordInit");
    bus.$off("_HidePasswordInit");
    bus.$off("_ShowPasswordInit");
  },

  mounted() {
    bus.$on("ChangePasswordInit", () => {
      this.izmjeniSifruInit();
    });

    bus.$on("_HidePasswordInit", () => {
      this.HidePasswordInit();
    });

    bus.$on("_ShowPasswordInit", () => {
      this.ShowPasswordInit();
    });
    if (!this.$store.state.password) {
      if (this.$store.state.access != undefined) {
        this.$refs.staticInitialPassword.open();
      }
    }
  },

  methods: {
    izmjeniSifruInit: function() {
      var item = true;
      if (
        this.novaSifra.trim() === "" ||
        this.potvrdaSifra.trim() === "" ||
        this.initialSifra === ""
      ) {
        item = false;
        this.toastText = "Sva polja su obavezna.";
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
      } else if (this.novaSifra.length < 6 || this.novaSifra === "Proba123") {
        item = false;
        this.toastText = "Šifra nije validna.";
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
        return;
      } else if (this.novaSifra != this.potvrdaSifra) {
        item = false;
        this.toastText = "Nova šifra nije validirana.";
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
        return;
      }

      if (item) {
        http
          .post("users/sifra", {
            email: this.$store.state.userId,
            password: this.initialSifra,
            novaSifra: this.novaSifra,
            potvrdaSifra: this.potvrdaSifra,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.message === "Greška na mongodb.") {
              this.toastText = "Greška prilikom upisa.";
              this.toastIcon = "fa-remove";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-danger";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
            }
            if (res.data.message === "Info") {
              this.toastText = "Trenutna šifra nije ispravna.";
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
            }

            if (res.data.message === "Ok") {
              this.novaSifra = "";
              this.potvrdaSifra = "";
              this.initialSifra = "";
              this.toastText = "Izmjena uspješno obavljena.";
              this.toastIcon = "fa-check";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-primary";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
              /* setTimeout(() => {
                this.$router.push(
                  "/statistika?token=" + this.$store.state.token
                );
              }, 3000); */
              bus.$emit("ChangePasswordModalHide");
              this.HidePasswordInit("oldPasswordInit");
              this.HidePasswordInit("newPasswordInit");
              this.HidePasswordInit("confirmPasswordInit");
            }
          });
      }
    },
    ShowPasswordInit: function() {
      let passwordField_old = null;
      let passwordField_new = null;
      let passwordField_confirm = null;

      passwordField_old = document.querySelector("#oldPasswordInit");
      this.hidden_old = false;
      passwordField_new = document.querySelector("#newPasswordInit");
      this.hidden_new = false;
      passwordField_confirm = document.querySelector("#confirmPasswordInit");
      this.hidden_confirm = false;

      passwordField_old.setAttribute("type", "text");
      passwordField_new.setAttribute("type", "text");
      passwordField_confirm.setAttribute("type", "text");
    },
    HidePasswordInit: function() {
      let passwordField_old = null;
      let passwordField_new = null;
      let passwordField_confirm = null;

      passwordField_old = document.querySelector("#oldPasswordInit");
      this.hidden_old = true;
      passwordField_new = document.querySelector("#newPasswordInit");
      this.hidden_new = true;
      passwordField_confirm = document.querySelector("#confirmPasswordInit");
      this.hidden_confirm = true;

      passwordField_old.setAttribute("type", "password");
      passwordField_new.setAttribute("type", "password");
      passwordField_confirm.setAttribute("type", "password");
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Dashboard(e) {
      if (this.$store.state.sites.length > 1) {
        e.preventDefault();

        this.Data = [];

        this.isLoading = true;
        // console.log(this.$store.state.sites);

        http
          .get(
            "postavke/list/sites?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            {}
          )
          .then(res => {
            var obj = {
              site: null,
              ZaprimljenoUzoraka: 0,
              KompletiranoUzoraka: 0,
              UkupnoTestova: 0,
              KompletiranoTestova: 0,
              Procenat: 0,
              UkupnoPacijenata: 0
            };

            this.$store.state.sites.forEach(site => {
              res.data.sites.forEach(element => {
                if (this.$store.state.site == element._id) {
                  this.site = element;
                }
                if (site == element._id) {
                  this.sites.push(element);

                  obj = {
                    site: element,
                    ZaprimljenoUzoraka: 0,
                    KompletiranoUzoraka: 0,
                    UkupnoTestova: 0,
                    KompletiranoTestova: 0,
                    Procenat: 0,
                    UkupnoPacijenata: 0
                  };

                  this.Data.push(obj);

                  obj = {
                    site: null,
                    ZaprimljenoUzoraka: 0,
                    KompletiranoUzoraka: 0,
                    UkupnoTestova: 0,
                    KompletiranoTestova: 0,
                    Procenat: 0,
                    UkupnoPacijenata: 0
                  };
                }
              });
            });

            http
              .get(
                "/dashboard/data?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                { params: { sites: this.$store.state.sites } }
              )
              .then(res => {
                // console.log(res.data);

                var counter = 0;
                var Zaprimljen = 0;
                var Odobren = 0;
                var perCompleted = 0;

                this.Data.forEach(element => {
                  counter = 0;
                  Zaprimljen = 0;
                  Odobren = 0;
                  res.data.Samples.forEach(sample => {
                    counter++;

                    if (element.site._id == sample.site) {
                      if (sample.status == "Odobren") {
                        Odobren++;
                      } else {
                        Zaprimljen++;
                      }
                      element.UkupnoTestova += sample.tests.Ukupno;
                      element.KompletiranoTestova += sample.tests.Realizovano;
                    }

                    if (counter === res.data.Samples.length) {
                      element.ZaprimljenoUzoraka = Zaprimljen;
                      element.KompletiranoUzoraka = Odobren;

                      perCompleted = 0;
                      if (element.UkupnoTestova > 0) {
                        perCompleted =
                          element.KompletiranoTestova / element.UkupnoTestova;
                      }

                      element.Procenat = (perCompleted * 100).toFixed(2);
                      if (element.Procenat % 1 == 0)
                        element.Procenat = parseInt(element.Procenat, 10);
                    }
                  });

                  res.data.Patients.forEach(patient => {
                    if (element.site._id == patient.site) {
                      element.UkupnoPacijenata++;
                    }
                  });
                });

                // console.log(this.Data);

                this.loadedData = true;
                this.isLoading = false;
                this.$refs.sitesDataModal.open();
              });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
.statistika {
  background-color: $white;
  padding: 10px;
}
</style>
