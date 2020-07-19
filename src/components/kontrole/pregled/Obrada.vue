<template>
  <div class="collapse-page">
    <div class="flex md12">
      <!-- Prikaz nalaza -->

      <div v-show="!main && pdf">
        <div class="btn-container">
          <button
            v-show="true"
            class="btn btn-secondary btn-sm"
            @click.prevent="Nazad()"
          >
            <span class="fa fa-step-backward"></span>
            {{ " NAZAD" }}
          </button>
          <!-- :disabled="!Email(email)" -->
          <button
            v-show="true"
            class="btn btn-secondary btn-sm pull-right"
            :disabled="true"
            @click.prevent="MailDialog()"
          >
            <span class="glyphicon glyphicon-send"></span>
            {{ " Pošalji" }}
          </button>
          <div v-show="true" class="form-group with-icon-left pull-right">
            <div class="input-group">
              <input
                size="40"
                id="input-icon-left"
                name="input-icon-left"
                v-model="email"
                title=" "
                required
              />
              <i class="fa fa-envelope-o icon-left input-icon"></i>
              <label class="control-label" for="input-icon-left">
                {{ "Email adresa" }}
              </label>
              <i class="bar"></i>
            </div>
          </div>
        </div>
        <hr />

        <!-- PDFObject -->

        <div id="pdf-container"></div>
      </div>

      <!-- Prikaz Kontrolnih rezultata (Main screen) -->

      <vuestic-widget-control
        v-show="main"
        :headerText="Kontrola.Header"
        :lotText="Kontrola.LOT"
        :multi="Kontrola.Multi"
        :datum="Kontrola.query_date"
        :today="Kontrola.today_date"
      >
        <vuestic-accordion-obrada-control>
          <vuestic-collapse-obrada-control
            v-for="uzorak in Kontrola.Uzorci"
            v-show="!uzorak.removed"
            :id="uzorak.sid + uzorak.aparat._id"
            :key="uzorak.sid"
            :sample="uzorak"
            :retest="save_retest"
            :aparat="uzorak.aparat"
          >
            <span :id="uzorak.sid" slot="header">{{ uzorak.sid }}</span>
            <div slot="body">
              <div style="line-height: 10px;">&nbsp;</div>

              <!-- Uzorci | Default Table -->

              <div class="va-row">
                <div v-show="show_table" class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr align="middle">
                        <td>{{ "ANALIZA" }}</td>
                        <td>{{ "REZULTAT" }}</td>
                        <td>{{ "JEDINICA" }}</td>
                        <td>{{ "REFERENCE" }}</td>
                        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        >
                          {{ "PONOVI" }}
                        </td>
                        <td></td>
                      </tr>
                    </thead>

                    <!-- Table Body -->

                    <tbody>
                      <tr
                        align="middle"
                        v-for="test in rezultati"
                        :key="test.labassay_id"
                        v-bind:class="{
                          'table-danger': false,
                          'table-success': false,
                          'table-warning': false,
                        }"
                      >
                        <!-- ANALIZA -->
                        <td :title="test.analit">
                          <span>{{ test.ime }}</span>
                        </td>
                        <!-- REZULTAT -->
                        <td>
                          <div
                            v-show="test.edit == false"
                            style="
                              display: inline;
                              font-size: 14px;
                              line-height: 4.5px;
                            "
                          >
                            <label>
                              <strong>{{ test.rezultat }}</strong>
                            </label>
                          </div>
                          <div
                            v-show="test.edit == true"
                            style="display: inline;"
                          >
                            <input
                              v-model="test.rezultat"
                              style="
                                width: 110px;
                                font-size: 12px;
                                line-height: 7px;
                              "
                            />
                          </div>
                        </td>
                        <!-- JEDINICA -->
                        <td>{{ test.unit }}</td>
                        <!-- REFERENCE -->
                        <td>{{ test.reference }}</td>
                        <!-- PONOVI -->
                        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            test.rezultat === ''
                          "
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td>
                        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            test.rezultat != ''
                          "
                        >
                          <button
                            v-if="!test.retest"
                            :id="test.labassay_id"
                            class="btn btn-primary btn-micro"
                            @click.prevent="RetestEnable($event)"
                          >
                            <span
                              :id="test.labassay_id"
                              class="fa fa-refresh"
                            ></span>
                          </button>
                          <button
                            v-if="test.retest"
                            :id="test.labassay_id"
                            class="btn btn-info btn-micro"
                            @click.prevent="RetestDisable($event)"
                          >
                            <span
                              :id="test.labassay_id"
                              class="glyphicon glyphicon-duplicate"
                            ></span>
                          </button>
                        </td>
                        <!--  -->
                        <td>
                          <i
                            v-bind:class="{
                              'fa fa-exclamation-triangle icon-right input-icon error-icon': false,
                            }"
                          ></i>
                          <i
                            v-bind:class="{
                              'fa fa-check success-icon icon-right input-icon': false,
                            }"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- END of Uzorci | Default Table -->
            </div>
          </vuestic-collapse-obrada-control>
        </vuestic-accordion-obrada-control>

        <div style="min-height: 10px;"></div>

        <div>
          <hr />
        </div>

        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="btn-container">
              <button
                class="btn btn-secondary btn-sm wizard-back pull-left"
                @click.prevent="Povratak()"
              >
                <span class="fa fa-backward"></span>
                {{ " POVRATAK" }}
              </button>
            </div>
          </div>
        </div>
      </vuestic-widget-control>

      <!-- Modals -->

      <!-- Brisanje uzorka -->

      <vuestic-modal-control-delete
        :show.sync="show"
        ref="staticModalDeleteControl"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #acb5be;">
            {{ "Brisanje kontrolnog uzorka: " }}
          </span>
          <span style="color: #e34a4a;">{{ sid }}</span>
        </div>
        <div>
          <h5>{{ "Jeste li sigurni da želite obrisati Kontrolni uzorak?" }}</h5>
        </div>
      </vuestic-modal-control-delete>

      <!-- Unos komentara -->

      <vuestic-modal-comment-control
        :show.sync="show"
        ref="staticModalCommentControl"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Unos komentara za Kontrolni uzorak: " + sid }}
        </div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-comment-control>

      <!-- Email Send -->

      <vuestic-modal-mail-control
        :show.sync="show"
        ref="staticModalSendMailControl"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Slanje kontrolnih rezultata na adresu: " }}
          <span style="color: #4ae387;">{{ email }}</span>
        </div>
        <div>
          <h5>
            {{ "Jeste li sigurni da želite poslati kontrolne rezultate?" }}
          </h5>
        </div>
      </vuestic-modal-mail-control>

      <!-- Error -->

      <vuestic-modal-error-control
        :show.sync="show"
        ref="staticModalError"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a;">{{ "404: Not Found" }}</span>
        </div>
        <div>
          <h5>{{ "Greška prilikom čitanja kontrolnih rezultata." }}</h5>
        </div>
      </vuestic-modal-error-control>

      <vuestic-modal-error-control
        :show.sync="show"
        ref="staticModalVerifyPrivilege"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a;">{{ "401: Not Authorized" }}</span>
        </div>
        <div>
          <h5>{{ "Nemate odgovarajuće privilegije." }}</h5>
        </div>
      </vuestic-modal-error-control>
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
          <button v-if="false" @click.prevent="Test">{{ "Loading..." }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../../../router";
import store from "vuex-store";
import { http } from "../../../../config/config.js";
import { barcode } from "../../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
import { bus } from "../../../main";
import { server } from "../../../../config/config.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { AtomSpinner } from "epic-spinners";
import PDFObject from "pdfobject";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "collapse-obrada-control",
  data() {
    return {
      Kontrola: {
        Header: "",
        LOT: "",
        Multi: "Multi",
        query_date:
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(8, 10) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(5, 7) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(0, 4),
        today_date:
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(8, 10) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(5, 7) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(0, 4),
        Uzorci: [],
        Aparati: [],
      },
      //
      show: true,
      main: false,
      pdf: false,
      email: "",
      verificiran: false,
      save_retest: false,
      show_table: false,
      final_pdf: false,
      samples: [],
      link: "",
      document: "",
      sid: "",
      rezultati: [],
      sample: {},
      url: "",
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      // Overlay
      isLoading: false,
      fullPage: true,
    };
  },
  components: {
    Loading,
    AtomSpinner,
  },
  mounted() {
    bus.$on("trash", (data) => {
      this.sid = data.sid;
      this.$refs.staticModalDeleteControl.open();
    });

    bus.$on("ControlSampleDelete", () => {
      this.isLoading = true;
      http
        .post("control/sample/delete", {
          id: this.$store.state.sid,
          aparat: this.sample.aparat,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            if (res.data.rezultat === null) {
              router.push("/kontrole/obrada/pregled");
            } else {
              this.Kontrola.Uzorci.forEach((element) => {
                if (
                  JSON.stringify(element.aparat._id) ===
                  JSON.stringify(this.sample.aparat._id)
                ) {
                  element.removed = true;
                }
              });
            }
            bus.$emit("ControlSampleDeleted");
          }
          this.isLoading = false;
        });
    });

    bus.$on("comment", (data) => {
      this.sid = data.sid;
      this.$refs.staticModalCommentControl.open();
    });

    bus.$on("barcode", (data) => {
      var link = barcode + "kontrole/" + data.sid + ".png";
      var datum = "";

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
    });

    bus.$on("save", (data) => {
      this.SaveResults(this.rezultati);
    });

    bus.$on("Sample", (data) => {
      this.$store.dispatch("SetSample", data.sid);
      this.GetControlSample(data);
    });

    //
    //
    //
    //
    //

    bus.$on("check", (data) => {
      this.Approve(this.rezultati);
    });

    bus.$on("verify", (data) => {
      this.Verify(this.rezultati);
    });

    bus.$on("undo", (data) => {
      this.Disapprove(this.rezultati);
    });

    bus.$on("unlock", (data) => {
      this.UnVerify(this.rezultati);
    });

    bus.$on("pdf", (data) => {
      if (!data.pdf_exists) {
        this.$refs.staticModalError.open();
      } else {
        this.document = data.sid + "_" + data.aparat._id + ".pdf";
        this.url =
          server +
          "nalazi/kontrole/" +
          data.sid +
          "_" +
          data.aparat._id +
          ".pdf";

        var options = {
          width: "100%",
          height: "800px",
        };
        PDFObject.embed(this.url, "#pdf-container", options);

        this.main = false;
        this.pdf = true;
      }
    });

    bus.$on("Mail", () => {
      this.SendMail(this.email);
    });

    bus.$on("Error", () => {
      // Generate new Report
      console.warn("Greška prilikom čitanja nalaza.");
    });
  },
  beforeDestroy() {
    bus.$off("trash");
    bus.$off("ControlSampleDelete");
    bus.$off("comment");
    bus.$off("barcode");
    bus.$off("save");
    bus.$off("check");
    bus.$off("verify");
    bus.$off("undo");
    bus.$off("unlock");
    bus.$off("pdf");
    bus.$off("Sample");
    bus.$off("Mail");
    bus.$off("Error");
  },
  created() {
    http
      .post("/control/sample/get/", {
        kontrola: this.$route.query.kontrola,
        site: this.$store.state.site,
        token: this.$store.state.token,
      })

      .then((res) => {
        this.Kontrola.Header = res.data.kontrola.kontrola.naziv;
        this.Kontrola.LOT = res.data.kontrola.kontrola.lot;

        if (res.data.kontrola.kontrola.multi) {
          this.Kontrola.Multi = "Multi";
        } else {
          var tip = (this.Kontrola.Multi = "Single");
        }

        this.Kontrola.query_date =
          res.data.kontrola.created_at.substring(8, 10) +
          "." +
          res.data.kontrola.created_at.substring(5, 7) +
          "." +
          res.data.kontrola.created_at.substring(0, 4);

        this.Kontrola.today_date =
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(8, 10) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(5, 7) +
          "." +
          JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
            .substring(1, 11)
            .substring(0, 4);

        this.Kontrola.Uzorci = [];
        this.Kontrola.Aparati = [];

        res.data.kontrola.tests.forEach((test) => {
          this.Kontrola.Aparati.push(test.aparat);
        });

        this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

        this.Kontrola.Aparati.forEach((aparat) => {
          var assays = [];
          var status = "ZAPRIMLJEN";
          var zaprimljen = 0;
          var obrada = 0;
          var realizovan = 0;
          var odobren = 0;
          var verificiran = 0;

          res.data.kontrola.tests.forEach((assay) => {
            if (
              JSON.stringify(aparat._id) == JSON.stringify(assay.aparat._id)
            ) {
              switch (assay.status) {
                case "ZAPRIMLJEN":
                  zaprimljen++;
                  break;
                case "U OBRADI":
                  obrada++;
                  break;
                case "REALIZOVAN":
                  realizovan++;
                  break;
                case "ODOBREN":
                  odobren++;
                  break;
                case "VERIFICIRAN":
                  verificiran++;
                  break;

                default:
                  break;
              }
              assays.push(assay);
            }
          });

          if (verificiran == assays.length) {
            status = "VERIFICIRAN";
          } else if (odobren == assays.length) {
            status = "ODOBREN";
          } else if (zaprimljen == assays.length) {
            status = "ZAPRIMLJEN";
          } else if (realizovan == assays.length) {
            status = "REALIZOVAN";
          } else {
            status = "U OBRADI";
          }

          var uzorak = {
            aparat: aparat,
            testovi: assays,
            kontrola: res.data.kontrola.kontrola,
            site: res.data.kontrola.site,
            status: status,
            sid: res.data.kontrola.id,
            pdf_exists: true,
            tip: "Nema podataka.",
            _id: res.data.kontrola._id,
            removed: false,
          };

          this.Kontrola.Uzorci.push(uzorak);
        });
        this.main = true;
      });
  },
  methods: {
    onCancel() {},
    GetControlSample(data) {
      this.rezultati = [];
      http
        .post("/control/sample/get/", {
          kontrola: data._id,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          var test = {};

          if (res.data.kontrola.tests.length) {
            res.data.kontrola.tests.sort(function (a, b) {
              return a.labassay.grupa + a.labassay.grouporder ==
                b.labassay.grupa + b.labassay.grouporder
                ? 0
                : +(
                    a.labassay.grupa + a.labassay.grouporder >
                    b.labassay.grupa + b.labassay.grouporder
                  ) || -1;
            });

            res.data.kontrola.tests.forEach((element) => {
              if (
                JSON.stringify(data.aparat._id) ==
                JSON.stringify(element.aparat._id)
              ) {
                test = {};

                test.ime = element.labassay.naziv;
                test.analit = element.labassay.analit;
                test._id = element._id;
                test.labassay_id = element.labassay._id;
                test.analyser = element.aparat._id;
                test.retest = element.retest;

                element.rezultat.forEach((rezultat) => {
                  test.realizovan = false;

                  if (rezultat.rezultat_f != "") {
                    test.realizovan = true;
                  }

                  test.rezultat = rezultat.rezultat_f;
                  test.dRef = rezultat.ref_d;
                  test.gRef = rezultat.ref_g;

                  switch (rezultat.interpretacija) {
                    case "-":
                      test.reference = test.dRef + " - " + test.gRef;
                      break;
                    case "<":
                      test.reference = "< " + test.gRef;
                      break;
                    case "≤":
                      test.reference = "≤ " + test.gRef;
                      break;
                    case ">":
                      test.reference = "> " + test.gRef;
                      break;
                    case "≥":
                      test.reference = "≥ " + test.gRef;
                      break;
                    case "none":
                      test.reference = "/";
                      break;
                    case "neg":
                      test.reference = "negativan";
                      break;

                    default:
                      break;
                  }
                  test.unit = rezultat.jedinice_f;
                });

                if (
                  element.status === "VERIFICIRAN" ||
                  element.status === "ODOBREN"
                ) {
                  test.edit = false;
                } else {
                  test.edit = true;
                }
                this.rezultati.push(test);
              }
            });

            this.sample = data;
            this.show_table = true;
          }
        })
        .then(() => {
          bus.$emit("SetClientHeight", data.sid + data.aparat._id);
        });
    },
    SaveResults(rezultati) {
      this.isLoading = true;

      rezultati.forEach((element) => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      http
        .post("/control/results/save/", {
          id: this.$store.state.sid,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati,
        })
        .then((res) => {
          http
            .post("/control/sample/get/", {
              kontrola: this.$route.query.kontrola,
              site: this.$store.state.site,
              token: this.$store.state.token,
            })

            .then((res) => {
              this.Kontrola.Uzorci = [];
              this.Kontrola.Aparati = [];

              res.data.kontrola.tests.forEach((test) => {
                this.Kontrola.Aparati.push(test.aparat);
              });

              this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

              this.Kontrola.Aparati.forEach((aparat) => {
                var assays = [];
                var status = "ZAPRIMLJEN";
                var zaprimljen = 0;
                var obrada = 0;
                var realizovan = 0;
                var odobren = 0;
                var verificiran = 0;

                res.data.kontrola.tests.forEach((assay) => {
                  if (
                    JSON.stringify(aparat._id) ==
                    JSON.stringify(assay.aparat._id)
                  ) {
                    switch (assay.status) {
                      case "ZAPRIMLJEN":
                        zaprimljen++;
                        break;
                      case "U OBRADI":
                        obrada++;
                        break;
                      case "REALIZOVAN":
                        realizovan++;
                        break;
                      case "ODOBREN":
                        odobren++;
                        break;
                      case "VERIFICIRAN":
                        verificiran++;
                        break;

                      default:
                        break;
                    }
                    assays.push(assay);
                  }
                });

                if (verificiran == assays.length) {
                  status = "VERIFICIRAN";
                } else if (odobren == assays.length) {
                  status = "ODOBREN";
                } else if (zaprimljen == assays.length) {
                  status = "ZAPRIMLJEN";
                } else if (realizovan == assays.length) {
                  status = "REALIZOVAN";
                } else {
                  status = "U OBRADI";
                }

                var uzorak = {
                  aparat: aparat,
                  testovi: assays,
                  kontrola: res.data.kontrola.kontrola,
                  site: res.data.kontrola.site,
                  status: status,
                  sid: res.data.kontrola.id,
                  pdf_exists: true,
                  tip: "Nema podataka.",
                  _id: res.data.kontrola._id,
                  removed: false,
                };

                this.Kontrola.Uzorci.push(uzorak);
              });
              this.main = true;
            });

          this.isLoading = false;
        });
    },
    Povratak() {
      router.push(
        "/kontrole/obrada/pregled/" + "?sekcija=" + "Kontrolni uzorci"
      );
    },
    Nazad() {
      this.main = true;
      this.pdf = false;
    },
    Email: function (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    RetestEnable: function (event) {
      this.isLoading = true;
      this.rezultati.forEach((element) => {
        if (element.labassay_id === event.target.id) {
          element.retest = true;
        }
      });

      http
        .post("control/retest/enable", {
          id: this.$store.state.sid,
          labassay: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          if (res.data.success) {
            this.rezultati.forEach((element) => {
              if (element.labassay_id === event.target.id) {
                element.retest = true;
              }
            });
          }
        });
      this.isLoading = false;
    },
    RetestDisable: function (event) {
      this.isLoading = true;
      this.rezultati.forEach((element) => {
        if (element.labassay_id === event.target.id) {
          element.retest = false;
        }
      });

      http
        .post("control/retest/disable", {
          id: this.$store.state.sid,
          labassay: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          if (res.data.success) {
            this.rezultati.forEach((element) => {
              if (element.labassay_id === event.target.id) {
                element.retest = false;
              }
            });
          }
          this.isLoading = false;
        });
    },
    Approve(rezultati) {
      this.isLoading = true;

      this.rezultati.forEach((element) => {
        element.edit = false;
        element.retest = false;
      });

      rezultati.forEach((element) => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      http
        .post("/control/results/approve/", {
          id: this.$store.state.sid,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati,
        })

        .then((res) => {
          http
            .post("/control/sample/get/", {
              kontrola: this.$route.query.kontrola,
              site: this.$store.state.site,
              token: this.$store.state.token,
            })

            .then((res) => {
              this.sample.status = "ODOBREN";

              this.Kontrola.Uzorci = [];
              this.Kontrola.Aparati = [];

              res.data.kontrola.tests.forEach((test) => {
                this.Kontrola.Aparati.push(test.aparat);
              });

              this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

              this.Kontrola.Aparati.forEach((aparat) => {
                var assays = [];
                var status = "ZAPRIMLJEN";
                var zaprimljen = 0;
                var obrada = 0;
                var realizovan = 0;
                var odobren = 0;
                var verificiran = 0;

                res.data.kontrola.tests.forEach((assay) => {
                  if (
                    JSON.stringify(aparat._id) ==
                    JSON.stringify(assay.aparat._id)
                  ) {
                    switch (assay.status) {
                      case "ZAPRIMLJEN":
                        zaprimljen++;
                        break;
                      case "U OBRADI":
                        obrada++;
                        break;
                      case "REALIZOVAN":
                        realizovan++;
                        break;
                      case "ODOBREN":
                        odobren++;
                        break;
                      case "VERIFICIRAN":
                        verificiran++;
                        break;

                      default:
                        break;
                    }
                    assays.push(assay);
                  }
                });

                if (verificiran == assays.length) {
                  status = "VERIFICIRAN";
                } else if (odobren == assays.length) {
                  status = "ODOBREN";
                } else if (zaprimljen == assays.length) {
                  status = "ZAPRIMLJEN";
                } else if (realizovan == assays.length) {
                  status = "REALIZOVAN";
                } else {
                  status = "U OBRADI";
                }

                var uzorak = {
                  aparat: aparat,
                  testovi: assays,
                  kontrola: res.data.kontrola.kontrola,
                  site: res.data.kontrola.site,
                  status: status,
                  sid: res.data.kontrola.id,
                  pdf_exists: true,
                  tip: "Nema podataka.",
                  _id: res.data.kontrola._id,
                  removed: false,
                };

                this.Kontrola.Uzorci.push(uzorak);
              });
              this.main = true;
            });
        })
        .then((res) => {
          http
            .post("control/nalazi/create", {
              id: this.$store.state.sid,
              aparat: this.sample.aparat,
              token: this.$store.state.token,
              site: this.$store.state.site,
              location: "/kontrole",
            })
            .then((res) => {
              this.isLoading = false;
            });
        });
    },
    Disapprove(rezultati) {
      this.isLoading = true;

      this.rezultati.forEach((element) => {
        element.edit = true;
      });

      rezultati.forEach((element) => {
        element.rezultat = element.rezultat.replace(/,/g, ".");
      });

      http
        .post("/control/results/disapprove/", {
          id: this.$store.state.sid,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati,
        })

        .then((res) => {
          http
            .post("/control/sample/get/", {
              kontrola: this.$route.query.kontrola,
              site: this.$store.state.site,
              token: this.$store.state.token,
            })

            .then((res) => {
              this.Kontrola.Uzorci = [];
              this.Kontrola.Aparati = [];

              res.data.kontrola.tests.forEach((test) => {
                this.Kontrola.Aparati.push(test.aparat);
              });

              this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

              this.Kontrola.Aparati.forEach((aparat) => {
                var assays = [];
                var status = "ZAPRIMLJEN";
                var zaprimljen = 0;
                var obrada = 0;
                var realizovan = 0;
                var odobren = 0;
                var verificiran = 0;

                res.data.kontrola.tests.forEach((assay) => {
                  if (
                    JSON.stringify(aparat._id) ==
                    JSON.stringify(assay.aparat._id)
                  ) {
                    switch (assay.status) {
                      case "ZAPRIMLJEN":
                        zaprimljen++;
                        break;
                      case "U OBRADI":
                        obrada++;
                        break;
                      case "REALIZOVAN":
                        realizovan++;
                        break;
                      case "ODOBREN":
                        odobren++;
                        break;
                      case "VERIFICIRAN":
                        verificiran++;
                        break;

                      default:
                        break;
                    }
                    assays.push(assay);
                  }
                });

                if (verificiran == assays.length) {
                  status = "VERIFICIRAN";
                } else if (odobren == assays.length) {
                  status = "ODOBREN";
                } else if (zaprimljen == assays.length) {
                  status = "ZAPRIMLJEN";
                } else if (realizovan == assays.length) {
                  status = "REALIZOVAN";
                } else {
                  status = "U OBRADI";
                }

                var uzorak = {
                  aparat: aparat,
                  testovi: assays,
                  kontrola: res.data.kontrola.kontrola,
                  site: res.data.kontrola.site,
                  status: status,
                  sid: res.data.kontrola.id,
                  pdf_exists: true,
                  tip: "Nema podataka.",
                  _id: res.data.kontrola._id,
                  removed: false,
                };

                this.Kontrola.Uzorci.push(uzorak);
              });
              this.main = true;
            });

          this.isLoading = false;
        });
    },
    MailDialog() {
      this.$refs.staticModalSendMailControl.open();
    },
    SendMail(email) {
      // Vue Loading Overlay Component
      this.isLoading = true;
      http
        .post("control/nalazi/mail", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          id: this.$store.state.sid,
          aparat: this.sample.aparat,
          email: email,
          input: "kontrole/",
          output: "emails/",
          doc: this.document,
        })
        .then((res) => {
          this.isLoading = false;

          if (res.data.success) {
            this.toastText = "Nalaz uspješno poslan.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.false,
              className: this.className,
            });
          } else {
            this.toastText = "Greška prilikom slanja nalaza!";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.false,
              className: this.className,
            });
          }
        });
    },
    Verify(rezultati) {
      if (!this.$store.state.access.verify) {
        this.$refs.staticModalVerifyPrivilege.open();
      } else {
        this.isLoading = true;

        http
          .post("/control/results/verify/", {
            id: this.$store.state.sid,
            aparat: this.sample.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site,
            rezultati: rezultati,
          })

          .then((res) => {
            http
              .post("/control/sample/get/", {
                kontrola: this.$route.query.kontrola,
                site: this.$store.state.site,
                token: this.$store.state.token,
              })

              .then((res) => {
                this.Kontrola.Uzorci = [];
                this.Kontrola.Aparati = [];

                res.data.kontrola.tests.forEach((test) => {
                  this.Kontrola.Aparati.push(test.aparat);
                });

                this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

                this.Kontrola.Aparati.forEach((aparat) => {
                  var assays = [];
                  var status = "ZAPRIMLJEN";
                  var zaprimljen = 0;
                  var obrada = 0;
                  var realizovan = 0;
                  var odobren = 0;
                  var verificiran = 0;

                  res.data.kontrola.tests.forEach((assay) => {
                    if (
                      JSON.stringify(aparat._id) ==
                      JSON.stringify(assay.aparat._id)
                    ) {
                      switch (assay.status) {
                        case "ZAPRIMLJEN":
                          zaprimljen++;
                          break;
                        case "U OBRADI":
                          obrada++;
                          break;
                        case "REALIZOVAN":
                          realizovan++;
                          break;
                        case "ODOBREN":
                          odobren++;
                          break;
                        case "VERIFICIRAN":
                          verificiran++;
                          break;

                        default:
                          break;
                      }
                      assays.push(assay);
                    }
                  });

                  if (verificiran == assays.length) {
                    status = "VERIFICIRAN";
                  } else if (odobren == assays.length) {
                    status = "ODOBREN";
                  } else if (zaprimljen == assays.length) {
                    status = "ZAPRIMLJEN";
                  } else if (realizovan == assays.length) {
                    status = "REALIZOVAN";
                  } else {
                    status = "U OBRADI";
                  }

                  var uzorak = {
                    aparat: aparat,
                    testovi: assays,
                    kontrola: res.data.kontrola.kontrola,
                    site: res.data.kontrola.site,
                    status: status,
                    sid: res.data.kontrola.id,
                    pdf_exists: true,
                    tip: "Nema podataka.",
                    _id: res.data.kontrola._id,
                    removed: false,
                  };

                  this.Kontrola.Uzorci.push(uzorak);
                });
                this.main = true;
              });

            this.isLoading = false;
          });
      }
    },
    UnVerify(rezultati) {
      if (!this.$store.state.access.verify) {
        this.$refs.staticModalVerifyPrivilege.open();
      } else {
        this.isLoading = true;

        http
          .post("/control/results/unverify/", {
            id: this.$store.state.sid,
            aparat: this.sample.aparat,
            token: this.$store.state.token,
            site: this.$store.state.site,
            rezultati: rezultati,
          })

          .then((res) => {
            http
              .post("/control/sample/get/", {
                kontrola: this.$route.query.kontrola,
                site: this.$store.state.site,
                token: this.$store.state.token,
              })

              .then((res) => {
                this.Kontrola.Uzorci = [];
                this.Kontrola.Aparati = [];

                res.data.kontrola.tests.forEach((test) => {
                  this.Kontrola.Aparati.push(test.aparat);
                });

                this.Kontrola.Aparati = _.uniqBy(this.Kontrola.Aparati, "_id");

                this.Kontrola.Aparati.forEach((aparat) => {
                  var assays = [];
                  var status = "ZAPRIMLJEN";
                  var zaprimljen = 0;
                  var obrada = 0;
                  var realizovan = 0;
                  var odobren = 0;
                  var verificiran = 0;

                  res.data.kontrola.tests.forEach((assay) => {
                    if (
                      JSON.stringify(aparat._id) ==
                      JSON.stringify(assay.aparat._id)
                    ) {
                      switch (assay.status) {
                        case "ZAPRIMLJEN":
                          zaprimljen++;
                          break;
                        case "U OBRADI":
                          obrada++;
                          break;
                        case "REALIZOVAN":
                          realizovan++;
                          break;
                        case "ODOBREN":
                          odobren++;
                          break;
                        case "VERIFICIRAN":
                          verificiran++;
                          break;

                        default:
                          break;
                      }
                      assays.push(assay);
                    }
                  });

                  if (verificiran == assays.length) {
                    status = "VERIFICIRAN";
                  } else if (odobren == assays.length) {
                    status = "ODOBREN";
                  } else if (zaprimljen == assays.length) {
                    status = "ZAPRIMLJEN";
                  } else if (realizovan == assays.length) {
                    status = "REALIZOVAN";
                  } else {
                    status = "U OBRADI";
                  }

                  var uzorak = {
                    aparat: aparat,
                    testovi: assays,
                    kontrola: res.data.kontrola.kontrola,
                    site: res.data.kontrola.site,
                    status: status,
                    sid: res.data.kontrola.id,
                    pdf_exists: true,
                    tip: "Nema podataka.",
                    _id: res.data.kontrola._id,
                    removed: false,
                  };

                  this.Kontrola.Uzorci.push(uzorak);
                });
                this.main = true;
              });

            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-page {
  &__content {
    padding: 2rem;
    &__title {
      font-size: 1.375rem;
      font-weight: bold;
    }
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}

i:hover {
  color: #4ae387 !important;
}

.circle {
  width: 1rem;
  opacity: 0.5;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
