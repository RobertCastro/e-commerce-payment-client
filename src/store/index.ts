import { createStore } from 'vuex';

export interface RootState {
  version: string;
}

export default createStore<RootState>({
  state: {
    version: '1.0.0'
  },
  mutations: {},
  actions: {},
  modules: {
    // TODO añadir módulos
  },
});