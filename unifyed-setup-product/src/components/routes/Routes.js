import ErrorFound from "components/pages/ErrorFound/ErrorFound";
import Login from "components/pages/Login/Login";
import FormComponents from "components/pages/Sample/FormComponents";
import Sample from "components/pages/Sample/Sample";
import SampleForm from "components/pages/Sample/SampleForm";
import UserDetails from "components/pages/UserDetails/UserDetails";
import Layout from "components/shared/layout/Layout";
import ContextProvider from "context/provider";
import { navigations } from "navigation";
import { Route, Switch } from "react-router-dom";

/**
 * mapping routes with component
 */

const routeComponentMap = {
  "": Sample,
  form: SampleForm,
  home: FormComponents,
  login: Login,
  userdetail: UserDetails,
  founderror: ErrorFound,
};

/**
 *
 * @param {*} routes
 * @param {*} initialRoute
 * @returns Object - {path:Componentname}
 */
const getDynamicRoutes = (routes = [], initialRoute = {}) => {
  if (routes) {
    // eslint-disable-next-line array-callback-return
    routes.map((r) => {
      if (r?.leafNode) {
        initialRoute[r?.accessComponentDTO.componentPath] =
          r?.accessComponentDTO.componentName;
      } else {
        if (r?.childItems) {
          getDynamicRoutes(r?.childItems, initialRoute);
        }
      }
    });
  }
  return initialRoute;
};

const Routes = () => {
  const allRoutes = {
    ...getDynamicRoutes(navigations),
  };

  return (
    <Layout>
      <Switch>
        {allRoutes &&
          Object.keys(allRoutes).map((route, i) => {
            const RouteComponent = routeComponentMap[route];
            return (
              // <Route
              //   exact
              //   path={`/${route}`}
              //   key={`${route}-${i}`}
              //   render={() => (
              //     <ErrorBoundary
              //       FallbackComponent={ErrorFallback}
              //       onReset={() => console.log("testtest")}
              //       onError={myErrorHandler}
              //       key={`${route}-${i}`}
              //     >
              //       <RouteComponent />
              //     </ErrorBoundary>
              //   )}
              // />
              <Route key={`${route}-${i}`} exact path={`/${route}`}>
                <ContextProvider>
                  <RouteComponent />
                </ContextProvider>
              </Route>
            );
          })}
      </Switch>
    </Layout>
  );
};

export default Routes;
