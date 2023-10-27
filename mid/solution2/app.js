class App {
    constructor() {
        this.AddEvent();
    }

    AddEvent() {
        document.querySelector('#list_add').addEventListener('click', () => this.MakeList());
        document.querySelector('#list_del').addEventListener('click', () => this.DeleteList());
    }

    MakeList() {
        const inputVal = document.getElementById("form_input").value;
        const ol = document.getElementsByTagName("ol")[0];

        const li = document.createElement("li");
        const arrow = document.createElement("span");
        const txt = document.createElement("span");
        const node = document.createTextNode(inputVal);
        const arrow_node = document.createTextNode(">");

        const sub_ol = document.createElement("ol");

        txt.setAttribute("key", "first");
        sub_ol.setAttribute("type", "A");
        arrow.setAttribute("class", "arrow");
        arrow.appendChild(arrow_node);
        txt.appendChild(node);
        li.appendChild(txt);
        li.appendChild(arrow);
        li.appendChild(sub_ol);

        ol.appendChild(li);

        arrow.addEventListener('click', (e) => this.MakeSubList(e));
        txt.addEventListener('click', (e) => this.TextSelect(e));

        document.getElementsByTagName("input")[0].value = "";
    }


    MakeSubList(e) {
        const prev = e.target.parentNode.previousElementSibling;

        if (prev == null) {
            alert("최상위 리스트는 2단계로 표현이 안 됩니다.");
            return;
        }

        const prev_ol = prev.lastElementChild;
        const val = e.target.parentElement.childNodes[0].textContent;

        const sub_li = document.createElement("li");
        const sub_txt = document.createElement("span");
        const sub_node = document.createTextNode(val);
        const sub_arrow = document.createElement("span");
        const sub_arrow_node = document.createTextNode("<");

        sub_txt.addEventListener('click', (e) => this.TextSelect(e));
        sub_arrow.setAttribute("class", "sub_arrow");
        sub_txt.appendChild(sub_node);
        sub_arrow.appendChild(sub_arrow_node);
        sub_li.appendChild(sub_txt);
        sub_li.appendChild(sub_arrow);
        prev_ol.appendChild(sub_li);

        let my_children = e.target.parentElement.lastElementChild.children;
        if (my_children.length > 0) {
            let my_sibling = my_children[0];
            while (my_sibling != null) {
                const next_sibling = my_sibling.nextElementSibling;

                const sibling_val = my_sibling.childNodes[0].textContent;

                const children_sub_li = document.createElement("li");
                const children_sub_txt = document.createElement("span");
                const children_sub_node = document.createTextNode(sibling_val);
                const children_sub_arrow = document.createElement("span");
                const children_sub_arrow_node = document.createTextNode("<");

                children_sub_arrow.setAttribute("class", "sub_arrow");
                children_sub_txt.appendChild(children_sub_node);
                children_sub_arrow.appendChild(children_sub_arrow_node);
                children_sub_li.appendChild(children_sub_txt);
                children_sub_li.appendChild(children_sub_arrow);
                prev_ol.appendChild(children_sub_li);

                children_sub_arrow.addEventListener('click', (e) => this.ResetSubList(e));
                children_sub_txt.addEventListener('click', (e) => this.TextSelect(e));

                my_sibling.remove();
                my_sibling = next_sibling;
            }
        }
        sub_arrow.addEventListener('click', (e) => this.ResetSubList(e));

        e.target.parentElement.remove();
    }

    ResetSubList(e) {
        const val = e.target.parentElement.childNodes[0].textContent;
        const parent_li = e.target.parentElement.parentElement.parentElement;
        const target_li = parent_li.nextElementSibling;

        let my_sibling = e.target.parentElement.nextElementSibling;

        const li = document.createElement("li");
        const arrow = document.createElement("span");
        const txt = document.createElement("span");
        const node = document.createTextNode(val);
        const arrow_node = document.createTextNode(">");

        const sub_ol = document.createElement("ol");
        sub_ol.setAttribute("type", "A");

        txt.setAttribute("key", "first");
        arrow.setAttribute("class", "arrow");
        arrow.appendChild(arrow_node);
        txt.appendChild(node);
        li.appendChild(txt);
        li.appendChild(arrow);

        arrow.addEventListener('click', (e) => this.MakeSubList(e));
        txt.addEventListener('click', (e) => this.TextSelect(e));

        while (my_sibling != null) {
            const next_sibling = my_sibling.nextElementSibling;

            const sibling_val = my_sibling.childNodes[0].textContent;

            const sub_li = document.createElement("li");
            const sub_txt = document.createElement("span");
            const sub_node = document.createTextNode(sibling_val);
            const sub_arrow = document.createElement("span");
            const sub_arrow_node = document.createTextNode("<");

            sub_arrow.setAttribute("class", "sub_arrow");
            sub_txt.appendChild(sub_node);
            sub_arrow.appendChild(sub_arrow_node);
            sub_li.appendChild(sub_txt);
            sub_li.appendChild(sub_arrow);
            sub_ol.appendChild(sub_li);

            sub_txt.addEventListener('click', (e) => this.TextSelect(e));
            sub_arrow.addEventListener('click', (e) => this.ResetSubList(e));

            my_sibling.remove();
            my_sibling = next_sibling;
        }

        li.appendChild(sub_ol);
        parent_li.parentElement.insertBefore(li, target_li);
        e.target.parentElement.remove();
    }

    TextSelect(e) {

        const selected = e.target.getAttribute("selected");
        const type = e.target.getAttribute("key");

        if (selected != "true") {
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.checked = true;

            const parent_li = e.target.parentElement;

            if (type == "first") {
                e.target.style.backgroundColor = "#888";
                parent_li.insertBefore(checkbox, parent_li.lastChild);
            } else {
                e.target.style.backgroundColor = "MediumSeaGreen";
                parent_li.appendChild(checkbox);
            }
            e.target.style.color = "white";
            e.target.setAttribute("selected", "true");

            checkbox.addEventListener('click', (e) => this.SelectCheckbox(e));
        } else {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
            e.target.nextElementSibling.nextElementSibling.remove();
            e.target.setAttribute("selected", "false");
        }
    }

    SelectCheckbox(e) {
        const type = e.target.previousElementSibling.previousElementSibling.getAttribute("key");
        const parent_li = e.target.parentElement.lastElementChild;
        if (type == "first") {
            let my_children = parent_li.children;
            if (my_children.length > 0) {
                let target_child = my_children[0];
                while (target_child != null) {
                    let next_sibling = target_child.nextElementSibling;
                    if (e.target.checked == false) {
                        target_child.lastElementChild.checked = false;
                    } else {
                        target_child.lastElementChild.checked = true;
                    }
                    target_child = next_sibling;
                }
            }
        }
    }

    DeleteList() {
        const ol = document.getElementsByTagName("ol")[0];
        let children = ol.children;
        if (children.length > 0) {
            let target = children[0];
            while (target != null) {
                let next_sibling = target.nextElementSibling;
                
                if (target.firstElementChild.getAttribute("key") == "first") { 
                    const input = target.children[2];
                    if (input.nodeName == "INPUT") {
                        if (input.checked == true) {
                            let my_children = target.lastElementChild.children;
                            if (my_children.length > 0) {
                                let target_child = my_children[0];
                                // while (target_child != null) {
                                //     let next_sibling = target_child.nextElementSibling;
                                //     if (target_child.childNodes.nodeName == "INPUT") {
                                //         if (target_child.children[2].checked == false || target_child.children[2] == null) {
                                //             alert("삭제를 위해 1단계 리스트를 선택하였을 경우, 하위 리스트까지 모두 선택해 주세요.");
                                //             return;
                                //         }
                                //     }

                                    // target_child = next_sibling;
                                }
                            }
                            target.remove();
                        }
                
                }

                target = next_sibling;
            }
        }
    }
}

new App();
