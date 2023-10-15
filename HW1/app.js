class App {
    constructor() {
        this.addEvent();
    }

    addEvent() {
        document.querySelector('#makeJournalBtn').addEventListener('click', (e) => {
            this.makeJournal(e);
        });
    }

    makeJournal(e) {
        console.log(e)
    }
}

new App();