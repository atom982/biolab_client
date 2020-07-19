import lazyLoading from "./lazyLoading";

export default {
  name: "nalazi",
  meta: {
    expanded: false,
    title: "Nalazi",
    class: "primary",
    show: false,
    iconClass: "vuestic-icon vuestic-icon-forms"
  },

  children: [
    {
      name: "nalazi-pregled",
      path: "/nalazi/pregled",
      component: lazyLoading("nalazi/pregled/pregled"),
      meta: {
        title: "Pregled",
        requiredAuth: true
      }
    },
    {
      name: "nalazi-outbox",
      path: "/nalazi/outbox",
      component: lazyLoading("nalazi/outbox/outbox"),
      meta: {
        title: "Outbox",
        requiredAuth: true
      }
    }
  ]
};
