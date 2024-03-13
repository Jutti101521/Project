document.addEventListener('DOMContentLoaded', function() {

    // convert today's date in to string then split on letter 'T', grab index 0 of the array
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').min = today;
    
    document.getElementById('employee-name').value='';

    class Appointment {
        constructor(name, date, status) {
            this.appointments = [{name: 'Juan dela Cruz', date: '2024-06-03', status: 'Pending'}];
        }

        // get all appointments, create elements for row color and button id
        getAllAppointments = () => { 
            const table = document.getElementById('appointment-table');
            
            this.appointments.forEach(appt => {
                // since we will add a new name, then we should create a new row in the table 'appointment-table'
                const row = document.createElement('tr');
                
                // after reading, discovered that Object.values can get only the values without the index, and place them in a new array.  
                // this helps in shortening code that reads value of status w/c depends on what color the row will be
                Object.values(appt).forEach((val, index) => {

                    // create a new cell. one for each value(val) of appt
                    const cell = document.createElement('td');
                    cell.textContent = val;

                    // colors the row depending on what value was selected by user
                    if (val === 'Pending'){
                        row.style.backgroundColor = 'orange';
                    } else if (val === 'Approved') {
                        row.style.backgroundColor = 'green'
                    };

                    row.appendChild(cell);                    
                    
                    // index was declared above as the index of appt. as the array iterates through it's indexes, when it's equals to 2
                    // then we should be on cell/column 3.  add a new cell (4th) for the new button and create new button, it's elements 
                    // and it's corresponding properties/style/etc.
                    if (index === 2) {
                        const buttonCell = document.createElement('td');
                        const newButton = document.createElement('button');

                        newButton.textContent = 'Remove';
                        newButton.classList.add('remove-button');
                        buttonCell.appendChild(newButton);
                        row.appendChild(buttonCell);
                        
                        // added remove button eventlistener so that when uuser clicks it, removeAppointment() will be called
                        newButton.addEventListener('click', () => {
                            this.removeAppointment(row);
                        });
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
            // did not use this because this only filters out the index value that is not true to the arguement
            // this.appoinments = this.notes.filter(object => title !== object.title);
            const rowIndex = row.rowIndex;
    
            // used this to completely remove the appointment from the array.  
            // .splice() will get the row index of the remove button that was clicked, -1 on that index and then deletecount of 1
            this.appointments.splice(rowIndex - 1, 1);            
            
            const table = row.closest('table');
            console.log (table);
            
            // this removes the row from the table
            if (table) {
                table.deleteRow(rowIndex);
            }
        }
    }    
    
    const form = document.getElementsByClassName('form-input')[0];
    const appointment = new Appointment(); 
    const buttonAdd = document.getElementsByClassName('btnAdd')[0];

    appointment.getAllAppointments();

    buttonAdd.addEventListener('click', (event) => {
        if (form.checkValidity() === true) {
            event.preventDefault();

            const newName = document.getElementsByClassName('employee-name')[0];
            const newDate = document.getElementsByClassName('appointment-date')[0];
            
            const newStatus = document.getElementById('status');
            const selectedStatus = newStatus.options[newStatus.selectedIndex].text;

            clearTable(); // clear table so there won't be duplicate rows
            appointment.addAppointment(newName.value, newDate.value, selectedStatus);
            appointment.getAllAppointments();

            // checking if correct status value was grabbed
            console.log(newStatus.value);
            newName.value = '';
            newDate.value = 'mm/dd/yyyy';
            newName.focus();
        }
    });
    

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

