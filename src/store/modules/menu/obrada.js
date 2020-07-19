import lazyLoading from "./lazyLoading";

export default {
  name: "obrada",
  path: "/obrada/pregled",
  component: lazyLoading("obrada/table"),
  meta: {
    default: false,
    expanded: false,
    title: "Obrada",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-files",
    requiredAuth: true
  }
};
