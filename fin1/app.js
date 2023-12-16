class App {
  constructor() {
    this.init();
    this.addEvent();
  }

  init() {

  }

  addEvent() {
    $("#productName").on("click", this.clickProductNameInput);
    $(document).on("click", ".autoList .item", this.clickItem);
  }

  clickItem() {
    const productName = $(this).text();

    $.ajax({
      url: "get/ProductList.php",
      type: "GET",
      data: {
        productName: productName
      },
      success: (res) => {
        const datas = JSON.parse(res);

        $(datas).each((index, data) => {
          $("#productName").val(data.productName);
          $("#productPrice").val(data.productPrice);
        });
      },
      error: (err) => {
        console.log(err);
      }
    })

    $("#productName").val(productName);
    $(".autoList").hide();
  }

  clickProductNameInput() {
    const list = $(".autoList");
    list.empty();

    $.ajax({
      url: "get/ProductNameList.php",
      type: "GET",
      success: (res) => {
        const datas = JSON.parse(res);

        $(datas).each((index, data) => {
          console.log(data);
            list.append(`<div class="item">${data.productName}</div>`);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
    list.show();
  }
}

$(document).ready(() => {
    new App()
});