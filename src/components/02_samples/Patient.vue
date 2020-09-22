<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>
                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>

              <!--Container-->

              <div class="modal-body">
                <slot></slot>
                <form>
                  <div class="row">
                    <div class="col-md-2"></div>

                    <div class="col-md-6">
                      <fieldset>
                        <!-- Izbor: Matični broj -->
                        <div v-if="izbor === 'jmbg'">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="jmbp-input-icon-left"
                                title=" "
                                v-model="jmbg"
                                name="jmbp-input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="jmbp-input-icon-left"
                              >{{'DD MM GGG RR BBB K'}}</label>
                              <!-- Unesite Matični broj pacijenta -->
                              <i class="bar"></i>
                            </div>
                          </div>

                          <div v-if="postoji && !invalid">
                            <h5>{{'Uneseni Matični broj je već registriran!'}}</h5>

                            <h5>
                              {{'Pacijent:'}}
                              <span style="color: #e34a4a;">{{patient_data}}</span>
                            </h5>

                            <br>
                          </div>

                          <div v-if="invalid">
                            <h5>
                              <span style="color: #e34a4a;">{{error_msg}}</span>
                            </h5>
                            <br>
                          </div>
                        </div>

                        <!-- Izbor: Datum rođenja -->
                        <div v-if="izbor === 'datr'">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="drp-input-icon-left"
                                title=" "
                                v-model="dateofb"
                                name="drp-input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label class="control-label" for="drp-input-icon-left">{{'DD MM GGGG'}}</label>
                              <!-- Unesite Datum rođenja pacijenta -->
                              <i class="bar"></i>
                            </div>
                          </div>
                          <div v-if="invalid">
                            <h5>
                              <span style="color: #e34a4a;">{{error_msg}}</span>
                            </h5>
                            <br>
                          </div>
                        </div>

                        <!-- Izbor: Godište -->
                        <div v-if="izbor === 'god'">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="godp-input-icon-left"
                                title=" "
                                v-model="godiste"
                                name="godp-input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label class="control-label" for="godp-input-icon-left">{{'GGGG'}}</label>
                              <!-- Unesite Godište pacijenta -->
                              <i class="bar"></i>
                            </div>
                          </div>
                          <div v-if="invalid">
                            <h5>
                              <span style="color: #e34a4a;">{{error_msg}}</span>
                            </h5>
                            <br>
                          </div>
                        </div>

                        <!-- Izbor: Nema podataka -->
                        <div v-if="izbor === 'nodata'">
                          <div class="form-group">
                            <div class="input-group">
                              <input id="np-input-icon-left" title=" " name="np-input-icon-left" disabled>
                              <label class="control-label" for="np-input-icon-left">{{'Nema podataka'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                          <div v-if="invalid">
                            <h5>
                              <span style="color: #e34a4a;">{{error_msg}}</span>
                            </h5>
                            <br>
                          </div>
                        </div>

                        <!-- 
                        -->

                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="imep-input-icon-left"
                              title=" "
                              v-model="ime"
                              name="imep-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="imep-input-icon-left"
                            >{{'Unesite ime pacijenta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="prezp-input-icon-left"
                              title=" "
                              v-model="prezime"
                              name="prezp-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="prezp-input-icon-left"
                            >{{'Unesite prezime pacijenta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          :label="'Izaberite spol pacijenta'"
                          v-model="spol"
                          name="spol"
                          :required="true"
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Mjesto stanovanja"
                          v-model="chosenAdress"
                          name="adresa"
                          :required="true"
                          title=" "
                          ref="adresaSelect"
                          v-bind:options="cities"
                        ></vuestic-simple-select>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="telep-input-icon-left"
                              title=" "
                              v-model="telefon"
                              name="telep-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="telep-input-icon-left"
                            >{{'Unesite kontakt telefon'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="emep-input-icon-left"
                              title=" "
                              v-model="email"
                              name="emep-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="emep-input-icon-left"
                            >{{'Unesite Email adresu'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    <div class="col-md-1"></div>

                    <div class="col-md-3">
                      <div style="min-height: 20px;"></div>

                      <!-- Izbor: Matični broj -->
                      <vuestic-radio-button
                        :label="'Matični broj'"
                        :id="'jmgb'"
                        :value="'jmbg'"
                        :name="'disabled-radio'"
                        :disabled="false"
                        v-model="izbor"
                      />

                      <!-- Izbor: Datum rođenja -->
                      <vuestic-radio-button
                        :label="'Datum rođenja'"
                        :id="'datr'"
                        :value="'datr'"
                        :name="'disabled-radio'"
                        :disabled="false"
                        v-model="izbor"
                      />

                      <!-- Izbor: Godište -->
                      <vuestic-radio-button
                        :label="'Godište'"
                        :id="'god'"
                        :value="'god'"
                        :name="'disabled-radio'"
                        :disabled="false"
                        v-model="izbor"
                      />

                      <!-- Izbor: Nema podataka -->
                      <vuestic-radio-button
                        :label="'Nema podataka'"
                        :id="'nodata'"
                        :value="'nodata'"
                        :name="'disabled-radio'"
                        :disabled="false"
                        v-model="izbor"
                      />
                    </div>
                  </div>
                </form>

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

              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="isLoading"
                  >{{ cancelText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons && !postoji && !invalid"
                    :class="okClass"
                    @click="ok"
                    :disabled="isLoading || (izbor === 'jmbg' && jmbg.length < 13) || (izbor === 'datr' && dateofb.length < 8) || (izbor === 'god' && godiste.length < 4) || (izbor === 'nodata' && jmbg.length < 13)"
                  >{{ okText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons && postoji"
                    class="btn btn-secondary-info btn-sm"
                    @click="Prijem()"
                  >
                    <span class="fa fa-flask"></span>
                    {{'Prijem'}}
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { bus } from "../../main";
import router from "../../router";
import { http } from "../../../config/config.js";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "vuestic-modal-patient",
  props: {
    transition: {
      type: String,
      default: "modal"
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    },
    force: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: "CONFIRM"
    },
    cancelText: {
      type: String,
      default: "CANCEL"
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm"
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm"
    },
    closeIconShown: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    noButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      duration: 500,

      izbor: "datr",
      jmbg: "",
      dateofb: "",
      godiste: "",

      ime: "",
      prezime: "",
      spol: "",
      spolovi: ["MUŠKI", "ŽENSKI"],
      chosenAdress: "",
      cities: [],
      telefon: "",
      email: "",

      postoji: false,
      invalid: false,
      patient_id: "",
      patient_data: "",
      error_msg: "",

      isLoading: false,
      fullPage: true,

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  components: {
    Loading
  },

  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },
  created() {
    if (this.show) {
      document.body.className += " modal-open";
    }
  },
  mounted() {
    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token
      })
      .then(res => {
        if (res.data.sajt.mjesta != undefined) {
          res.data.sajt.mjesta.forEach(element => {
            if (element != "NEPOZNATO") {
              this.cities.push(element);
            }
          });
        }
      })
      .then(res => {
        this.cities.sort(function(a, b) {
          return a.toLowerCase() == b.toLowerCase()
            ? 0
            : +(a.toLowerCase() > b.toLowerCase()) || -1;
        });
      });
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  watch: {
    show: function(value) {
      if (value) {
        document.body.className += " modal-open";
      } else {
        window.setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\s?modal-open/,
            ""
          );
        }, this.duration);
      }
    },
    izbor: function() {
      switch (this.izbor) {
        case "jmbg":
          this.jmbg = "";
          this.dateofb = "";
          this.godiste = "";
          this.ime = "";
          this.prezime = "";
          this.spol = "";
          this.chosenAdress = "";
          this.telefon = "";
          this.email = "";
          this.postoji = false;
          this.invalid = false;
          this.patient_id = "";
          this.patient_data = "";
          this.error_msg = "";
          break;
        case "datr":
          this.jmbg = "";
          this.dateofb = "";
          this.godiste = "";
          this.ime = "";
          this.prezime = "";
          this.spol = "";
          this.chosenAdress = "";
          this.telefon = "";
          this.email = "";
          this.postoji = false;
          this.invalid = false;
          this.patient_id = "";
          this.patient_data = "";
          this.error_msg = "";
          break;
        case "god":
          this.jmbg = "";
          this.dateofb = "";
          this.godiste = "";
          this.ime = "";
          this.prezime = "";
          this.spol = "";
          this.chosenAdress = "";
          this.telefon = "";
          this.email = "";
          this.postoji = false;
          this.invalid = false;
          this.patient_id = "";
          this.patient_data = "";
          this.error_msg = "";
          break;
        case "nodata":
          this.jmbg = "0101920" + this.getRandomInt(10000, 99999) + "P";
          this.dateofb = "";
          this.godiste = "";
          this.ime = "";
          this.prezime = "";
          this.spol = "";
          this.chosenAdress = "";
          this.telefon = "";
          this.email = "";
          this.postoji = false;
          this.invalid = false;
          this.patient_id = "";
          this.patient_data = "";
          this.error_msg = "";
          break;
      }
    },
    jmbg: function() {
      if (this.jmbg.length < 13) {
        this.postoji = false;
        this.invalid = false;
        this.error_msg = "";
        this.patient_id = "";
        this.patient_data = "";
      } else if (this.jmbg.length === 13) {
        if (this.izbor === "jmbg" && !this.validateDate(this.jmbg)) {
          this.invalid = true;
          this.error_msg = "Matični broj nije validan.";
        } else if (this.izbor === "datr" && !this.validateDate(this.jmbg)) {
          this.invalid = true;
          this.error_msg = "Datum rođenja nije validan.";
        } else if (this.izbor === "god" && !this.validateYear(this.godiste)) {
          this.invalid = true;
          this.error_msg = "Godište nije validno.";
        } else if (this.izbor === "nodata" && !this.validateJMBG(this.jmbg)) {
          this.invalid = true;
          this.error_msg = "Godište nije validno.";
        } else {
          if (true) {
            http
              .post("/uzorci/patient", {
                jmbg: this.jmbg,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                if (res.data.success) {
                  this.postoji = true;
                  this.patient_id = res.data.pacijent._id;
                  this.patient_data =
                    res.data.pacijent.ime + " " + res.data.pacijent.prezime;
                } else {
                  this.postoji = false;
                  this.patient_id = "";
                  this.patient_data = "";
                }
              });
          } else {
            this.invalid = true;
            this.error_msg = "Matični broj nije validan.";
            // this.error_msg = "Datum rođenja nije validan.";
          }
        }
      } else if (this.jmbg.length > 13) {
        this.jmbg = this.jmbg.slice(0, 13);
      }
    },
    dateofb: function() {
      if (this.dateofb.length < 8) {
        this.postoji = false;
        this.invalid = false;
        this.error_msg = "";
        this.patient_id = "";
        this.patient_data = "";
      } else if (this.dateofb.length == 8) {
        if (!this.validateDateOfBirth(this.dateofb)) {
          this.invalid = true;
          this.error_msg = "Datum rođenja nije validan.";
        } else {
          this.jmbg =
            this.dateofb.slice(0, 4) +
            this.dateofb.slice(5, 8) +
            this.getRandomInt(10000, 99999) +
            "P";
        }
      } else if (this.dateofb.length > 8) {
        this.dateofb = this.dateofb.slice(0, 8);
      }
    },
    godiste: function() {
      if (this.godiste.length < 4) {
        this.postoji = false;
        this.invalid = false;
        this.error_msg = "";
        this.patient_id = "";
        this.patient_data = "";
      } else if (this.godiste.length == 4) {
        if (this.validateYear(this.godiste)) {
          this.jmbg =
            "0000" +
            this.godiste.slice(1, 4) +
            this.getRandomInt(10000, 99999) +
            "P";
        } else {
          this.invalid = true;
          this.error_msg = "Godište nije validno.";
        }
      } else if (this.godiste.length > 4) {
        this.godiste = this.godiste.slice(0, 4);
      }
    }
  },
  methods: {

    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {
      // console.log("User cancelled the loader.");
    },

    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.Save();
    },
    Prijem() {
      router.push("/samples/" + this.patient_id);
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.show = true;
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min;
    },
    validateEmail: function(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
    validateJMBG(jmbg) {
      return (
        /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) ||
        /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg))
      );
    },
    validateYear(year) {
      var text = /^[0-9]+$/;
      if (year != 0) {
        if (year != "" && !text.test(year)) {
          return false;
        }

        if (year.length != 4) {
          return false;
        }
        var current_year = new Date().getFullYear();
        if (year < 1921 || year > current_year) {
          return false;
        }
        return true;
      }
    },
    validateDate(inputText) {
      if (inputText[4] === "9") {
        var control = "1";
      } else if (inputText[4] === "0") {
        var control = "2";
      } else {
        return false;
      }

      if (
        !this.validateYear(control + inputText[4] + inputText[5] + inputText[6])
      ) {
        return false;
      }

      inputText =
        inputText[0] +
        inputText[1] +
        "-" +
        inputText[2] +
        inputText[3] +
        "-" +
        control +
        inputText[4] +
        inputText[5] +
        inputText[6];

      var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      // Match the date format through regular expression
      if (inputText.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        var opera1 = inputText.split("/");
        var opera2 = inputText.split("-");
        var lopera1 = opera1.length;
        var lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
          var pdate = inputText.split("/");
        } else if (lopera2 > 1) {
          var pdate = inputText.split("-");
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
          if (dd > ListofDays[mm - 1]) {
            return false;
          }
        }
        if (mm == 2) {
          var lyear = false;
          if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
          }
          if (lyear == false && dd >= 29) {
            return false;
          }
          if (lyear == true && dd > 29) {
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    },

    validateDateOfBirth(inputText) {
      var godiste = inputText[4] + inputText[5] + inputText[6] + inputText[7];
      inputText =
        inputText[0] +
        inputText[1] +
        "-" +
        inputText[2] +
        inputText[3] +
        "-" +
        godiste;

      if (!this.validateYear(godiste)) {
        return false;
      }

      var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      // Match the date format through regular expression
      if (inputText.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        var opera1 = inputText.split("/");
        var opera2 = inputText.split("-");
        var lopera1 = opera1.length;
        var lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
          var pdate = inputText.split("/");
        } else if (lopera2 > 1) {
          var pdate = inputText.split("-");
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
          if (dd > ListofDays[mm - 1]) {
            return false;
          }
        }
        if (mm == 2) {
          var lyear = false;
          if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
          }
          if (lyear == false && dd >= 29) {
            return false;
          }
          if (lyear == true && dd > 29) {
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    },

    Save() {

      // console.log("Saving...")

      /* this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000); */

      if (
        this.ime.trim() === "" ||
        this.prezime.trim() === "" ||
        this.spol.trim() === ""
      ) {
        this.toastText = "Unesite obavezna polja.";
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
      } else {
        if (this.chosenAdress.trim() === "") {
          this.chosenAdress = "NEPOZNATO";
        }
        if (this.telefon.trim() === "") {
          this.telefon = "NEPOZNATO";
        }
        if (this.email.trim() === "") {
          this.email = "NEPOZNATO";
        }

        if (this.validateJMBG(this.jmbg)) {
          var jmbgPost = this.jmbg;
          var item = true;

          http
            .post("pacijenti/unos/find", {
              jmbg: this.jmbg,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.message === "Pacijent postoji") {
                item = false;
                this.toastText = "Pacijent postoji.";
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
            })
            .then(res => {
              if (item) {

                this.isLoading = true;

                http
                  .post("pacijenti/unos/save", {
                    jmbg: jmbgPost,
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    spol: this.spol,
                    duhan: "NEPOZNATO",
                    dijabetes: "NEPOZNATO",
                    adresa: this.chosenAdress,
                    telefon: this.telefon,
                    email: this.email,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    if (res.data.success === false) {

                      this.isLoading = false;

                      this.toastText = "Greška prilikom upisa!";
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
                    } else {

                      this.isLoading = false;

                      this.jmbg = "";
                      this.dateofb = "";
                      this.godiste = "";
                      this.ime = "";
                      this.prezime = "";
                      this.spol = "";
                      this.chosenAdress = "";
                      this.telefon = "";
                      this.email = "";
                      this.postoji = false;
                      this.invalid = false;
                      this.patient_id = "";
                      this.patient_data = "";
                      this.error_msg = "";

                      this.show = false;
                      window.removeEventListener("keyup", this.listenKeyUp);

                      router.push("/samples/" + res.data.pacijent._id);
                    }
                  });
              }
            });
        } else {
          var item = false;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

.vuestic-modal {
  height: 0;
  width: 0;

  .modal {
    display: block;
  }

  .modal-dialog,
  .modal-backdrop {
    transition: all 0.5s ease;
  }

  .modal-enter .modal-dialog,
  .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop,
  .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .close-modal {
    margin-left: 1rem;
    font-size: $font-size-large;
    line-height: $font-size-large;
    cursor: pointer;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(
      #{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom}
    );
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom
        $modal-footer-btns-margin-x;
    }
  }
}
</style>
