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
    }

    modifyModal = (e) => {
        e.stopPropagation();

        const target = e.target;
        const cidx = target.getAttribute('c-idx');
        const idx = target.getAttribute('idx');

        const modal = document.getElementById('modifyModal');
        modal.style.display = "block";

        const modal_cidx = modal.querySelector('input[name="cidx"]');
        const modal_idx = modal.querySelector('input[name="idx"]');

        modal_cidx.value = cidx;
        modal_idx.value = idx;

        const title = modal.querySelector('input[name="title"]');
        const content = modal.querySelector('textarea[name="content"]');
        const type = modal.querySelector('select[name="type"]');

        const tbody = document.querySelector('tbody');
        const td = tbody.querySelector(`td[c-idx="${cidx}"][idx="${idx}"]`);
        const div = td.querySelector('div');
        title.value = div.textContent;
        content.value = div.getAttribute('data-content');
        type.value = div.getAttribute('data-type');

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

        const target = document.querySelector(`td div[c-idx="${cidx}"][idx="${idx}"]`);
        const list_target = document.querySelector(`#list div[c-idx="${cidx}"][idx="${idx}"]`);

        target.remove();
        list_target.remove();

        alert("삭제되었습니다.");
        modal.style.display = "none";
    }

    saveModifyModal = (e) => {
        const modal = e.target.parentNode.parentNode;

        const title = modal.querySelector('input[name="title"]').value;
        const content = modal.querySelector('textarea[name="content"]').value;
        const type = modal.querySelector('select[name="type"]').value;

        const idx = modal.querySelector('input[name="idx"]').value;
        const cidx = modal.querySelector('input[name="cidx"]').value;

        const target = document.querySelector(`td div[c-idx="${cidx}"][idx="${idx}"]`);
        const list_target = document.querySelector(`#list div[c-idx="${cidx}"][idx="${idx}"]`);
        target.textContent = title;
        target.setAttribute('data-content', content);
        target.setAttribute('data-type', type);
        target.setAttribute('class', 'todo_item '+type);

        const list_input = document.createElement('input');
        list_target.textContent = title;
        list_target.setAttribute('data-content', content);
        list_target.setAttribute('data-type', type);
        list_target.setAttribute('class', 'todo_item '+type);
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
}

new App();