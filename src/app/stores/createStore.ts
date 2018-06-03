import { History } from 'history';
import { RouterStore } from './RouterStore';
import { LanguageStore } from './LanguageStore';
import { NebStore } from './NebStore';
import { STORE_ROUTER, STORE_LANGUAGE, STORE_NEB } from 'app/constants';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  const nebStore = new NebStore({node_url: "http://76c4bc41.ngrok.io"});
  const languageStore = LanguageStore.create({language: "en"});
  return {
    [STORE_ROUTER]: routerStore,
    [STORE_LANGUAGE]: languageStore,
    [STORE_NEB]: nebStore,
  };
}
