let ol = document.getElementsByTagName("ol")[0];

let btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    let inputVal = document.getElementsByTagName("input")[0].value;

    let li = document.createElement("li");
    let node = document.createTextNode(inputVal);
    
    li.appendChild(node);
    ol.appendChild(li);

    li.addEventListener("click", function() {
        alert(inputVal+"항목을 삭제하시겠습니까?");
        li.remove();
    });

    document.getElementsByTagName("input")[0].value = "";
});
