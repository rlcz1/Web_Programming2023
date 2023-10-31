class App {
    constructor() {
        this.addEvent();
    }

    addEvent() {
        document.querySelector('#makeJournalBtn').addEventListener('click', () => {
            this.makeJournal();
            this.makeList();
        });

        document.getElementById("modalSaveBtn").addEventListener('click', this.saveModal);
        document.getElementById("modalCloseBtn").addEventListener('click', this.modalDisable);
        document.getElementById("modifyModalCloseBtn").addEventListener('click', this.modalDisable);
        document.getElementById("modifyModalClose").addEventListener('click', this.modalDisable);
        document.getElementById("modifyModalSaveBtn").addEventListener('click', this.saveModifyModal);
        document.getElementById("modifyModalEdit").addEventListener('click', this.modifyModalEdit);
        document.getElementById("modifyModalDelete").addEventListener('click', this.modifyModalDelete);

        document.getElementById("todoCheckbox").addEventListener('change', this.checkBoxFilter);
        document.getElementById("meetingCheckbox").addEventListener('change', this.checkBoxFilter);
        document.getElementById("ideaCheckbox").addEventListener('change', this.checkBoxFilter);
        document.getElementById("shoppingCheckbox").addEventListener('change', this.checkBoxFilter);
    }

    checkBoxFilter = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedFilters = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFilters.push(checkbox.getAttribute('data-filter'));
            }
        });

        const todoItems = document.querySelectorAll('.todo_item');
        todoItems.forEach(todoItem => {
            if (selectedFilters.includes(todoItem.getAttribute('data-type'))) {
                todoItem.style.display = "block";
            } else {
                todoItem.style.display = "none";
            }
        });
    }

    makeJournal() {
        const calendar = document.getElementById('calendar');
        calendar.replaceChildren();

        const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const thead_tr = document.createElement('tr');
        
        table.appendChild(thead);
        table.appendChild(tbody);
        thead.appendChild(thead_tr);

        for (let i = 0; i < week.length; i++) {
            let th = document.createElement("th");
            th.appendChild(document.createTextNode(week[i]));
            thead_tr.appendChild(th);
        }

        for (let j = 0; j < 5; j++) {
            let tr = document.createElement('tr');
            for (let i = 0; i < week.length; i++) {
                let td = document.createElement("td");
                td.setAttribute("c-idx", j);
                td.setAttribute("idx", i);
                tr.appendChild(td);
                td.addEventListener('click', this.showModal);
            }
            tbody.appendChild(tr);
        }
        calendar.appendChild(table);
    }

    makeList() {
        const list = document.getElementById('list');
        list.replaceChildren();

        const content = document.createElement('div');

        content.setAttribute('class', 'content');
        list.appendChild(content);
    }

    showModal = (e) => {
        const target = e.target;
        const cidx = target.getAttribute('c-idx');
        const idx = target.getAttribute('idx');

        const modal = document.getElementById('modal');
        modal.style.display = "block";

        const modal_cidx = modal.querySelector('input[name="cidx"]');
        const modal_idx = modal.querySelector('input[name="idx"]');

        modal_cidx.value = cidx;
        modal_idx.value = idx;

        modal.querySelector('input[name="title"]').value = "";
        modal.querySelector('textarea[name="content"]').value = "";
        modal.querySelector('select[name="type"]').value = "todo";
    }

    modifyModal = (e) => {
        e.stopPropagation();

        const target = e.target;

        const cidx = target.getAttribute('c-idx');
        const idx = target.getAttribute('idx');
        const type = target.getAttribute('data-type');
        const content = target.getAttribute('data-content');
        const title = target.getAttribute('data-title');

        const modal = document.getElementById('modifyModal');
        modal.style.display = "block";

        const modal_cidx = modal.querySelector('input[name="cidx"]');
        const modal_idx = modal.querySelector('input[name="idx"]');
        const modal_type = modal.querySelector('input[name="hidden_type"]');
        const modal_content = modal.querySelector('input[name="hidden_content"]');
        const modal_title = modal.querySelector('input[name="hidden_title"]');

        modal_cidx.value = cidx;
        modal_idx.value = idx;
        modal_type.value = type;
        modal_content.value = content;
        modal_title.value = title;

        const title_input = modal.querySelector('input[name="title"]');
        const content_input = modal.querySelector('textarea[name="content"]');
        const type_input = modal.querySelector('select[name="type"]');

        title_input.value = title;
        content_input.value = content;
        type_input.value = type;

        document.querySelector('#modifyModal input[name="title"]').setAttribute('disabled', true);
        document.querySelector('#modifyModal textarea').setAttribute('disabled', true);
        document.querySelector('#modifyModal select').setAttribute('disabled', true);
        document.getElementById('modifyModalBtns').style.display = "none";
    }

    saveModal = (e) => {
        const modal = e.target.parentNode.parentNode;
        const title = modal.querySelector('input[name="title"]').value;
        const content = modal.querySelector('textarea[name="content"]').value;
        const type = modal.querySelector('select[name="type"]').value;

        const idx = modal.querySelector('input[name="idx"]').value;
        const cidx = modal.querySelector('input[name="cidx"]').value;

        if (title == "" || content == "") {
            alert("입력란을 모두 채워주세요.");
            return;
        }
        
        // calendar 영역의 todo
        const tbody = document.querySelector('tbody');
        
        const td = tbody.querySelector(`td[c-idx="${cidx}"][idx="${idx}"]`);
        const txt = document.createTextNode(title);
        const div = document.createElement('div');
        div.appendChild(txt);
        div.setAttribute('class', 'todo_item '+type);
        div.setAttribute('data-content', content);
        div.setAttribute('data-type', type);
        div.setAttribute('data-title', title);
        div.setAttribute('c-idx', cidx);
        div.setAttribute('idx', idx);
        td.appendChild(div);
        
        // list 영역의 todo
        const list = document.querySelector('#content .content');
        const list_div = div.cloneNode(true);
        const list_input = document.createElement('input');
        list_input.setAttribute('type', 'radio');
        list_input.setAttribute('name', 'todo');
        list_div.prepend(list_input);
        list.appendChild(list_div);

        list_div.addEventListener('click', this.deleteListItem);
        div.addEventListener('click', this.modifyModal);

        alert("계획이 추가되었습니다.");

        modal.style.display = "none";
    }

    modifyModalEdit = () => {
        document.getElementById('modifyModalBtns').style.display = "block";

        document.querySelector('#modifyModal input[name="title"]').removeAttribute('disabled');
        document.querySelector('#modifyModal textarea').removeAttribute('disabled');
        document.querySelector('#modifyModal select').removeAttribute('disabled');
    }

    modifyModalDelete = (e) => {
        const modal = e.target.parentNode.parentNode.parentNode;

        const idx = modal.querySelector('input[name="idx"]').value;
        const cidx = modal.querySelector('input[name="cidx"]').value;
        const type = modal.querySelector('input[name="hidden_type"]').value;
        const content = modal.querySelector('input[name="hidden_content"]').value;
        const title = modal.querySelector('input[name="hidden_title"]').value;

        const target = document.querySelector('tbody').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`);
        const list_target = document.querySelector('#list').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`);

        target.remove();
        list_target.remove();

        alert("삭제되었습니다.");
        modal.style.display = "none";
    }

    saveModifyModal = (e) => {
        const modal = e.target.parentNode.parentNode;

        const title_val = modal.querySelector('input[name="title"]').value;
        const content_val = modal.querySelector('textarea[name="content"]').value;
        const type_val = modal.querySelector('select[name="type"]').value;

        const idx = modal.querySelector('input[name="idx"]').value;
        const cidx = modal.querySelector('input[name="cidx"]').value;
        const type = modal.querySelector('input[name="hidden_type"]').value;
        const content = modal.querySelector('input[name="hidden_content"]').value;
        const title = modal.querySelector('input[name="hidden_title"]').value;

        const target = document.querySelector('tbody').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`);
        const list_target = document.querySelector('#list').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`);

        target.textContent = title_val;
        target.setAttribute('data-content', content_val);
        target.setAttribute('data-type', type_val);
        target.setAttribute('data-title', title_val);
        target.setAttribute('class', 'todo_item '+type_val);

        const list_input = document.createElement('input');
        list_target.textContent = title_val;
        list_target.setAttribute('data-content', content_val);
        list_target.setAttribute('data-type', type_val);
        list_target.setAttribute('data-title', title_val);
        list_target.setAttribute('class', 'todo_item '+type_val);
        list_input.setAttribute('type', 'radio');
        list_input.setAttribute('name', 'todo');
        list_target.prepend(list_input);

        alert("저장되었습니다.");
        modal.style.display = "none";
    }

    modalDisable = () => {
        document.getElementById("modal").style.display = "none";
        document.getElementById("modifyModal").style.display = "none";
    }

    deleteListItem = (e) => {
        let target = e.target;

        if (target.tagName == "INPUT") {
            target = target.parentNode;
        }

        const cidx = target.getAttribute('c-idx');
        const idx = target.getAttribute('idx');
        const type = target.getAttribute('data-type');
        const content = target.getAttribute('data-content');
        const title = target.getAttribute('data-title');

        alert("삭제되었습니다.")

        document.querySelector('#list').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`).remove();
        document.querySelector('tbody').querySelector(`.todo_item[c-idx="${cidx}"][idx="${idx}"][data-type="${type}"][data-content="${content}"][data-title="${title}"]`).remove();
    }
}

new App();