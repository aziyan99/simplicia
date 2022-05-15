const mobileMenu = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
// mobile menu
mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle('-translate-x-full');
});
// click outside sidebar
content.addEventListener("click", (e) => {
    if (!sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.toggle('-translate-x-full');
    }
});

// toastr handler
function noticesHandler () {
    return {
        notices: [],
        visible: [],
        add (notice) {
            notice.id = Date.now()
            this.notices.push(notice)
            this.fire(notice.id)
        },
        fire (id) {
            this.visible.push(this.notices.find(notice => notice.id == id))
            const timeShown = 2000 * this.visible.length
            setTimeout(() => {
                this.remove(id)
            }, timeShown)
        },
        remove (id) {
            const notice = this.visible.find(notice => notice.id == id)
            const index = this.visible.indexOf(notice)
            this.visible.splice(index, 1)
        },
        getIcon (notice) {
            if (notice.type == 'success')
                return "<div class='text-green-500 rounded-full bg-white float-left' ><svg width='1.8em' height='1.8em' viewBox='0 0 16 16' class='bi bi-check' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'/></svg></div>";
            else if (notice.type == 'info')
                return "<div class='text-blue-500 rounded-full bg-white float-left'><svg width='1.8em' height='1.8em' viewBox='0 0 16 16' class='bi bi-info' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z'/><circle cx='8' cy='4.5' r='1'/></svg></div>";
            else if (notice.type == 'warning')
                return "<div class='text-orange-500 rounded-full bg-white float-left'><svg width='1.8em' height='1.8em' viewBox='0 0 16 16' class='bi bi-exclamation' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/></svg></div>";
            else if (notice.type == 'danger')
                return "<div class='text-red-500 rounded-full bg-white float-left'><svg width='1.8em' height='1.8em' viewBox='0 0 16 16' class='bi bi-x' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'/><path fill-rule='evenodd' d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'/></svg></div>";
        }
    };
}

// searchable select
function selectConfigs () {
    return {
        filter: '',
        show: false,
        selected: null,
        focusedOptionIndex: null,
        options: null,
        close () {
            this.show = false;
            this.filter = this.selectedName();
            this.focusedOptionIndex = this.selected ? this.focusedOptionIndex : null;
        },
        open () {
            this.show = true;
            this.filter = '';
        },
        toggle () {
            if (this.show) {
                this.close();
            }
            else {
                this.open()
            }
        },
        isOpen () { return this.show === true },
        selectedName () { return this.selected ? this.selected.name.first + ' ' + this.selected.name.last : this.filter; },
        classOption (id, index) {
            const isSelected = this.selected ? (id == this.selected.login.uuid) : false;
            const isFocused = (index == this.focusedOptionIndex);
            return {
                'cursor-pointer w-full border-gray-100 border-b hover:bg-blue-50': true,
                'bg-blue-100': isSelected,
                'bg-blue-50': isFocused
            };
        },
        fetchOptions () {
            fetch('https://randomuser.me/api/?results=500')
                .then(response => response.json())
                .then(data => this.options = data);
        },
        filteredOptions () {
            return this.options
                ? this.options.results.filter(option => {
                    return (option.name.first.toLowerCase().indexOf(this.filter) > -1)
                        || (option.name.last.toLowerCase().indexOf(this.filter) > -1)
                        || (option.email.toLowerCase().indexOf(this.filter) > -1)
                })
                : {}
        },
        onOptionClick (index) {
            this.focusedOptionIndex = index;
            this.selectOption();
        },
        selectOption () {
            if (!this.isOpen()) {
                return;
            }
            this.focusedOptionIndex = this.focusedOptionIndex ?? 0;
            const selected = this.filteredOptions()[this.focusedOptionIndex]
            if (this.selected && this.selected.login.uuid == selected.login.uuid) {
                this.filter = '';
                this.selected = null;
            }
            else {
                this.selected = selected;
                this.filter = this.selectedName();
            }
            this.close();
        },
        focusPrevOption () {
            if (!this.isOpen()) {
                return;
            }
            const optionsNum = Object.keys(this.filteredOptions()).length - 1;
            if (this.focusedOptionIndex > 0 && this.focusedOptionIndex <= optionsNum) {
                this.focusedOptionIndex--;
            }
            else if (this.focusedOptionIndex == 0) {
                this.focusedOptionIndex = optionsNum;
            }
        },
        focusNextOption () {
            const optionsNum = Object.keys(this.filteredOptions()).length - 1;
            if (!this.isOpen()) {
                this.open();
            }
            if (this.focusedOptionIndex == null || this.focusedOptionIndex == optionsNum) {
                this.focusedOptionIndex = 0;
            }
            else if (this.focusedOptionIndex >= 0 && this.focusedOptionIndex < optionsNum) {
                this.focusedOptionIndex++;
            }
        }
    }

}