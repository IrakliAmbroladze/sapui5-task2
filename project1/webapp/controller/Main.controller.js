sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "project1/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (JSONModel, MessageToast, BaseController, Filter, FilterOperator) => {
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
        aGenres.unshift("");
        const oGenreModel = new JSONModel({
          genres: aGenres.map((g) => ({ key: g, text: g || "(All Genres)" })),
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
        const IdsDeletion = aSelectedItems.map((oItem) => {
          return oItem.getBindingContext("booksModel").getProperty("ID");
        });
        if (aSelectedItems.length === 0) {
          MessageToast.show("No rows selected.");
          return;
        }
        let modelArray = this.getModel("booksModel").getObject("/books");
        const newArrayForModel = modelArray.filter(
          (book) => !IdsDeletion.includes(book.ID),
        );
        this.getModel("booksModel").setProperty("/books", newArrayForModel);
        oTable.removeSelections();
        MessageToast.show("Selected record(s) deleted.");
      },

      onFilter: function () {
        const oTable = this.byId("booksTable");

        const sSearchTitle = this.byId("inputTitle").getValue();
        const sSelectedGenre = this.byId("selectGenre").getSelectedKey();

        let aFilters = [];

        if (sSearchTitle) {
          aFilters.push(
            new Filter("Name", FilterOperator.Contains, sSearchTitle),
          );
        }

        if (sSelectedGenre) {
          aFilters.push(new Filter("Genre", FilterOperator.EQ, sSelectedGenre));
        }

        oTable.getBinding("items").filter(aFilters);
      },
    });
  },
);
