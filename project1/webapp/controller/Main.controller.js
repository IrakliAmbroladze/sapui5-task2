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
        MessageToast.show("Delete Record clicked");
      },
    });
  },
);
