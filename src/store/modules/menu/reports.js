import lazyLoading from "./lazyLoading";

export default {
  name: "reports",
  path: "/reports",
  component: lazyLoading("reports/Reports"),
  meta: {
    default: false,
    title: "Izvještaji",
    class: "primary",
    show: false,
    iconClass: "fa fa-area-chart",
    requiredAuth: true
  }
};
