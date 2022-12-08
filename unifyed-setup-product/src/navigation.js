export const navigations = [
  {
    id: 1,
    parent: null,
    name: "Dashboard",
    menuOrder: 1,
    visible: true,
    leafNode: true,
    logo: null,
    toolTip: null,
    accessComponentDTO: {
      id: 1,
      description: "Dashboard",
      componentName: "Sample",
      componentPath: "",
    },
    childItems: [],
  },
  {
    id: 3,
    parent: null,
    name: "Forms",
    menuOrder: 1,
    visible: true,
    leafNode: false,
    logo: null,
    toolTip: null,
    childItems: [
      {
        id: 4,
        parent: null,
        name: "Form",
        menuOrder: 1,
        visible: true,
        leafNode: true,
        logo: null,
        toolTip: null,
        accessComponentDTO: {
          id: 1,
          description: "Form",
          componentName: "Form",
          componentPath: "home",
        },
        childItems: [],
      },
      {
        id: 5,
        parent: null,
        name: "Sample Form",
        menuOrder: 1,
        visible: true,
        leafNode: true,
        logo: null,
        toolTip: null,
        accessComponentDTO: {
          id: 1,
          description: "SampleForm",
          componentName: "SampleForm",
          componentPath: "form",
        },
        childItems: [],
      },
    ],
  },
  {
    id: 2,
    parent: null,
    name: "UserDetails",
    menuOrder: 1,
    visible: true,
    leafNode: true,
    logo: null,
    toolTip: null,
    accessComponentDTO: {
      id: 1,
      description: "UserDetails",
      componentName: "UserDetails",
      componentPath: "userdetail",
    },
    childItems: [],
  },
  {
    id: 3,
    parent: null,
    name: "ErrorFound",
    menuOrder: 1,
    visible: true,
    leafNode: true,
    logo: null,
    toolTip: null,
    accessComponentDTO: {
      id: 1,
      description: "ErrorFound",
      componentName: "ErrorFound",
      componentPath: "founderror",
    },
    childItems: [],
  },
  {
    id: 4,
    parent: null,
    name: "FormComponents",
    menuOrder: 1,
    visible: true,
    leafNode: true,
    logo: null,
    toolTip: null,
    accessComponentDTO: {
      id: 1,
      description: "FormComponents",
      componentName: "FormComponents",
      componentPath: "home",
    },
    childItems: [],
  },
];
