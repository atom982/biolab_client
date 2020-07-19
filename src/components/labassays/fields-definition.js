export default {
  tableFields: [
    {
      name: "icon",
      title: "",
      dataClass: "text-center",
      width: "4%"
    },
    {
      name: "sifra",
      title: "sifra",
      sortField: "sifra",
      width: "12%"
    },
    {
      name: "naziv",
      title: "naziv",
      sortField: "naziv",
      width: "8%"
    },
    {
      name: "analit",
      title: "analit",
      sortField: "analit",
      width: "21%"
    },
    {
      name: "jedinica",
      title: "jedinica",
      width: "8%"
    },
    {
      name: "multi",
      title: "multi",
      width: "8%"
    },
    {
      name: "order",
      title: "order",
      sortField: "order",
      width: "6%"
    },
    {
      name: "sekcija",
      title: "sekcija",
      sortField: "sekcija",
      width: "18%"
    },
    {
      name: "uredi",
      title: "uredi",
      width: "10%"
    },
    {
      name: "akcija",
      title: "akcija",
      dataClass: "text-center",
      width: "5%"
    }
  ],
  sortFunctions: {
    name: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
