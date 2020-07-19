const Uzorci = [
  {
    ime: "Serum",
    code: [],
    tip: "Serum 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Serum",
    code: [],
    tip: "Serum 2",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Serum",
    code: [],
    tip: "Serum 3",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Serum",
    code: ["Imunohemija"],
    tip: "Serum 4",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Serum",
    code: [],
    tip: "Serum 5",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "kapilarna krv",
    code: ["kapilarna krv"],
    tip: "kapilarna krv",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Krv",
    code: [],
    tip: "Krv 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Krv",
    code: [],
    tip: "Krv 2",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Krv",
    code: ["Hemoglobin A1c"],
    tip: "Krv EDTA",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: [],
    tip: "Plazma 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: ["Krvna grupa"],
    tip: "Plazma ABO",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: ["EDTA plazma"],
    tip: "Plazma EDTA",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: ["Citratna plazma"],
    tip: "Plazma Citrat",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: ["Heparinska plazma"],
    tip: "Plazma Heparin",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Plazma",
    code: ["NaF plazma"],
    tip: "Plazma NaF",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Urin",
    code: [],
    tip: "Urin 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Urin",
    code: ["24h urin"],
    tip: "Urin 24h",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Feces",
    code: [],
    tip: "Feces 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Bris",
    code: [],
    tip: "Bris 1",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Bris",
    code: [],
    tip: "Mikrobiologija (Bris ždrijela - bakteriološki)", 
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Bris",
    code: [],
    tip: "Mikrobiologija (Bris ždrijela - mikološki)", 
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Bris",
    code: [],
    tip: "Mikrobiologija (Bris usne šupljine)", 
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Bris",
    code: [],
    tip: "Mikrobiologija (Bris nosa)", 
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  },
  {
    ime: "Ejakulat",
    code: [],
    tip: "Ejakulat",
    patient: {},
    testovi: [],
    testoviTag: [],
    hitno: false,
    time: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -8).replace("T", " "),
    komentar: ""
  }
];

export default {
  Uzorci
};
