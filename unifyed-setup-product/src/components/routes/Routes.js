import FormComponents from "components/pages/Sample/FormComponents";
import Sample from "components/pages/Sample/Sample";
import SampleForm from "components/pages/Sample/SampleForm";
import Layout from "components/shared/layout/Layout";

import { Route, Switch } from "react-router-dom";
const routeComponentMap = {
  "": Sample,
  form: SampleForm,
  home: FormComponents,
};

const navigations = [
  {
    id: 1,
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
  {
    id: 1,
    parent: null,
    name: "Form",
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
];

const staticRoutes = { "": "Sample" };
const titles = {};
const breadcrumbs = {};
let breadcrumb = [];
const getDynamicRoutes = (routes, initialRoute = {}) => {
  if (routes) {
    // eslint-disable-next-line array-callback-return
    routes.map((r) => {
      if (r?.leafNode) {
        initialRoute[r?.accessComponentDTO.componentPath] =
          r?.accessComponentDTO.componentName;
        const routePath = `/${r?.accessComponentDTO.componentPath}`;
        titles[routePath] = r?.name;
        breadcrumb.push(r.name || "");
        breadcrumbs[routePath] = [...breadcrumb];
        breadcrumb.pop();
      } else {
        if (breadcrumb.length > 0 && !!r.name) {
          const findex = breadcrumb.findIndex((val) => val === r.name);
          if (findex > -1) {
            breadcrumb = breadcrumb.slice(0, findex);
          } else {
            breadcrumb.push(r.name || "");
          }
        } else {
          breadcrumb.push(r.name || "");
        }
        if (r?.childItems) {
          getDynamicRoutes(r?.childItems, initialRoute);
        }
        breadcrumb.pop();
      }
    });
  }
  return initialRoute;
};

const Routes = () => {
  const allRoutes = {
    ...getDynamicRoutes(navigations),
    ...staticRoutes,
  };

  return (
    <Layout>
      <Switch>
        {allRoutes &&
          Object.keys(allRoutes).map((route, i) => {
            const RouteComponent = routeComponentMap[route];
            return (
              <Route key={`${route}-${i}`} exact path={`/${route}`}>
                {/* <ContextProvider> */}
                <RouteComponent />
                {/* </ContextProvider> */}
              </Route>
            );
          })}
      </Switch>
    </Layout>
  );
};

export default Routes;
