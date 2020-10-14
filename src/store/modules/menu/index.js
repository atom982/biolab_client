import * as types from "../../mutation-types";
import statistika from "./statistika";
import prijem from "./prijem";
import obrada from "./obrada";
import nalazi from "./nalazi";
import reports from "./reports";
import analize from "./analize";
import kontrole from "./kontrole";
import inventar from "./inventar";
import thermometer from "./loger";
import mikrobiologija from "./mikrobiologija";

// Partneri - Pošiljaoc, Naručioc i Izvršioc
import partneri from "./partneri";

import postavke from "./postavke";
import integracija from "./integracija";
import excel from "./excel";
import analysers from "./analysers";
import assays from "./assays";

const state = {
  items: [
    statistika,
    prijem,
    obrada,
    nalazi,
    reports,
    analize,
    kontrole,
    inventar,
    thermometer,
    mikrobiologija,

    // Partneri - Pošiljaoc, Naručioc i Izvršioc
    partneri,

    postavke,
    integracija,
    excel,
    analysers,
    assays
  ]
};

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM](state, payload) {
    let menuItem = payload.menuItem;
    let expand = payload.expand;
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand;
    }
  }
};

const actions = {
  toggleExpandMenuItem({ commit }, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload);
  }
};

export default {
  state,
  mutations,
  actions
};
