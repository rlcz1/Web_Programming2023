let ol = document.getElementsByTagName("ol")[0];

let btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    let inputVal = document.getElementsByTagName("input")[0].value;

    let li = document.createElement("li");
    let add_bnt = document.createElement("button");

    let node = document.createTextNode(inputVal);
    let add_btn_node = document.createTextNode("하위 할 일 추가");

    add_bnt.appendChild(add_btn_node);
    li.appendChild(node);
    li.appendChild(add_bnt);
    ol.appendChild(li);

    let sub_ol = document.createElement("ol");
    sub_ol.setAttribute("type", "A");
    li.appendChild(sub_ol);

    add_bnt.addEventListener("click", function() {
        let inputVal = prompt("상세정보 입력");
        if (inputVal == "") return;
        
        sub_ol.appendChild(document.createElement("li")).appendChild(document.createTextNode(inputVal));
    });

    li.addEventListener("click", function(e) {
        if (e.target !== e.currentTarget) return;
        console.log(e.target.childNodes[2].replaceChildren());
    });

    document.getElementsByTagName("input")[0].value = "";
});
