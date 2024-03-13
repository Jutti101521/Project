document.addEventListener('DOMContentLoaded', function() {

    // convert today's date in to string then split on letter 'T', grab index 0 of the array
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').min = today;

    class Appointment {
        constructor(name, date, status) {
            this.appointments = [{name: 'Juan dela Cruz', date: '2024-06-03', status: 'Pending'}];
        }

        // get all appointments, create elements for row color and button id
        getAllAppointments = () => {
            const table = document.getElementById('appointment-table');
            
            this.appointments.forEach(appt => {                
                const row = document.createElement('tr');

                Object.values(appt).forEach((val, index) => {
                    const cell = document.createElement('td');
                    cell.textContent = val;

                    if (val == 'Pending'){
                        row.style.backgroundColor = 'orange';
                    } else if (val == 'Approved') {
                        row.style.backgroundColor = 'green'
                    };

                    row.appendChild(cell);                    

                    if (index === 2) {
                        const buttonCell = document.createElement('td');
                        const newButton = document.createElement('button');

                        newButton.textContent = 'Remove';
                        newButton.classList.add('remove-button');
                        buttonCell.appendChild(newButton);
                        row.appendChild(buttonCell);
                        
                        // added remove button eventlistener so that when uuser clicks it, removeAppointment() will be called
                        // newButton.addEventListener('click', () => {
                        //     this.removeAppointment(row);
                        // });
                    }
                });            
                table.appendChild(row);                
            });
        }

        // adds a new appointment
        addAppointment = (name, date, status) => {
            this.appointments = [...this.appointments, {name, date, status}];
            // this.notes = [...this.notes, {title, message}];
        }

        // removes an appointment
        removeAppointment = (row) => {
            
            this.appointments = this.appointments.filter(x => name !== x.name);
            // this.notes = this.notes.filter(object => title !== object.title);

            const rowIndex = row.rowIndex;
            this.appointments.splice(rowIndex - 1, 1);
            row.parentNode.removeChild(row);
        }
    }    
    
    const form = document.getElementsByClassName('form-input')[0];
    const appointment = new Appointment(); 
    const buttonAdd = document.getElementsByClassName('btnAdd')[0];
    const buttonRemove = document.getElementsByClassName('remove-button')[0];

    appointment.getAllAppointments();

    if (form.checkValidity()){
        buttonAdd.addEventListener('click', (event) => {
            event.preventDefault();

            const newName = document.getElementsByClassName('employee-name')[0];
            const newDate = document.getElementsByClassName('appointment-date')[0];
            const newStatus = document.getElementById('status');
            const selectedStatus = newStatus.options[newStatus.selectedIndex].text;

            clearTable(); // clear table so there won't be duplicate rows
            appointment.addAppointment(newName.value, newDate.value, selectedStatus);
            appointment.getAllAppointments();

            // checking if correct status value was grabbed
            console.log(selectedStatus);
        });
    }

    // refresh table
    const clearTable = () => {
        // Get a reference to the table body
        let tbody = document.querySelector("#appointment-table");
    
        // Get all rows in the table body
        let rows = tbody.querySelectorAll("tr");
    
        // Remove all rows except the first one (header row)
        for (let i = 1; i < rows.length; i++) {
            tbody.removeChild(rows[i]);
        }
    }    
});