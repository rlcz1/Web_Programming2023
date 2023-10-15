class App {
    constructor() {
        this.addEvent();
    }

    addEvent() {
        document.querySelector('#makeJournalBtn').addEventListener('click', () => {
            this.makeJournal();
            this.makeList();
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
                td.setAttribute("idx", i + j);
                tr.appendChild(td);
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
}

new App();