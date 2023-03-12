export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data; //array of data
    this._renderer = renderer; //function for rendering data on the page
    this._container = document.querySelector(containerSelector); // container of where the data will be rendered
  }

  renderer() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
