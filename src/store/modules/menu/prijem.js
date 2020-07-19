import lazyLoading from "./lazyLoading";

export default {
  name: "prijem",
  path: "/prijem",
  component: lazyLoading("02_prijem/PregledPacijenta"),
  meta: {
    default: false,
    title: "Prijem",
    class: "primary",
    show: false,
    iconClass: "fa fa-users",
    requiredAuth: true
  }
};
