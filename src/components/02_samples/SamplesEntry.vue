<template>
  <div>
    <div class="col-md-12">
      <vuestic-widget class="widget-height" headerText="Prijem">
        <div class="row">
          <div class="col-md-4">
            <vuestic-accordion-patient-info>
              <vuestic-collapse-patient-info :godiste="starost" :cijena="ukupnaCijena">
                <span slot="header">{{ patient.ime + ' ' + patient.prezime }}</span>
                <div slot="body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="collapse-page__content" style="padding: 10px;">
                        <div v-show="true">
                          <a
                            style="color: #e34a4a; font-weight: bold;"
                            @click.prevent="PIDDetails()"
                            href="#"
                          >{{'Patient ID | '}}</a>
                          <span style="font-size: 20px;" v-show="pid != ''">
                            <strong>{{ pid }}</strong>
                          </span>
                          <span style="font-size: 20px;" v-show="pid === ''">
                            <strong>{{ Number(all_pids[all_pids.length - 1]) + 1 }}</strong>
                          </span>
                        </div>
                        <div style="min-height: 8px;"></div>
                        <div>
                          {{"Ime: "}}
                          <strong>{{ patient.ime }}</strong>
                        </div>
                        <div>
                          {{"Prezime: "}}
                          <strong>{{ patient.prezime }}</strong>
                        </div>
                        <div>
                          {{"Spol: "}}
                          <strong>{{ patient.spol }}</strong>
                        </div>
                        <div>
                          {{"JMBG: "}}
                          <strong>{{ patient.jmbg }}</strong>
                        </div>
                        <div>
                          {{"Adresa: "}}
                          <strong>{{ patient.adresa }}</strong>
                        </div>
                        <div>
                          {{"Telefon: "}}
                          <strong>{{ patient.telefon }}</strong>
                        </div>
                        <div>
                          {{"Email: "}}
                          <strong>{{ patient.email }}</strong>
                        </div>
                        <div v-show="false">
                          {{"Duhan: "}}
                          <strong>{{ patient.duhan }}</strong>
                        </div>
                        <div v-show="false">
                          {{"Dijabetes: "}}
                          <strong>{{ patient.dijabetes }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-collapse-patient-info>
              <div style="min-height: 8px;"></div>
            </vuestic-accordion-patient-info>&nbsp;
            <a
              style="color: #f7cc36;"
              @click.prevent="Details()"
              href="#"
            >{{'Unesite više detalja'}}</a>
            <div style="min-height: 8px;"></div>

            <drugo-stanje
              :show.sync="show"
              ref="largeModal"
              :okText="potvrdi"
              :cancelText="odustani"
            >
              <div slot="title">{{"VIŠE DETALJA"}}</div>
              <div>
                <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <vuestic-simple-select
                          v-if="this.spol === 'ŽENSKI'"
                          class="form-group with-icon-right"
                          label="Drugo Stanje"
                          v-model="drstanje"
                          v-validate="'required'"
                          name="drstanje"
                          required
                          title=" "
                          ref="drstanjeSelect"
                          v-bind:options="drstanja"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          class="form-group with-icon-right"
                          label="Antikoagulantna terapija"
                          v-model="anticoag"
                          v-validate="'required'"
                          name="anticoag"
                          required
                          title=" "
                          ref="anticoagSelect"
                          v-bind:options="anticoagi"
                        ></vuestic-simple-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </drugo-stanje>

            <drugo-stanje
              :show.sync="show"
              ref="largeModalPID"
              :okText="potvrdi"
              :cancelText="odustani"
            >
              <div slot="title">{{"Patient ID"}}</div>
              <div>
                <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <vuestic-simple-select
                          style="color: #e34a4a;"
                          v-if="pids.length > 1"
                          class="form-group with-icon-right"
                          label="Redni broj pacijenta"
                          v-model="pid"
                          v-validate="'required'"
                          name="pid"
                          required
                          title=" "
                          ref="pidSelect"
                          v-bind:options="pids"
                        ></vuestic-simple-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </drugo-stanje>

            <div class="col-md-12">
              <vuestic-simple-select
                v-show="lokacije.length > 1"
                v-model="lokacija"
                name="lokacija"
                required
                title=" "
                ref="lokacijaSelect"
                v-bind:options="lokacije"
                label="Izaberite lokaciju"
              ></vuestic-simple-select>
            </div>

            <div class="col-md-12">
              <vuestic-simple-select
                v-show="customers.length > 0 && $store.state.customer"
                v-model="customer"
                name="customer"
                required
                title=" "
                ref="customerSelect"
                v-bind:options="customers"
                label="Izaberite klijenta"
              ></vuestic-simple-select>
            </div>

            <vuestic-accordion-samples-entry v-for="uzorak in uzorciItems" :key="uzorak.tip">
              <vuestic-collapse-samples-entry
                :uzorak="uzorak.tip"
                :komentar="uzorak.komentar"
                :vrijeme="uzorak.time"
                :tags="uzorak.testoviTag"
              >
                <span :id="uzorak.tip" slot="header">{{ uzorak.ime }}</span>
                <div slot="body">
                  <div class="vrow">
                    <div class="col-md-12" style="padding-top: 0px;">
                      <div class="collapse-page__content" style="padding: 5px;">
                        <div>
                          <vuestic-tag-group
                            :uzorak="uzorak.tip"
                            v-model="uzorak.testoviTag"
                            removable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-collapse-samples-entry>
              <div style="min-height: 8px;"></div>
            </vuestic-accordion-samples-entry>
          </div>

          <!--  -->
          <div class="col-md-8">
            <div class="vuestic-page-not-found-search">
              <div class="vuestic-page-not-found-search__content">
                <div class="vuestic-page-not-found-search__wallpaper col-md-12">
                  <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
                </div>

                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <div class="vuestic-page-not-found-search__wallpaper">
                      <div class="form-group">
                        <div class="input-group vuestic-page-not-found-search__input">
                          <input placeholder="Pretraga" style="color: white" v-model="inputValue" />
                          <i class="bar" :style="'width: ' + 310 + 'px'" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="kategorijeL.length > ($store.state.display.rows * $store.state.display.columns) && inputValue.length < 1"
                    class="col-md-3"
                  >
                    <br />
                    <i
                      v-if="page === 1"
                      title="Naprijed"
                      @click.prevent="addPage"
                      style="color: white"
                      class="fa fa-forward fa-lg icon-left wizard-back pull-left"
                      id="forward"
                    ></i>
                    <i
                      v-if="page === 2"
                      title="Nazad"
                      @click.prevent="subPage"
                      style="color: white"
                      class="fa fa-backward fa-lg icon-left wizard-back pull-left"
                      id="forward"
                    ></i>
                  </div>
                </div>

                <div
                  class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
                >
                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': colrows}"
                    v-if="page === 1 && inputValue.length < 1"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(category, index) in filterItems"
                      v-show="index < ($store.state.display.rows * $store.state.display.columns) && category.categoryName != 'Ostalo'"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ category.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in category.items"
                        v-show="index < $store.state.display.show"
                        :key="index"
                      >
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, category, item, item.cijena)"
                            :id="item.itemName"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>

                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': colrows}"
                    v-if="page === 2 && inputValue.length < 1"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(category, index) in filterItems"
                      v-show="index > (($store.state.display.rows * $store.state.display.columns) - 1) && category.categoryName != 'Ostalo'"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ category.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in category.items"
                        v-show="index < $store.state.display.show"
                        :key="index"
                      >
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, category, item, item.cijena)"
                            :id="item.itemName"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>

                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{'grid-template-columns': colrows}"
                    v-if="inputValue.length > 0"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(categoryTmp, index) in filterItemsTmp"
                      v-show="index < ($store.state.display.rows * $store.state.display.columns) && categoryTmp.categoryName != 'Ostalo'"
                      :key="index"
                      style="color: #f7cc36;"
                    >
                      {{ categoryTmp.categoryName }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in categoryTmp.items"
                        :key="index"
                        v-show="index < $store.state.display.show"
                      >
                        <vuestic-tooltip :options="{content: item.opis, placement: 'right'}">
                          <a
                            @click.prevent="testEvent($event, categoryTmp, item, item.cijena)"
                            :id="item.itemName"
                            :class="{'unchosen-link': !item.izabran, 'plain-link': item.izabran}"
                            href="#"
                          >{{item.itemName}}</a>
                        </vuestic-tooltip>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div style="position: sticky; margin-bottom: 10px;" class="row" v-if="loaded">
              <div class="col-md-5"></div>
              <div class="col-md-3 pull-left" style="margin-top:25px;">
                <button
                  @click.prevent="Discard()"
                  class="btn btn-warning btn-micro"
                >{{ 'ODUSTANI' }}</button>
              </div>
              <div class="col-md-4 pull-right" style="margin-top:25px;">
                <button
                  v-if="lokacija != ''"
                  @click.once="Save()"
                  class="btn btn-secondary btn-micro"
                  :disabled="save"
                >{{ 'SAČUVAJ' }}</button>
              </div>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <modal-calendar
        :show.sync="showCalendar"
        :sample="sample"
        :vrijeme="vrijeme"
        ref="staticModalSamplesEntryCalendar"
      >
        <div slot="title">{{'Vrijeme uzorkovanja'}}</div>
      </modal-calendar>

      <modal-commenting
        :show.sync="showCommenting"
        :uzorci="uzorciList"
        :sample="sample"
        :komentar="komentar"
        ref="staticModalSamplesEntryCommenting"
      >
        <div slot="title">{{'Unos komentara'}}</div>
      </modal-commenting>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../config/config.js";
import router from "../../router";
import { bus } from "../../main";
import template from "./Uzorci.js";

export default {
  name: "samples-entry",

  data() {
    return {
      colrows: "repeat(7, 1fr)",
      ukupnaCijena: 0,
      page: 1,
      kategorijeL: [],
      uniqueArray: [],
      timestamp: "",

      pid: "",
      pids: [],
      all_pids: [],
      complete: [],

      patient: {},
      prikazivise: true,
      spol: "ŽENSKI",
      drstanje: "",
      drstanjeTmp: "",
      drstanja: [
        "",
        "Prvo tromjesečje",
        "Drugo tromjesečje",
        "Treće tromjesečje"
      ],
      anticoag: "",
      anticoagTmp: "",
      pidTmp: "",
      anticoagi: ["", "Standardna terapija", "Intenzivna terapija"],
      potvrdi: "SAČUVAJ",
      odustani: "ODUSTANI",
      show: true,
      starost: "30",
      lokacije: [],
      lokacijeInit: [],
      lokacija: "",
      customers: [],
      klijenti: [],
      customer: "",
      klijent: null,
      categories: [],
      categoriesTmp: [],
      inputValue: "",
      showCommenting: true,
      showCalendar: true,
      sample: "",
      komentar: "",
      vrijeme: "",
      siteCode: "",
      uzorciList: JSON.parse(JSON.stringify(template.Uzorci)),
      uzorciListLoaded: false,
      initiatedEntry: false,
      oldUzorciList: [],
      save: true,
      loaded: false
    };
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
    filterItems() {
      if (this.inputValue.length >= 1) {
        return this.categories
          .map(category => {
            return {
              categoryName: category.categoryName,
              bundle: category.bundle,
              items: category.items.filter(
                item =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1 ||
                  item.opis
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1
              )
            };
          })
          .filter(category => category.items.length >= 1);
      } else {
        return this.categories;
      }
    },
    filterItemsTmp() {
      if (this.inputValue.length >= 1) {
        return this.categoriesTmp
          .map(category => {
            return {
              categoryName: category.categoryName,
              bundle: category.bundle,
              items: category.items.filter(
                item =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1 ||
                  item.opis
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1
              )
            };
          })
          .filter(category => category.items.length >= 1);
      } else {
        return this.categoriesTmp;
      }
    },
    uzorciItems: function() {
      return this.uzorciList.filter(
        i => i.testoviTag.length && this.uzorciListLoaded && this.initiatedEntry
      );
    }
  },

  watch: {
    ukupnaCijena: function() {
      // console.warn("Price: " + this.ukupnaCijena);
    },
    uzorciList: {
      handler: function(after, before) {
        if (this.uzorciListLoaded && this.initiatedEntry) {
          // console.log("Watching: uzorciList");
          var vm = this;

          let changed = after.filter(function(p, idx) {
            return Object.keys(p).some(function(prop) {
              return p[prop] !== vm.$data.oldUzorciList[idx][prop];
            });
          });

          vm.setValue();

          var condition = false;
          this.uzorciList.forEach(element => {
            if (element.testovi.length) {
              condition = true;
            }
          });

          if (condition) {
            this.save = false;
            // console.log("Save enabled.");
          } else {
            this.save = true;
            // console.log("Save disabled.");
          }
        }
      },
      deep: true
    }
  },

  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },

  beforeCreate() {
    http
      .get(
        "postavke/list/def/uzorak?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success) {
          if (res.data.uzorci.length) {
            this.uzorciListLoaded = true;
            // JSON.parse(JSON.stringify(res.data.uzorci))

            var sample = {};
            var uzorci = [];
            this.uzorciList = [];

            res.data.uzorci.forEach(element => {
              (sample.ime = element.ime),
                (sample.code = element.code),
                (sample.tip = element.tip),
                (sample.patient = {}),
                (sample.testovi = []),
                (sample.testoviTag = []),
                (sample.hitno = false),
                (sample.time = new Date(
                  new Date().getTime() - new Date().getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .slice(0, -8)
                  .replace("T", " ")),
                (sample.komentar = "");

              uzorci.push(sample);
              sample = {};
            });

            this.uzorciList = JSON.parse(JSON.stringify(uzorci));
            this.setValue();
            // console.log(this.uzorciList);

            http
              .get(
                "pacijenti/detalji/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                var str = "";
                var tmp = "";

                this.uzorciList.forEach(element => {
                  element.patient = res.data.pacijent;
                  this.patient = res.data.pacijent;

                  var jmbgGodina = res.data.pacijent.jmbg.slice(4, 7);
                  if (jmbgGodina[0] === "9") {
                    str = "1";
                    tmp = jmbgGodina;
                    jmbgGodina = str.concat(tmp);
                  } else if (jmbgGodina[0] === "0") {
                    str = "2";
                    tmp = jmbgGodina;
                    jmbgGodina = str.concat(tmp);
                  }

                  if (res.data.pacijent.jmbg.slice(0, 7) === "0101920") {
                    this.starost = "";
                  } else {
                    this.starost = jmbgGodina;
                  }
                });
              })
              .then(res => {
                this.spol = this.patient.spol;
                http
                  .get(
                    "get/pid/today/?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&patient=" +
                      this.patient._id,
                    {}
                  )
                  .then(res => {
                    this.pids = res.data.pids;
                    this.all_pids = res.data.all_pids;
                    this.complete = res.data.complete;
                    // console.log(this.complete);
                    this.pid = this.pids[0];
                  });
              });
          } else {
            console.warn("Lista uzoraka je prazna.");

            this.uzorciListLoaded = true;
            this.setValue();

            http
              .get(
                "pacijenti/detalji/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                var str = "";
                var tmp = "";

                this.uzorciList.forEach(element => {
                  element.patient = res.data.pacijent;
                  this.patient = res.data.pacijent;

                  var jmbgGodina = res.data.pacijent.jmbg.slice(4, 7);
                  if (jmbgGodina[0] === "9") {
                    str = "1";
                    tmp = jmbgGodina;
                    jmbgGodina = str.concat(tmp);
                  } else if (jmbgGodina[0] === "0") {
                    str = "2";
                    tmp = jmbgGodina;
                    jmbgGodina = str.concat(tmp);
                  }

                  if (res.data.pacijent.jmbg.slice(0, 7) === "0101920") {
                    this.starost = "";
                  } else {
                    this.starost = jmbgGodina;
                  }
                });
              })
              .then(res => {
                this.spol = this.patient.spol;
                http
                  .get(
                    "get/pid/today/?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&patient=" +
                      this.patient._id,
                    {}
                  )
                  .then(res => {
                    this.pids = res.data.pids;
                    this.all_pids = res.data.all_pids;
                    this.complete = res.data.complete;
                    // console.log(this.complete);
                    this.pid = this.pids[0];
                  });
              });
          }
        } else {
          console.warn("Greška prilikom dohvaćanja liste uzoraka.");
        }
      });
  },

  created() {
    this.colrows =
      "repeat(" +
      this.$store.state.display.columns +
      "," +
      this.$store.state.display.rows +
      "fr)";

    this.toggleSidebar(false);

    bus.$on("DrugoStanjeOn", () => {});

    bus.$on("DrugoStanjeOff", () => {
      setTimeout(() => {
        this.drstanje = this.drstanjeTmp;
        this.anticoag = this.anticoagTmp;
        this.pid = this.pidTmp;
      }, 300);
    });

    bus.$on("removeTest", (data, uzorak) => {
      // console.log(data)
      if (!data.bundle) {
        this.uzorciList.forEach(element => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                if (data.id === "5c71174f85358b613184f143") {
                  // Kompletna krvna slika
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Krvna slika") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.id === "5bf3d79e6a1e5e00de84a571") {
                  // Sedimentacija eritrocita
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Sedimentacija") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (
                  data.id === "5c797c71dcdb5d12f8c737a7" ||
                  data.id === "5c797c79dcdb5d12f8c737a8"
                ) {
                  // Hemoglobin A1c
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "%HbA1c") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-0")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - natašte") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-60")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 60 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-120")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 120 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                }

                break;
              }
            }
          }
        });

        this.categories.forEach(element => {
          element.items.forEach(item => {
            if (item.itemName === data.name) {
              this.ukupnaCijena = this.ukupnaCijena - Number(item.cijena);
              item.izabran = false;
            }
          });
        });

        this.categoriesTmp.forEach(element => {
          element.items.forEach(item => {
            if (item.itemName === data.name) {
              item.izabran = false;
            }
          });
        });
      } else {
        this.uzorciList.forEach(element => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                if (data.id === "5c71174f85358b613184f143") {
                  // Kompletna krvna slika
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Krvna slika") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.id === "5bf3d79e6a1e5e00de84a571") {
                  // Sedimentacija eritrocita
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "Sedimentacija") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (
                  data.id === "5c797c71dcdb5d12f8c737a7" ||
                  data.id === "5c797c79dcdb5d12f8c737a8"
                ) {
                  // Hemoglobin A1c
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "%HbA1c") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-0")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - natašte") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-60")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 60 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                } else if (data.name.includes("OGTT-120")) {
                  for (var i = element.code.length - 1; i >= 0; i--) {
                    if (element.code[i] == "OGTT - 120 min") {
                      element.code.splice(i, 1);
                      break;
                    }
                  }
                }

                break;
              }
            }
          }
        });

        var uslov = true;

        this.categories.forEach(element => {
          element.items.forEach(item => {
            if (element.bundle) {
              item.testovi.forEach(test => {
                if (test.itemName === data.name) {
                  if (uslov) {
                    this.ukupnaCijena = this.ukupnaCijena - Number(test.cijena);
                    uslov = false;
                  }

                  item.izabran = false;
                  test.izabran = false;
                }
              });
            }
          });
        });

        this.categoriesTmp.forEach(element => {
          element.items.forEach(item => {
            if (element.bundle) {
              item.testovi.forEach(test => {
                if (test.itemName === data.name) {
                  if (uslov) {
                    uslov = false;
                  }

                  item.izabran = false;
                  test.izabran = false;
                }
              });
            }
          });
        });

        this.categories.forEach(cat => {
          cat.items.forEach(it => {
            if (it.itemName === data.name) {
              it.izabran = false;
            }
          });
        });

        this.categoriesTmp.forEach(cat => {
          cat.items.forEach(it => {
            if (it.itemName === data.name) {
              it.izabran = false;
            }
          });
        });
      }
    });

    bus.$on("SamplesEntryRemove", data => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.testovi.forEach(tst => {
            this.categories.forEach(ctgelement => {
              ctgelement.items.forEach(item => {
                if (item.itemName === tst.itemName) {
                  this.ukupnaCijena = this.ukupnaCijena - Number(tst.cijena);
                }
              });
            });

            this.categoriesTmp.forEach(ctgelement => {
              ctgelement.items.forEach(item => {
                if (item.itemName === tst.itemName) {
                }
              });
            });
          });

          element.testovi = [];
          element.code = [];
          element.testoviTag = [];
          element.hitno = false;
        }
      });

      this.categories.forEach(element => {
        element.items.forEach(item => {
          if (item.uzorak === data) {
            item.izabran = false;
          }

          if (item.testovi != undefined) {
            item.testovi.forEach(test => {
              if (test.uzorak === data) {
                item.izabran = false;
                test.izabran = false;
              }
            });
          }
        });
      });

      this.categoriesTmp.forEach(element => {
        element.items.forEach(item => {
          if (item.uzorak === data) {
            item.izabran = false;
          }

          if (item.testovi != undefined) {
            item.testovi.forEach(test => {
              if (test.uzorak === data) {
                item.izabran = false;
                test.izabran = false;
              }
            });
          }
        });
      });
    });

    bus.$on("SamplesEntryCommenting", (data, komentar) => {
      this.sample = data;
      this.komentar = komentar;
      this.$refs.staticModalSamplesEntryCommenting.open();
    });

    bus.$on("setComment", (data, comment) => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.komentar = comment;
        }
      });
    });

    bus.$on("SamplesEntryCalendar", (data, vrijeme) => {
      this.sample = data;
      this.vrijeme = vrijeme;

      this.$refs.staticModalSamplesEntryCalendar.open();
    });

    bus.$on("setCalendar", (data, time) => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.time = time;
        }
      });
    });

    bus.$on("SamplesEntryUrgent", data => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.hitno = true;
        }
      });
    });

    bus.$on("SamplesEntryRemoveUrgent", data => {
      this.uzorciList.forEach(element => {
        if (element.tip === data) {
          element.hitno = false;
        }
      });
    });

    bus.$on("headerKlik", data => {
      document.getElementById(data).click();
      setTimeout(() => {
        document.getElementById(data).click();
      }, 10);
    });

    // this.setValue();

    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token
      })
      .then(res => {
        this.siteCode = res.data.sajt.sifra;
        // console.log("Site: " + this.siteCode);
      });
  },

  mounted() {
    http
      .get(
        "/uzorci/customers/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.customers.length) {
          this.klijenti = res.data.customers;
          this.klijent = null;

          this.customers = [];
          this.customer = "";

          res.data.customers.forEach(element => {
            this.customers.push(element.opis);
          });
        } else {
          this.customers = [];
          this.customer = "";
          this.klijenti = [];
          this.klijent = null;
        }

        // console.log(res.data.customers);
      });

    http
      .get(
        "/uzorci/lokacije/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.lokacije.length != 0) {
          this.locations = res.data.lokacije;
          this.lokacije = [];
          res.data.lokacije.forEach(element => {
            this.lokacije.push(element.lokacija);
            this.lokacijeInit.push(element);
          });
        }

        if (this.lokacije.length < 2) {
          this.lokacija = this.lokacije[0];
        }
      });

    http
      .post("/labassays", {
        site: this.$store.state.site,
        token: this.$store.state.token
      })
      .then(res => {
        var i = 0;
        var kategorije = [];

        var kategorijeTmp = [];

        var LabAssays = [];

        res.data.testovi.forEach(element => {
          /* switch (element.sites.length) {
            case 1:
              console.log(element.naziv);
              break;
            case 2:
              break;
            case 3:
              break;
            case 4:
              break;

            default:
              break;
          } */

          if (!element.sites.includes(this.siteCode)) {
            // console.log(element.naziv);
          } else {
            LabAssays.push(element);
          }
        });

        LabAssays = LabAssays.sort(function(a, b) {
          return (
            a.entryorder.localeCompare(b.entryorder, undefined, {
              numeric: true,
              sensitivity: "base"
            }) ||
            a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base"
            })
          );
        });

        LabAssays.forEach(element => {
          if (
            !kategorije.filter(
              kategorija =>
                kategorija === element.kategorija.split("|")[0].trim()
            ).length > 0
          ) {
            kategorije.push(element.kategorija.split("|")[0].trim());
          }
        });

        LabAssays.forEach(element => {
          if (
            !kategorijeTmp.filter(
              kategorija =>
                kategorija === element.kategorija.split("|")[0].trim()
            ).length > 0
          ) {
            kategorijeTmp.push(element.kategorija.split("|")[0].trim());
          }
        });

        var temporaryCategory = {};
        var temporaryCategoryTmp = {};

        kategorije.forEach(kategorija => {
          temporaryCategory = {};
          temporaryCategory.categoryName = kategorija;
          temporaryCategory.bundle = false;
          temporaryCategory.items = [];

          LabAssays.forEach(element => {
            if (element.kategorija.split("|")[0].trim() === kategorija) {
              if (kategorija === "Specifične") {
                temporaryCategory.bundle = true;

                if (element.calculated && element.specific) {
                  /*  
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.kategorija.split("|")[2].trim(),
                    cijena: element.price,
                    code: element.code,
                    izabran: false,
                    testovi: element.bundledTests
                  });
                  */
                } else {
                  if (!element.specific) {
                    temporaryCategory.items.push({
                      _idlabassay: element._id,
                      itemName: element.kategorija.split("|")[1].trim(),
                      entryorder: element.entryorder,
                      opis: element.kategorija.split("|")[2].trim(),
                      cijena: element.price,
                      code: element.code,
                      izabran: false,
                      testovi: element.bundledTests
                    });
                  }
                }
              } else if (kategorija === "Paneli") {
                temporaryCategory.bundle = true;

                temporaryCategory.items.push({
                  _idlabassay: element._id,
                  itemName: element.kategorija.split("|")[1].trim(),
                  entryorder: element.entryorder,
                  opis: element.analit,
                  cijena: element.price,
                  code: element.code,
                  izabran: false,
                  testovi: element.bundledTests
                });
              } else {
                if (
                  temporaryCategory.items.length ==
                  this.$store.state.display.list
                ) {
                  this.categories.push(temporaryCategory);
                  temporaryCategory = {};
                  temporaryCategory.categoryName = kategorija;
                  temporaryCategory.bundle = false;
                  temporaryCategory.items = [];
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                } else {
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                }
              }
            }
          });
          this.categories.push(temporaryCategory);
        });

        kategorijeTmp.forEach(kategorija => {
          temporaryCategoryTmp = {};
          temporaryCategoryTmp.categoryName = kategorija;
          temporaryCategoryTmp.bundle = false;
          temporaryCategoryTmp.items = [];

          LabAssays.forEach(element => {
            if (element.kategorija.split("|")[0].trim() === kategorija) {
              if (kategorija === "Specifične") {
                temporaryCategoryTmp.bundle = true;

                if (element.calculated && element.specific) {
                  /*
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.kategorija.split("|")[2].trim(),
                    cijena: element.price,
                    code: element.code,
                    izabran: false,
                    testovi: element.bundledTests
                  });
                  */
                } else {
                  if (!element.specific) {
                    temporaryCategoryTmp.items.push({
                      _idlabassay: element._id,
                      itemName: element.kategorija.split("|")[1].trim(),
                      entryorder: element.entryorder,
                      opis: element.kategorija.split("|")[2].trim(),
                      cijena: element.price,
                      code: element.code,
                      izabran: false,
                      testovi: element.bundledTests
                    });
                  }
                }
              } else if (kategorija === "Paneli") {
                temporaryCategoryTmp.bundle = true;

                temporaryCategoryTmp.items.push({
                  _idlabassay: element._id,
                  itemName: element.kategorija.split("|")[1].trim(),
                  entryorder: element.entryorder,
                  opis: element.analit,
                  cijena: element.price,
                  code: element.code,
                  izabran: false,
                  testovi: element.bundledTests
                });
              } else {
                if (temporaryCategoryTmp.items.length === 100) {
                  this.categoriesTmp.push(temporaryCategoryTmp);
                  temporaryCategoryTmp = {};
                  temporaryCategoryTmp.categoryName = kategorija;
                  temporaryCategoryTmp.bundle = false;
                  temporaryCategoryTmp.items = [];
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                } else {
                  temporaryCategoryTmp.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: "primary"
                  });
                }
              }
            }
          });
          this.categoriesTmp.push(temporaryCategoryTmp);
        });
      })
      .then(res => {
        this.loaded = true;

        this.categories.forEach(element => {
          this.kategorijeL.push(element.categoryName);
        });

        this.uniqueArray = [...new Set(this.kategorijeL)];

        this.categories = this.categories.sort(function(a, b) {
          return a.categoryName.localeCompare(b.categoryName, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        this.categoriesTmp = this.categoriesTmp.sort(function(a, b) {
          return a.categoryName.localeCompare(b.categoryName, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        this.categories.forEach(element => {
          element.items = element.items.sort(function(a, b) {
            return (
              a.entryorder.localeCompare(b.entryorder, undefined, {
                numeric: true,
                sensitivity: "base"
              }) ||
              a.itemName.localeCompare(b.itemName, undefined, {
                numeric: true,
                sensitivity: "base"
              })
            );
          });
        });

        this.categoriesTmp.forEach(element => {
          element.items = element.items.sort(function(a, b) {
            return (
              a.entryorder.localeCompare(b.entryorder, undefined, {
                numeric: true,
                sensitivity: "base"
              }) ||
              a.itemName.localeCompare(b.itemName, undefined, {
                numeric: true,
                sensitivity: "base"
              })
            );
          });
        });
      });
  },

  beforeDestroy() {
    bus.$off("removeTest");
    bus.$off("SamplesEntryRemove");
    bus.$off("SamplesEntryCommenting");
    bus.$off("setComment");
    bus.$off("SamplesEntryCalendar");
    bus.$off("setCalendar");
    bus.$off("SamplesEntryUrgent");
    bus.$off("SamplesEntryRemoveUrgent");
    bus.$off("headerKlik");
    bus.$off("DrugoStanjeOn");
    bus.$off("DrugoStanjeOff");
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    testEvent(event, category, item, cijena) {
      // Test
      // console.log(item);
      this.initiatedEntry = true;

      switch (item.itemName) {
        case "TIBC":
          setTimeout(() => {
            document.getElementById("FE").click();
          }, 300);
          setTimeout(() => {
            document.getElementById("UIBC").click();
          }, 600);
          break;

        case "OP-Urin":
          setTimeout(() => {
            document.getElementById("Sediment").click();
          }, 300);
          break;

        default:
          break;
      }

      switch (category.bundle) {
        case true:
          var test = {};
          var tag = {};

          this.uzorciList.forEach(element => {
            item.testovi.forEach(analiza => {
              test = {};
              tag = {};
              if (element.tip === analiza.uzorak) {
                test.itemName = analiza.itemName;
                test.opis = analiza.opis;
                test.cijena = analiza.cijena;
                test.uzorak = analiza.uzorak;
                item.izabran = true;

                analiza.izabran = true;
                test.klasa = analiza.klasa;
                test._id = analiza.labassay;

                tag.name = analiza.itemName;
                tag.id = analiza.labassay;
                tag.code = analiza.code;
                tag.type = analiza.klasa;
                tag.bundle = category.bundle;

                // Code 128
                // console.log(analiza.code);

                if (
                  !element.testovi.filter(el => el.itemName === test.itemName)
                    .length > 0
                ) {
                  element.testovi.push(test);

                  if (test._id === "5c71174f85358b613184f143") {
                    // test.itemName.includes("KKS")) {
                    // Kompletna krvna slika
                    element.code.push("Krvna slika");
                  } else if (test._id === "5bf3d79e6a1e5e00de84a571") {
                    // test.itemName.includes("SE")) {
                    // Sedimentacija eritrocita
                    element.code.push("Sedimentacija");
                  } else if (
                    test._id === "5c797c71dcdb5d12f8c737a7" ||
                    test._id === "5c797c79dcdb5d12f8c737a8"
                  ) {
                    // test.itemName.includes("%HbA1c")) {
                    // Hemoglobin A1c
                    element.code.push("%HbA1c");
                  } else if (test.itemName.includes("OGTT-0")) {
                    element.code.push("OGTT - natašte");
                  } else if (test.itemName.includes("OGTT-60")) {
                    element.code.push("OGTT - 60 min");
                  } else if (test.itemName.includes("OGTT-120")) {
                    element.code.push("OGTT - 120 min");
                  }

                  element.testoviTag.push(tag);

                  this.ukupnaCijena = this.ukupnaCijena + Number(test.cijena);

                  this.categories.forEach(cat => {
                    cat.items.forEach(it => {
                      if (it.itemName === analiza.itemName) {
                        it.izabran = true;
                      }
                    });
                  });

                  this.categoriesTmp.forEach(catTmp => {
                    catTmp.items.forEach(itTmp => {
                      if (itTmp.itemName === analiza.itemName) {
                        itTmp.izabran = true;
                      }
                    });
                  });
                }
              }
            });
          });
          this.inputValue = "";
          break;

        default:
          var test = {};
          var tag = {};
          this.uzorciList.forEach(element => {
            test = {};
            tag = {};
            if (element.tip === item.uzorak) {
              test.itemName = item.itemName;
              test.opis = item.opis;
              test.uzorak = item.uzorak;
              test.cijena = item.cijena;
              item.izabran = true;
              test.klasa = item.klasa;
              test._id = item._idlabassay;
              tag.name = item.itemName;
              tag.id = item._idlabassay;
              tag.code = item.code;
              tag.type = item.klasa;
              tag.bundle = category.bundle;

              // Code 128
              // console.log(item.code);

              if (
                !element.testovi.filter(el => el.itemName === test.itemName)
                  .length > 0
              ) {
                element.testovi.push(test);
                element.testoviTag.push(tag);

                if (test._id === "5c71174f85358b613184f143") {
                  // test.itemName.includes("KKS")) {
                  // Kompletna krvna slika
                  element.code.push("Krvna slika");
                } else if (test._id === "5bf3d79e6a1e5e00de84a571") {
                  // test.itemName.includes("SE")) {
                  // Sedimentacija eritrocita
                  element.code.push("Sedimentacija");
                } else if (
                  test._id === "5c797c71dcdb5d12f8c737a7" ||
                  test._id === "5c797c79dcdb5d12f8c737a8"
                ) {
                  // test.itemName.includes("%HbA1c")) {
                  // Hemoglobin A1c
                  element.code.push("%HbA1c");
                } else if (test.itemName.includes("OGTT-0")) {
                  element.code.push("OGTT - natašte");
                } else if (test.itemName.includes("OGTT-60")) {
                  element.code.push("OGTT - 60 min");
                } else if (test.itemName.includes("OGTT-120")) {
                  element.code.push("OGTT - 120 min");
                }

                this.ukupnaCijena = this.ukupnaCijena + Number(cijena);
              }
            }
          });

          this.categories.forEach(cat => {
            cat.items.forEach(it => {
              if (it.itemName === item.itemName) {
                it.izabran = true;
              }
            });
          });

          this.categoriesTmp.forEach(catTmp => {
            catTmp.items.forEach(itTmp => {
              if (itTmp.itemName === item.itemName) {
                itTmp.izabran = true;
              }
            });
          });

          this.inputValue = "";
          break;
      }
    },

    addPage() {
      this.page = 2;
    },

    subPage() {
      this.page = 1;
    },

    Details() {
      this.drstanjeTmp = this.drstanje;
      this.anticoagTmp = this.anticoag;
      this.pidTmp = this.pid;
      this.$refs.largeModal.open();
    },

    PIDDetails() {
      if (this.pids.length > 1) {
        this.drstanjeTmp = this.drstanje;
        this.anticoagTmp = this.anticoag;
        this.pidTmp = this.pid;
        this.$refs.largeModalPID.open();
      }
    },

    Save() {
      var lokacijaID = "";
      this.timestamp = new Date().getTime().toString();

      this.uzorciList = this.uzorciList.filter(function(uzorak) {
        return uzorak.testovi.length;
      });

      this.lokacijeInit.forEach(element => {
        if (element.lokacija === this.lokacija) {
          lokacijaID = element._id;
        }
      });

      this.klijenti.forEach(element => {
        if (element.opis === this.customer) {
          this.klijent = element;
        }
      });

      if (this.drstanje === "") {
        this.drstanje = "NE";
      }

      if (this.anticoag === "") {
        this.anticoag = "NE";
      }

      console.log("Klijent:");
      console.log(this.klijent);

      http
        .post("/sacuvaj/uzorke", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          timestamp: this.timestamp,
          siteCode: this.siteCode,
          uzorci: this.uzorciList,
          lokacija: lokacijaID,
          klijent: this.klijent,
          drstanje: this.drstanje,
          anticoag: this.anticoag,
          pid: this.pid,
          complete: this.complete
        })
        .then(res => {
          var datum = "";
          var temp = [];
          var response = {};
          var samplesList = [];

          if (this.$store.state.access.level < 1) {
            res.data.data.forEach(element => {
              console.log(element);
            });
          }

          response = res.data.data[0];

          res.data.data.forEach(element => {
            samplesList.push(element.sid);
          });

          res.data.data.forEach(element => {
            temp = element.datum.split("-");
            datum =
              temp[2].substring(0, 2) +
              "." +
              temp[1] +
              "." +
              temp[0].substring(2, 4) +
              " " +
              temp[2].substring(3, 8);

            printEPL(
              element.patient,
              element.sid,
              element.pid,
              element.godiste,
              datum,
              element.link,
              element.code,
              this.$store.state.site,
              undefined,
              undefined
            );
          });
          router.push("/prijem");
        });
    },

    Discard() {
      router.push("/prijem");
    },

    setValue() {
      this.$data.oldUzorciList = _.cloneDeep(this.$data.uzorciList);
      // console.log(this.oldUzorciList);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.widget-height {
  min-height: 830px;
}
.vuestic-page-not-found-search {
  min-height: 655px;
  padding-bottom: 35px;
  background-color: $top-nav-bg;
  &__text {
    padding-top: 50px;
    color: white;
  }
  &__text-small {
    font-size: $font-size-root;
    line-height: 1.5;
    text-align: center;
    color: white;
    font-weight: normal;
  }
  &__i-vuestic {
    margin-top: 100px;
  }
  &__list {
    color: white;
  }
  &__input {
    width: 310px;
  }
  &__wallpaper {
    max-height: 40%;
    display: flex;
    justify-content: center;
    a {
      margin-top: 2rem;
    }
  }
  &__i-vuestic {
    z-index: 2;
    height: $auth-wallpaper-ivuestic-h;
    width: 100%;
  }
  &__message {
    justify-content: center;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
}
.unchosen-link {
  color: $white;
  text-decoration: none;
}
</style>
