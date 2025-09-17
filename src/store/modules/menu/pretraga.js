import lazyLoading from "./lazyLoading";

export default {
  name: "pretraga",
  path: "/pretraga",
  component: lazyLoading("pretraga/Pretraga"),
  meta: {
    default: false,
    expanded: false,
    title: "Pretraga",
    class: "primary",
    show: false,
    iconClass: "fa fa-search",
    requiredAuth: true
  }
};
