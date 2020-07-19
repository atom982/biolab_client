export default {
  tableFields: [
    {
      name: "kod",
      title: "kod",
      sortField: "kod",
      width: "6%"     
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
      width: "20%"
    },
    {
      name: "tip",
      title: "tip",
      width: "8%"
    },
    {
      name: "analizator",
      title: "analizator",
      width: "15%"
    },
    {
      name: "metoda",
      title: "metoda",
      width: "10%"
    },
    {
      name: "sekcija",
      title: "sekcija",
      sortField: "sekcija",
      width: "14%"
    },
    {
      name: "reference",
      title: "reference",
      width: "7%"
    },   
    {
      name: "uredi",
      title: "uredi",
      width: "6%"
    },
    {
      name: "akcija",
      title: "akcija",
      dataClass: "text-center",      
      width: "6%"
    }
  ],
  sortFunctions: {
    name: function(item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
};
