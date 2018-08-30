import DetailStore from './DetailStore';

class Store {
  constructor(routing) {
    this.routing = routing;
    this.detailStore = new DetailStore();
  }
}

export default Store;
