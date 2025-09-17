<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs
        :names="['Pretraga pacijenata']"
        :tab="selected_tab"
        ref="tabs"
      >
        <div :slot="'Pretraga pacijenata'">
          <!--Container-->

          <div class="modal-body">
            <slot></slot>
            <form>
              <div class="row">
                <div class="col-md-2"></div>

                <div class="col-md-6">
                  <fieldset>
                    <!-- Izbor: Matični broj -->

                    <!-- 
                        -->

                    <div class="form-group with-icon-left">
                      <div class="input-group">
                        <input
                        onpaste="return false;"
              autocomplete="off"
                          id="input-icon-left"
                          title=" "
                          v-model="ime"
                          name="input-icon-left"
                          required
                        />
                        <i
                          class="glyphicon glyphicon-pencil icon-left input-icon"
                        ></i>
                        <label class="control-label" for="input-icon-left">{{
                          "Unesite ime pacijenta"
                        }}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                    <div class="form-group with-icon-left">
                      <div class="input-group">
                        <input
                        onpaste="return false;"
              autocomplete="off"
                          id="input-icon-left"
                          title=" "
                          v-model="prezime"
                          name="input-icon-left"
                          required
                        />
                        <i
                          class="glyphicon glyphicon-pencil icon-left input-icon"
                        ></i>
                        <label class="control-label" for="input-icon-left">{{
                          "Unesite prezime pacijenta"
                        }}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>

          <!--Footer-->
          <div class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                :disabled="ime.trim() == '' || prezime.trim() == ''"
                class="btn btn-primary btn-sm"
                @click="Search()"
              >
                <span class="fa fa-search"></span>
                {{ "Pretraga" }}
              </button>
            </slot>
          </div>

          <div class="col-md-12">
            <div class="table-responsive" v-if="pacijenti.length">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td width="10%">{{ "IZBOR" }}</td>

                    <td width="30%">{{ "IME" }}</td>
                    <td width="40%">{{ "PREZIME" }}</td>
                    <td width="20%">{{ "GODIŠTE" }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in pacijenti" :key="element._id">
                    <td>
                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          v-if="!element.active"
                          @click="Activate($event, element)"
                          class="form-check-input"
                          :id="element._id"
                          type="checkbox"
                          v-model="element.active"
                        />
                        <input
                          :disabled="element.active"
                          v-if="element.active"
                          @click="Deactivate($event, element)"
                          class="form-check-input"
                          :id="element._id"
                          type="checkbox"
                          v-model="element.active"
                        />

                        <label class="form-check-label" for="checkbox1"></label>
                      </div>
                    </td>

                    <td>{{ element.ime }}</td>
                    <td>{{ element.prezime }}</td>
                    <td>{{ element.godiste }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-12">
            <div class="table-responsive" v-if="rezultati.length">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td width="30%">{{ "NALAZ" }}</td>
                    <td width="40%">{{ "DATUM I VRIJEME IZDAVANJA NALAZA" }}</td>
                    <td width="30%">{{ "Obrada" }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in rezultati" :key="element._id">

                    <td>
                

                      <i  @click.prevent="Nalaz($event, element.timestamp)" 
                      v-bind:id="element.timestamp" style="font-size: 16px; 
                      color:#f7cc36;" class="vuestic-icon vuestic-icon-files">
                      </i>
                     
                 
                  </td>

                    <td>
                      {{
                        JSON.stringify(element.created_at).slice(9, 11) +
                        "." +
                        JSON.stringify(element.created_at).slice(6, 8) +
                        "." +
                        JSON.stringify(element.created_at).slice(1, 5) +
                        " " +
                        JSON.stringify(
                          new Date(
                          new Date(element.updated_at).getTime() -
                          new Date(element.updated_at).getTimezoneOffset()
                        ).toISOString()
                        ).substring(12, 17)
                      }}
                    </td>

                    <td>
                      <i @click.prevent="Obrada('/obrada/rezultati/' + element.patient._id + '/' + element.pid + '?date=' + element.uzorkovano)" 
                      style="color: #f7cc36">
                            
                         <strong>{{ "/obrada/rezultati/" + element.pid }}</strong> 
                    </i>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

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
          <button v-if="false" @click.prevent="Test">{{ "Loading..." }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { bus } from "../../main";
import router from "../../router";

import { http } from "../../../config/config.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "pretraga",
  components: {
    Loading,
  },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      pacijenti: [],
      rezultati: [],
      search: "",

      selected_tab: "Pretraga pacijenata",
      ime: "",
      prezime: "",
    };
  },

  created() {},

  mounted() {},
  methods: {

    Obrada(ruta) {
      router.push(ruta);
    },

    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Search() {
      this.pacijenti = [];
      this.rezultati = [];
      this.isLoading = true;
      http
        .post("pacijenti/pretraga", {
          ime: this.ime,
          prezime: this.prezime,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          console.log(res.data);
          this.pacijenti = res.data.pacijenti;
          this.isLoading = false;
        });

      // http
      //   .post("pacijenti/analize/update", {
      //     token: this.$store.state.token,
      //     site: this.$store.state.site,
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     this.isLoading = false;
      //   });
    },

    Activate(event, element) {
      this.search = element._id;

      this.pacijenti.forEach((pacijent) => {
        if (pacijent._id === this.search) {
          console.log(this.search);
        }
      });

      this.rezultati = [];
      this.isLoading = true;
      http
        .post("pacijenti/pretraga/nalazi", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          _id: element._id,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.rezultati.length > 0) {
            this.rezultati = res.data.rezultati;

            this.pacijenti.forEach((pacijent) => {
              if (pacijent._id != this.search) {
                pacijent.active = false;
              }
            });

            this.isLoading = false;
          } else {
            console.warn("Nema podataka.");

            this.pacijenti.forEach((pacijent) => {
              if (pacijent._id != this.search) {
                pacijent.active = false;
              }
            });
            this.isLoading = false;
          }
        });
    },

    Deactivate(event, element) {
      this.rezultati = [];
    },
    Nalaz(event, element) {
      console.log(element)
      this.isLoading = true;

      http
              .get(
                "pacijenti/nalaz/download?token=" +
                  this.$store.state.token +
                  "&timestamp=" +
                  element,
                { responseType: "blob" }
              )
              .then((res) => {
                if (res.status == 200) {

                  // const url = window.URL.createObjectURL(new Blob([res.data]));
                  // const link = document.createElement("a");
                  // link.href = url;
                  // link.setAttribute("download", this.timestamp + ".pdf");
                  // document.body.appendChild(link);
                  // link.click();
                  
                  var blob = new Blob([res.data], {type: 'application/pdf'});
                  var url = URL.createObjectURL(blob);
                  var printWindow = window.open(url, '', 'width: 100%; height: 800px; visibility: hidden');
                  // printWindow.print()

                  setTimeout(() => {
                    this.timestamp = (
                      new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000
                    ).toString();

                    this.isLoading = false;
                  }, 0);
                } else {
                  this.isLoading = false;
                }
              });
    },
  },
};
</script>

<style lang="scss" scoped>
.minHeight {
  min-height: 650px;
}

i:hover {
  color: #e34a4a !important;
}

</style>
