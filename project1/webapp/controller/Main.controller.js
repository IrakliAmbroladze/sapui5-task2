sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("project1.controller.Main", {
      onInit() {
        const oModel = new JSONModel();
        oModel.loadData("../model/books.json");
        this.getView().setModel(oModel, "booksModel");
      },
      onAddRecord: function () {
        const oModel = this.getView().getModel("booksModel");
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
        const oModel = this.getView().getModel("booksModel");
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
