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
        MessageToast.show("Add Record clicked");
      },

      onDeleteRecord: function () {
        MessageToast.show("Delete Record clicked");
      },
    });
  }
);
