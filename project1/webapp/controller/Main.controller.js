sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "project1/controller/BaseController",
  ],
  (JSONModel, MessageToast, BaseController) => {
    "use strict";

    return BaseController.extend("project1.controller.Main", {
      onInit() {
        const oModel = new JSONModel();
        oModel.loadData("../model/books.json");
        this.setModel(oModel, "booksModel");
        oModel.attachRequestCompleted(() => {
          this._loadGenres();
        });
      },

      _loadGenres: function () {
        const aBooks = this.getModel("booksModel").getProperty("/books");
        const aGenres = [...new Set(aBooks.map((b) => b.Genre))];

        const oGenreModel = new JSONModel({
          genres: aGenres.map((g) => ({ key: g, text: g })),
        });

        this.setModel(oGenreModel, "genreModel");
      },

      onAddRecord: function () {
        const oModel = this.getModel("booksModel");
        const aBooks = oModel.getProperty("/books");

        aBooks.push({
          ID: "",
          Name: "",
          Author: "",
          Genre: "",
          ReleaseDate: "",
          AvailableQuantity: 0,
        });

        oModel.refresh(true);
        MessageToast.show("New empty record added.");
      },

      onDeleteRecord: function () {
        const oTable = this.byId("booksTable");
        const aSelectedItems = oTable.getSelectedItems();

        if (aSelectedItems.length === 0) {
          MessageToast.show("No rows selected.");
          return;
        }
        const oModel = this.getModel("booksModel");
        let aBooks = oModel.getProperty("/books");

        const aSelectedIndices = aSelectedItems.map((item) => {
          const sPath = item.getBindingContext("booksModel").getPath();
          return parseInt(sPath.split("/").pop(), 10);
        });

        const oSelectedSet = new Set(aSelectedIndices);

        aBooks = aBooks.filter((_, idx) => !oSelectedSet.has(idx));

        oModel.setProperty("/books", aBooks);
        oModel.refresh(true);

        oTable.removeSelections(true);

        MessageToast.show("Selected record(s) deleted.");
      },
    });
  },
);
