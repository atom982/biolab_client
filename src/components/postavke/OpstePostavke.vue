<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-3">
        <div class="col-md-12">
          <fieldset>
            <postavke-radio-button
              :label="'Lokacije'"
              :value="'Lokacije'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Doktori'"
              :value="'Doktori'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Mjesta'"
              :value="'Mjesta'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Sidebar'"
              :value="'Sidebar'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Sekcije'"
              :value="'Sekcije'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Grupe testova'"
              :value="'Grupe testova'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Referentne grupe'"
              :value="'Referentne grupe'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Mjerne jedinice'"
              :value="'Mjerne jedinice'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Tehnologije analizatora'"
              :value="'Tehnologije analizatora'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Tipovi analizatora'"
              :value="'Tipovi analizatora'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Uzorci'"
              :value="'Uzorci'"
              :name="'radio'"
              v-model="radioModel"
            />
            <postavke-radio-button
              :label="'Tipovi uzoraka'"
              :value="'Tipovi uzoraka'"
              :name="'radio'"
              v-model="radioModel"
            />
          </fieldset>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12" v-show="radioModel === 'Lokacije'">
            <div class="row">
              <div class="col-md-12">
                <!-- <div v-if="!lokacije.length">
                <span style="color: #e34a4a;">{{"Nema podataka."}}</span>
                </div>-->
                <div class="table-responsive" v-if="lokacije.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="16%">{{'Site'}}</td>
                        <td width="22%">{{'Lokacija'}}</td>
                        <td width="22%">{{'Email adresa'}}</td>
                        <td align="center" width="10%">{{'Send'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in lokacije" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.lokacija}}</td>
                        <td>{{element.email}}</td>
                        <td align="center">{{element.sendEmail}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Lokacije', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="LokacijeDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Doktori'">
            <div class="row">
              <div class="col-md-12">
                <!-- <div v-if="!doktori.length">
                <span style="color: #e34a4a;">{{"Nema podataka."}}</span>
                </div>-->
                <div class="table-responsive" v-if="doktori.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Lokacija'}}</td>
                        <td width="15%">{{'Ime'}}</td>
                        <td width="20%">{{'Prezime'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in doktori" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.lokacija}}</td>
                        <td>{{element.doktorIme}}</td>
                        <td>{{element.doktorPrezime}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Doktori', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="DoktoriDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Mjesta'">
            <div class="row">
              <div class="col-md-5">
                <br />
                <fieldset>
                  <div v-for="element in mjesta_sites" :key="element._id">
                    <vuestic-radio-button
                      :label="element.naziv + ' | ' + element.adresa"
                      :id="element.naziv"
                      :value="element.naziv"
                      :name="'mjestaRadio'"
                      v-model="mjesto_site_radio"
                    />
                  </div>
                </fieldset>
              </div>

              <!-- <div class="col-md-7" v-if="!mjesta.length">
                <span style="color: #e34a4a;">{{"Nema podataka."}}</span>
              </div>-->
              <div class="col-md-7 table-responsive" v-if="mjesta.length">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td width="80%">{{'Mjesto'}}</td>

                      <td align="center" width="20%">{{'Akcija'}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in mjesta" :key="element">
                      <td>{{element}}</td>

                      <td align="center">
                        <i
                          @dblclick.prevent="MjestaDelete($event, element)"
                          v-bind:id="element"
                          style="color:#4ae387;"
                          class="fa fa-trash-o"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Sidebar'">
            <div class="row">
              <div class="col-md-5">
                <br />
                <fieldset>
                  <div v-for="element in sidebar_sites" :key="element._id">
                    <vuestic-radio-button
                      :label="element.naziv + ' | ' + element.adresa"
                      :id="element.naziv"
                      :value="element.naziv"
                      :name="'sitesRadio'"
                      v-model="sidebar_site_radio"
                    />
                  </div>
                </fieldset>
              </div>

              <!-- <div class="col-md-7" v-if="!mjesta.length">
                <span style="color: #e34a4a;">{{"Nema podataka."}}</span>
              </div>-->
              <div class="col-md-7 table-responsive" v-if="true">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td width="35%">{{'Naziv'}}</td>
                      <td width="10%">{{''}}</td>

                      <td width="35%">{{'Klasa'}}</td>

                      <td width="20%">{{'Status'}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in sidebar" :key="element.naziv">
                      <td>{{element.naziv}}</td>
                      <td v-if="element.class === 'primary'">
                        <span class="circle badge-primary"></span>
                      </td>
                      <td v-if="element.class === 'warning'">
                        <span class="circle badge-warning"></span>
                      </td>
                      <td v-if="element.class === 'danger'">
                        <span class="circle badge-danger"></span>
                      </td>
                      <td v-if="element.class === 'info'">
                        <span class="circle badge-info"></span>
                      </td>
                      <td>
                        <select
                          v-model="element.class"
                          @change="SidebarStatus($event, element, 'Class')"
                        >
                          <option v-for="option in classes" :key="option">{{ option }}</option>
                        </select>
                      </td>

                      <td>
                        <div class="form-check abc-checkbox abc-checkbox-primary">
                          <input
                            v-if="!element.disabled"
                            @click="SidebarStatus($event, element, 'Show')"
                            class="form-check-input"
                            id="checkbox1"
                            type="checkbox"
                            v-model="element.show"
                          />
                          <input
                            v-if="element.disabled"
                            disabled
                            class="form-check-input"
                            id="checkbox1"
                            type="checkbox"
                            v-model="element.show"
                          />
                          <label class="form-check-label" for="checkbox1"></label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Sekcije'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="sekcije.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td style="text-transform: none;" width="10%">{{'Rbr.'}}</td>
                        <td width="50%">{{'Sekcija'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in sekcije" :key="element._id">
                        <td>{{element.order}}</td>
                        <td>{{element.sekcija}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Sekcije', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="SekcijeDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Grupe testova'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="grupe.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="30%">{{'Grupa'}}</td>
                        <td width="40%">{{'Sekcija'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in grupe" :key="element._id">
                        <td>{{element.grupa}}</td>
                        <td>{{element.sekcija.sekcija}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Grupe testova', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="GrupaDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Referentne grupe'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="ref_grupe.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="60%">{{'Referentna grupa'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in ref_grupe" :key="element._id">
                        <td>{{element.grupa}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Referentne grupe', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="RefGrDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Mjerne jedinice'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="jedinice.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="60%">{{'Mjerna jedinica'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in jedinice" :key="element._id">
                        <td>{{element.jedinica}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Mjerne jedinice', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="JedinicaDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Tehnologije analizatora'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="tehnologije.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="60%">{{'Tehnologija analizatora'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in tehnologije" :key="element._id">
                        <td>{{element.tehnologijaAparata}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Tehnologije analizatora', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="TehnologijeDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Tipovi analizatora'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="tipovi.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="60%">{{'Tip analizatora'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in tipovi" :key="element._id">
                        <td>{{element.tipAparata}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Tipovi analizatora', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="TipoviDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Uzorci'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="uzorci_def.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td style="text-transform: none;" width="20%">{{'Tip uzorka'}}</td>
                        <td style="text-transform: none;" width="30%">{{'Podtip uzorka'}}</td>
                        <td style="text-transform: none;" width="25%">{{'Code 128'}}</td>
                        <td style="text-transform: none;" align="center" width="12.5%">{{'Uredi'}}</td>
                        <td style="text-transform: none;" align="center" width="12.5%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in uzorci_def" :key="element._id">
                        <td>{{element.ime}}</td>
                        <td v-if="element.tip.length > 30" style="font-size: 14px;">{{element.tip}}</td>
                        <td v-if="element.tip.length <= 30">{{element.tip}}</td>
                        <td>{{element.code[0]}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Uzorci', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="UzorakDefDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="radioModel === 'Tipovi uzoraka'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="uzorci.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="60%">{{'Tip uzorka'}}</td>
                        <td align="center" width="20%">{{'Uredi'}}</td>
                        <td align="center" width="20%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in uzorci" :key="element._id">
                        <td>{{element.tip}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Tipovi uzoraka', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="UzorakDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
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

      <postavke-modal
        :show.sync="show"
        ref="staticModalPostavkeModal"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #4ae387;">{{radioModel}}</span>
          <span style="color: #acb5be;">|{{' Novi unos'}}</span>
        </div>

        <div class="row" v-show="radioModel === 'Lokacije'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="selected_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="lokacija"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Naziv lokacije'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-check abc-checkbox abc-checkbox-primary">
                <input class="form-check-input" id="checkbox2" type="checkbox" v-model="send_email" />
                <label class="form-check-label" for="checkbox2">
                  <span class="abc-label-text">{{'Automatsko slanje na Email adresu'}}</span>
                </label>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="lokacija_email"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Email adresa'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Doktori'">
          <div class="col-md-1"></div>

          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="doktor_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <vuestic-simple-select
                v-show="doktor_site != ''"
                label="Izaberite lokaciju"
                v-model="doktor_lokacija"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="lokacije_select"
              ></vuestic-simple-select>

              <div class="form-group" v-show="doktor_site === ''">
                <div class="input-group">
                  <input id="input-icon-left" title=" " name="input-icon-left" disabled />
                  <label class="control-label" for="input-icon-left">{{'Izaberite lokaciju'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="doktor_ime"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Ime doktora'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="doktor_prezime"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Prezime doktora'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Mjesta'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input id="input-icon-left" title=" " name="input-icon-left" disabled />
                  <label
                    class="control-label"
                    for="input-icon-left"
                  >{{mjesto_site.naziv + ' | ' + mjesto_site.adresa}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="mjesto"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite naziv mjesta'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Sekcije'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite redni broj"
                v-model="sekcija_order"
                name="orderSelect"
                :required="true"
                title=" "
                ref="orderSelect"
                v-bind:options="orders"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="sekcija"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite sekciju'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Grupe testova'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite sekciju"
                v-model="grupa_sekcija"
                name="grupaSelect"
                :required="true"
                title=" "
                ref="grupaSelect"
                v-bind:options="sekcije_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="grupa"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite grupu testova'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Referentne grupe'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="ref_grupa"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite referentnu grupu'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Mjerne jedinice'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="jedinica"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite Mjernu jedinicu'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Tehnologije analizatora'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="tehnologijaAparata"
                    name="input-icon-left"
                    required
                  />
                  <label
                    class="control-label"
                    for="input-icon-left"
                  >{{'Unesite tehnologiju analizatora'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Tipovi analizatora'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="tipAparata"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite tip analizatora'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Uzorci'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Izaberite Tip uzorka"
                v-model="udef_tip"
                title=" "
                v-bind:options="uzorci_izbornik"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="udef_ptip"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite podtip uzorka'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="udef_128"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite Code 128'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="row" v-show="radioModel === 'Tipovi uzoraka'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <div class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="uzorak"
                    name="input-icon-left"
                    required
                  />
                  <label class="control-label" for="input-icon-left">{{'Unesite tip uzorka'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </postavke-modal>
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
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "opste-postavke",

  components: {
    Loading
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      radioModel: "Sekcije",
      jedinica: "",
      jedinice: [],
      tehnologijaAparata: "",
      tehnologije: [],
      tipAparata: "",
      tipovi: [],
      uzorak: "",
      uzorci: [],
      sekcija_order: "",
      orders: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      sekcija: "",
      sekcije: [],
      sekcije_select: [],
      grupa_sekcija: "",
      grupa_sekcija_id: "",
      grupa: "",
      grupe: [],
      ref_grupa: "",
      ref_grupe: [],

      all_sites: [],
      all_sites_select: [],
      selected_site: "",
      lokacija_email: "",
      send_email: false,
      lokacija: "",
      lokacije: [],
      doktor: "",
      doktor_ime: "",
      doktor_prezime: "",
      doktor_lokacija: "",
      lokacije_select: [],
      doktor_site: "",
      doktori: [],

      mjesto: "",
      mjesta: [],
      mjesta_sites: [],
      mjesto_site: {},
      mjesto_site_radio: "",

      sidebar: [],
      sidebar_sites: [],
      sidebar_site: {},
      sidebar_site_radio: "",
      classes: ["primary", "warning", "danger", "info"],
      uzorci_def: [],
      udef_tip: null,
      udef_128: "",
      udef_ptip: "",
      uzorci_izbornik: []
    };
  },
  created() {
    http
      .get(
        "postavke/list/sekcije?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success) {
          this.sekcije = res.data.sekcije;
          this.sekcije_select = [];
          this.sekcije.forEach(element => {
            this.sekcije_select.push(element.sekcija);
          });
        }
      });
  },
  mounted() {
    bus.$on("PostavkeModalInsert", () => {
      switch (this.radioModel) {
        case "Lokacije":
          this.LokacijeInsert();
          break;

        case "Doktori":
          this.DoktoriInsert();
          break;

        case "Mjesta":
          this.MjestaInsert();
          break;

        case "Sidebar":
          // Sidebar
          break;

        case "Sekcije":
          this.SekcijeInsert();
          break;

        case "Grupe testova":
          this.GrupeInsert();
          break;

        case "Referentne grupe":
          this.RefGrInsert();
          break;

        case "Mjerne jedinice":
          this.JedinicaInsert();
          break;

        case "Tehnologije analizatora":
          this.TehnologijeInsert();
          break;

        case "Tipovi analizatora":
          this.TipoviInsert();
          break;

        case "Uzorci":
          this.UzorakDefInsert();
          break;

        case "Tipovi uzoraka":
          this.UzorakInsert();
          break;

        default:
          break;
      }
    });

    bus.$on("PostavkeModalCancel", () => {
      this.Reset();
    });

    bus.$on("OpstePostavkeNoviUnos", () => {
      if (this.radioModel != "Sidebar") {
        this.$refs.staticModalPostavkeModal.open();
      }
    });

    bus.$on("Refresh", data => {
      switch (data) {
        case "Lokacije":
          http
            .get(
              "postavke/list/lokacije?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.lokacije = res.data.lokacije;
              }
            });
          break;

        case "Doktori":
          http
            .get(
              "postavke/list/doktori?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.doktori = res.data.doktori;
              }
            });

          break;

        case "Mjesta":
          break;

        case "Sidebar":
          break;

        case "Sekcije":
          http
            .get(
              "postavke/list/sekcije?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.sekcije = res.data.sekcije;
                this.sekcije_select = [];
                this.sekcije.forEach(element => {
                  this.sekcije_select.push(element.sekcija);
                });
              }
            });
          break;

        case "Grupe testova":
          http
            .get(
              "postavke/list/grupe?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.grupe = res.data.grupe;
              }
            });
          break;

        case "Referentne grupe":
          http
            .get(
              "postavke/list/refgr?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.ref_grupe = res.data.ref_grupe;
              }
            });
          break;

        case "Mjerne jedinice":
          http
            .get(
              "postavke/list/jedinice?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.jedinice = res.data.jedinice;
              }
            });
          break;

        case "Tehnologije analizatora":
          http
            .get(
              "postavke/list/tehnologije?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.tehnologije = res.data.tehnologije;
              }
            });
          break;

        case "Tipovi analizatora":
          http
            .get(
              "postavke/list/tipovi?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.tipovi = res.data.tipovi;
              }
            });
          break;

        case "Uzorci":
          http
            .get(
              "postavke/list/def/uzorak?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res1 => {
              if (res1.data.success) {
                this.uzorci_def = res1.data.uzorci;

                http
                  .get(
                    "postavke/list/uzorak?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site,
                    {}
                  )
                  .then(res2 => {
                    if (res2.data.success) {
                      this.uzorci_izbornik = [];

                      res2.data.uzorci.forEach(element => {
                        this.uzorci_izbornik.push(element.tip);
                      });
                    }
                  });
              }
            });
          break;

        case "Tipovi uzoraka":
          http
            .get(
              "postavke/list/uzorak?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.uzorci = res.data.uzorci;
              }
            });
          break;

        default:
          break;
      }
    });
  },
  watch: {
    mjesto_site_radio: function() {
      this.mjesta_sites.forEach(element => {
        if (element.naziv === this.mjesto_site_radio) {
          this.mjesto_site = element;
          this.mjesta = element.mjesta;
          // console.log(element)
        }
      });
    },

    sidebar_site_radio: function() {
      this.sidebar_sites.forEach(element => {
        if (element.naziv === this.sidebar_site_radio) {
          this.sidebar_site = element;
          this.sidebar = element.sidebar;
          // console.log(element)
        }
      });
    },

    doktor_site: function() {
      this.lokacije_select = [];
      this.doktor_lokacija = "";

      this.lokacije.forEach(element => {
        if (
          element.site.sifra + " | " + element.site.naziv ===
          this.doktor_site
        ) {
          this.lokacije_select.push(element.lokacija);
        }
      });

      if (this.lokacije_select.length == 1) {
        this.doktor_lokacija = this.lokacije_select[0];
      }
    },

    radioModel: function() {
      this.Reset();

      switch (this.radioModel) {
        case "Lokacije":
          // Sites
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "postavke/list/lokacije?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.lokacije = res.data.lokacije;
                  }
                });
            });
          break;

        case "Doktori":
          // Sites
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "postavke/list/doktori?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.doktori = res.data.doktori;

                    http
                      .get(
                        "postavke/list/lokacije?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                        if (res.data.success) {
                          this.lokacije = res.data.lokacije;
                        }
                      });
                  }
                });
            });

          break;

        case "Mjesta":
          // Sites
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.mjesta = [];
              this.mjesta_sites = res.data.sites;
              this.mjesta_sites.forEach(element => {
                if (element._id === this.$store.state.site) {
                  this.mjesto_site = element;
                  this.mjesta = element.mjesta;
                  this.mjesto_site_radio = element.naziv;
                }
              });
            });
          break;

        case "Sidebar":
          // Sites
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.sidebar_sites = res.data.sites;
              this.sidebar_sites.forEach(element => {
                if (element._id === this.$store.state.site) {
                  this.sidebar_site = element;
                  this.sidebar = element.sidebar;
                  this.sidebar_site_radio = element.naziv;
                }
              });
            });
          break;

        case "Sekcije":
          http
            .get(
              "postavke/list/sekcije?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.sekcije = res.data.sekcije;
                this.sekcije_select = [];
                this.sekcije.forEach(element => {
                  this.sekcije_select.push(element.sekcija);
                });
              }
            });
          break;

        case "Grupe testova":
          http
            .get(
              "postavke/list/grupe?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.grupe = res.data.grupe;
              }
            });
          break;

        case "Referentne grupe":
          http
            .get(
              "postavke/list/refgr?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.ref_grupe = res.data.ref_grupe;
              }
            });
          break;

        case "Mjerne jedinice":
          http
            .get(
              "postavke/list/jedinice?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.jedinice = res.data.jedinice;
              }
            });
          break;

        case "Tehnologije analizatora":
          http
            .get(
              "postavke/list/tehnologije?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.tehnologije = res.data.tehnologije;
              }
            });
          break;

        case "Tipovi analizatora":
          http
            .get(
              "postavke/list/tipovi?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.tipovi = res.data.tipovi;
              }
            });
          break;

        case "Uzorci":
          http
            .get(
              "postavke/list/def/uzorak?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res1 => {
              if (res1.data.success) {
                this.uzorci_def = res1.data.uzorci;

                http
                  .get(
                    "postavke/list/uzorak?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site,
                    {}
                  )
                  .then(res2 => {
                    if (res2.data.success) {
                      this.uzorci_izbornik = [];

                      res2.data.uzorci.forEach(element => {
                        this.uzorci_izbornik.push(element.tip);
                      });
                    }
                  });
              }
            });
          break;

        case "Tipovi uzoraka":
          http
            .get(
              "postavke/list/uzorak?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.uzorci = res.data.uzorci;
              }
            });
          break;

        default:
          break;
      }
    }
  },
  beforeDestroy() {
    bus.$off("PostavkeModalInsert");
    bus.$off("PostavkeModalCancel");
    bus.$off("OpstePostavkeNoviUnos");
    bus.$off("Refresh");
  },
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Reset() {
      this.tehnologijaAparata = "";
      this.tipAparata = "";
      this.uzorak = "";
      this.jedinica = "";
      this.ref_grupa = "";
      this.sekcija_order = "";
      this.sekcija = "";
      this.grupa_sekcija = "";
      this.grupa_sekcija_id = "";
      this.grupa = "";
      this.selected_site = "";
      this.lokacija_email = "";
      this.lokacija = "";
      this.send_email = false;
      this.mjesto = "";
      this.doktor = "";
      this.doktor_ime = "";
      this.doktor_prezime = "";
      this.doktor_lokacija = "";
      this.doktor_site = "";
      this.udef_tip = null;
      this.udef_128 = "";
      this.udef_ptip = "";
    },

    EditJson(tab, element) {
      var obj = {};
      obj.element = element;
      obj.tab = tab;
      bus.$emit("JsonEditPostavke", obj);
    },

    SidebarStatus(event, element, type) {
      this.isLoading = true;
      http
        .post("postavke/sidebar/edit", {
          type: type,
          element: element,
          token: this.$store.state.token,
          site: this.sidebar_site._id // this.$store.state.site
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.success) {
            // console.log(res.data);
          }
        });

      // console.log(element);
    },

    MjestaDelete(event, element) {
      http
        .post("postavke/mjesta/remove", {
          site_id: this.mjesto_site._id,
          mjesto: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            // Sites
            http
              .get(
                "assays/site?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                this.mjesta = [];
                this.mjesta_sites = res.data.sites;
                this.mjesta_sites.forEach(element => {
                  if (element._id === this.mjesto_site._id) {
                    this.mjesto_site = element;
                    this.mjesta = element.mjesta;
                    this.mjesto_site_radio = element.naziv;
                  }
                });
              });
          }
        });
    },

    LokacijeDelete(event, element) {
      http
        .post("postavke/lokacije/remove", {
          lokacija: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.lokacije = res.data.lokacije;
          }
        });
    },
    DoktoriDelete(event, element) {
      http
        .post("postavke/doktori/remove", {
          doktor: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.doktori = res.data.doktori;
          }
        });
    },
    SekcijeDelete(event, element) {
      http
        .post("postavke/sekcije/remove", {
          sekcija: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.sekcije = res.data.sekcije;
            this.sekcije_select = [];
            this.sekcije.forEach(element => {
              this.sekcije_select.push(element.sekcija);
            });
          }
        });
    },
    GrupaDelete(event, element) {
      http
        .post("postavke/grupe/remove", {
          grupa: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.grupe = res.data.grupe;
          }
        });
    },
    RefGrDelete(event, element) {
      http
        .post("postavke/refgr/remove", {
          ref_grupa: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.ref_grupe = res.data.ref_grupe;
          }
        });
    },

    JedinicaDelete(event, element) {
      if (element.jedinica.trim() === "") {
        console.warn("Can't Delete.");
      } else {
        http
          .post("postavke/jedinice/remove", {
            jedinica: element,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.jedinice = res.data.jedinice;
            }
          });
      }
    },
    TehnologijeDelete(event, element) {
      http
        .post("postavke/tehnologije/remove", {
          tehnologija: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.tehnologije = res.data.tehnologije;
          }
        });
    },
    TipoviDelete(event, element) {
      http
        .post("postavke/tipovi/remove", {
          tip: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.tipovi = res.data.tipovi;
          }
        });
    },
    UzorakDelete(event, element) {
      http
        .post("postavke/uzorak/remove", {
          uzorak: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.uzorci = res.data.uzorci;
          }
        });
    },

    UzorakDefDelete(event, element) {
      http
        .post("postavke/uzorak/def/remove", {
          uzorak: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.uzorci_def = res.data.uzorci;
          }
        });
    },

    LokacijeInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.lokacije.forEach(element => {
        if (this.lokacija.trim() === element.lokacija) {
          exists = true;
        }
      });

      this.all_sites.forEach(element => {
        if (this.selected_site == element.sifra + " | " + element.naziv) {
          site = element._id;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (
        this.lokacija.trim() === "" ||
        this.selected_site === "" ||
        this.lokacija_email === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          lokacija: this.lokacija,
          email: this.lokacija_email,
          sendEmail: this.send_email,
          site: site
        };
        http
          .post("postavke/lokacije/insert", {
            lokacija: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.lokacije = res.data.lokacije;

              this.selected_site = "";
              this.lokacija_email = "";
              this.lokacija = "";
              this.send_email = false;
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    DoktoriInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.doktori.forEach(element => {
        if (
          this.doktor_ime.trim() + " " + this.doktor_prezime.trim() ===
          element.doktorIme.trim() + " " + element.doktorPrezime.trim()
        ) {
          exists = true;
        }
      });

      this.all_sites.forEach(element => {
        if (this.doktor_site == element.sifra + " | " + element.naziv) {
          site = element._id;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (
        this.doktor_ime.trim() === "" ||
        this.doktor_prezime.trim() === "" ||
        this.doktor_lokacija === "" ||
        this.doktor_site === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          doktorIme: this.doktor_ime,
          doktorPrezime: this.doktor_prezime,
          lokacija: this.doktor_lokacija,
          site: site
        };
        http
          .post("postavke/doktori/insert", {
            doktor: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.doktori = res.data.doktori;

              this.doktor = "";
              this.doktor_ime = "";
              this.doktor_prezime = "";
              this.doktor_lokacija = "";
              this.doktor_site = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    MjestaInsert() {
      var uslov = true;
      var exists = false;

      this.mjesta.forEach(element => {
        if (this.mjesto.trim() === element) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.mjesto.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/mjesta/insert", {
            site_id: this.mjesto_site._id,
            mjesto: this.mjesto,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              // Sites
              http
                .get(
                  "assays/site?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  this.mjesta = [];
                  this.mjesta_sites = res.data.sites;
                  this.mjesta_sites.forEach(element => {
                    if (element._id === this.mjesto_site._id) {
                      this.mjesto_site = element;
                      this.mjesta = element.mjesta;
                      this.mjesto_site_radio = element.naziv;

                      this.mjesto = "";
                      bus.$emit("PostavkeModalHide");
                    }
                  });
                });
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    SekcijeInsert() {
      var uslov = true;
      var exists = false;

      this.sekcije.forEach(element => {
        if (this.sekcija.trim() === element.sekcija) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.sekcija.trim() === "" || this.sekcija_order === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/sekcije/insert", {
            order: this.sekcija_order,
            sekcija: this.sekcija,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.sekcije = res.data.sekcije;
              this.sekcije_select = [];
              this.sekcije.forEach(element => {
                this.sekcije_select.push(element.sekcija);
              });

              this.sekcija_order = "";
              this.sekcija = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    GrupeInsert() {
      var uslov = true;
      var exists = false;

      this.grupe.forEach(element => {
        if (this.grupa.trim() === element.grupa) {
          exists = true;
        }
      });

      this.sekcije.forEach(element => {
        if (this.grupa_sekcija == element.sekcija) {
          this.grupa_sekcija_id = element._id;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (
        this.grupa.trim() === "" ||
        this.grupa_sekcija === "" ||
        this.grupa_sekcija_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        http
          .post("postavke/grupe/insert", {
            grupa: this.grupa,
            sekcija: this.grupa_sekcija_id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.grupe = res.data.grupe;

              this.grupa_sekcija = "";
              this.grupa_sekcija_id = "";
              this.grupa = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    RefGrInsert() {
      var uslov = true;
      var exists = false;

      this.ref_grupe.forEach(element => {
        if (this.ref_grupa.trim() === element.grupa) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.ref_grupa.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/refgr/insert", {
            grupa: this.ref_grupa,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.ref_grupe = res.data.ref_grupe;
              this.ref_grupa = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },

    JedinicaInsert() {
      var uslov = true;
      var exists = false;

      this.jedinice.forEach(element => {
        if (this.jedinica.trim() === element.jedinica) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.jedinica.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/jedinice/insert", {
            jedinica: this.jedinica,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.jedinice = res.data.jedinice;
              this.jedinica = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },
    TehnologijeInsert() {
      var uslov = true;
      var exists = false;

      this.tehnologije.forEach(element => {
        if (this.tehnologijaAparata.trim() === element.tehnologijaAparata) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.tehnologijaAparata.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/tehnologije/insert", {
            tehnologijaAparata: this.tehnologijaAparata,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.tehnologije = res.data.tehnologije;
              this.tehnologijaAparata = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },
    TipoviInsert() {
      var uslov = true;
      var exists = false;

      this.tipovi.forEach(element => {
        if (this.tipAparata.trim() === element.tipAparata) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.tipAparata.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/tipovi/insert", {
            tipAparata: this.tipAparata,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.tipovi = res.data.tipovi;
              this.tipAparata = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },
    UzorakInsert() {
      var uslov = true;
      var exists = false;

      this.uzorci.forEach(element => {
        if (this.uzorak.trim() === element.tip) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.uzorak.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        http
          .post("postavke/uzorak/insert", {
            tip: this.uzorak,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.uzorci = res.data.uzorci;
              this.uzorak = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    },
    UzorakDefInsert() {
      var uslov = true;
      var exists = false;

      this.uzorci_def.forEach(element => {
        if (this.udef_ptip.trim() === element.tip) {
          exists = true;
        }
      });

      if (exists) {
        console.warn("Already exists.");
      }

      if (this.udef_tip === null || this.udef_ptip.trim() === "") {
        uslov = false;
      }

      if (uslov && !exists) {
        var obj = {
          ime: this.udef_tip,
          code: [this.udef_128],
          tip: this.udef_ptip,
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: null,
          komentar: ""
        };

        http
          .post("postavke/uzorak/def/insert", {
            tip: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.uzorci_def = res.data.uzorci;
              this.udef_tip = null;
              this.udef_128 = "";
              this.udef_ptip = "";
              bus.$emit("PostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          console.warn("Prerequisites not met.");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
@import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

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
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.circle {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  display: inline-block;
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #f7cc36;
}

i:hover {
  color: #f7cc36 !important;
}
</style>
