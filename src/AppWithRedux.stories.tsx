import AppWithRedux from "./AppWithRedux";

import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export const AppWithReduxBaseExample = () => {
  return <AppWithRedux />;
};

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
};
