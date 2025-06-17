(function () {
    // Ensure the script runs in the popup window context
    const popupDocument = window.document;

    // Helper function: Generate a calendar for the current month
    function generateCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Get the first and last day of the month
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Create the table element
        const calendarTable = popupDocument.createElement('table');
        calendarTable.style.margin = '0 auto';
        calendarTable.style.borderCollapse = 'collapse';
        calendarTable.style.width = '100%';
        calendarTable.style.maxWidth = '300px';
        calendarTable.style.fontFamily = 'Arial, sans-serif';
        calendarTable.style.border = '1px solid #ddd';

        // Add the caption for the calendar (month and year)
        const caption = popupDocument.createElement('caption');
        caption.textContent = `${monthNames[month]} ${year}`;
        caption.style.fontSize = '20px';
        caption.style.margin = '10px';
        caption.style.fontWeight = 'bold';
        calendarTable.appendChild(caption);

        // Add the header row with days of the week
        const headerRow = popupDocument.createElement('tr');
        daysInWeek.forEach((day) => {
            const th = popupDocument.createElement('th');
            th.textContent = day;
            th.style.border = '1px solid #ddd';
            th.style.padding = '10px';
            th.style.backgroundColor = '#f4f4f4';
            th.style.fontWeight = 'bold';
            headerRow.appendChild(th);
        });
        calendarTable.appendChild(headerRow);

        // Generate table rows for the dates
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = popupDocument.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = popupDocument.createElement('td');
                cell.style.border = '1px solid #ddd';
                cell.style.textAlign = 'center';
                cell.style.padding = '10px';

                if (i === 0 && j < firstDay) {
                    // Empty cells before the first day of the month
                    cell.textContent = '';
                } else if (date > lastDate) {
                    // Empty cells after the last day of the month
                    cell.textContent = '';
                } else {
                    // Valid date cells
                    cell.textContent = date;
                    // Highlight today's date
                    if (date === today.getDate()) {
                        cell.style.backgroundColor = '#007bff';
                        cell.style.color = '#fff';
                        cell.style.border = '2px solid #0056b3';
                        cell.style.borderRadius = '5px';
                    }
                    date++;
                }
                row.appendChild(cell);
            }

            calendarTable.appendChild(row);

            // Stop if the last date is reached
            if (date > lastDate) break;
        }

        return calendarTable;
    }

    // Add the calendar under the existing content of the popup
    const mainContent = popupDocument.body;
    const calendar = generateCalendar();
    mainContent.appendChild(calendar);

    // Add some styling to the page
    mainContent.style.margin = '0';
    mainContent.style.padding = '20px';
    mainContent.style.fontFamily = 'Arial, sans-serif';
})();
