let meetup_options: {[type: string]: Object};
meetup_options = {
  "apple": [
    {
      label: "Location",
      id: "location",
      type: "custom",
      options: [
        "Apple Park",
        "Infinite Loop",
      ]
    },
    {
      label: "Group",
      id: "group",
      type: "custom",
      options: [
        "Interns",
        "Full Time Employees",
        "Contractors"
      ]
    },
    {
      label: "Date",
      id: "date",
      type: "date",
    },
    {
      label: "Timeframe",
      id: "time",
      type: "timeframe",
    },
  ]
};

let housing_options: {[type: string]: Object};
housing_options = {
  "apple": [
    {
      label: "Location",
      id: "location",
      type: "custom",
      options: [
        "San Jose",
        "Mountain View",
        "Cupertino",
        "Redwood City"
      ]
    },
    {
      label: "Group",
      id: "group",
      type: "custom",
      options: [
        "Interns",
        "Full Time Employees",
        "Contractors"
      ]
    },
  ]
};

export { housing_options, meetup_options }