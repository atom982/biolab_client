export default {
  tableFields: [
    {
      name: "delivered",
      title: "",
      width: "4%"
    },
    {
      name: "outbox",
      title: "pregled",
      width: "14%"
    },
    {
      name: "adresa",
      sortField: "adresa",
      title: "adresa",
      width: "20%"
    },
    {
      name: "ime",
      sortField: "ime",
      width: "14%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "20%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      sortField: "jmbg",
      width: "14%"
    },
    {
      name: "izmjena",
      title: "poslano",
      width: "14%"
    }
  ],

  sortFunctions: {
    ime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    jmbg: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
