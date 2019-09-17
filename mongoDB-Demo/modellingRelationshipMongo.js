// Using References (Normalized) --> Consistency but extra work is required to fetch author

let author = {
  name: "Manish",
  phone: 12345
};

let course = {
  name: "nodeJs",
  author: "id"
};

// Using Embedded Documents (Denormalized) --> Performance, may cause Inconsistency

let course = {
  name: "",
  author: {
    name: ""
  }
};

// Hybrid Approach

let author = {
  name: ""
  //50 Other Properties
};

let course = {
  name: "",
  author: { name: "", id: "ref" }
};
