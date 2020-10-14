export default {
  tableFields: [
    {
      name: "partneri",
      title: "",
      width: "3%"
    },
    {
      name: "obrada",
      title: "detalji",
      width: "13%"
    },
    {
      name: "id",
      title: "id",
      sortField: "id",
      width: "5%"
    },
    {
      name: "ime",
      sortField: "ime",
      width: "9%"
    },
    {
      name: "prezime",
      sortField: "prezime",
      width: "13%"
    },
    {
      name: "jmbg",
      title: "jmbg",
      width: "10%"
    },
    {
      name: "barcodes",
      title: "barcodes",
      width: "19%"
    },
    {
      name: "racun",
      title: "račun",
      width: "12%"
    },
    {
      name: "datum",
      title: "datum",
      width: "10%"
    },
    {
      name: "time",
      title: "vrijeme",
      width: "6%"
    }
  ],
  sortFunctions: {
    ime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    prezime: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    pacijent: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
