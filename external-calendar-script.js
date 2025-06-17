(function () {
    const popupDocument = window.document;

    if (!popupDocument.body) {
        console.error('Popup document body is missing.');
        return;
    }

    // Generate a simple calendar
    function generateCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarTable = popupDocument.createElement('table');
        calendarTable.style.borderCollapse = 'collapse';
        calendarTable.style.width = '90%';
        calendarTable.style.margin = '20px auto';
        calendarTable.style.fontFamily = 'Arial, sans-serif';
        calendarTable.style.border = '1px solid #ddd';

        const caption = popupDocument.createElement('caption');
        caption.textContent = `${monthNames[month]} ${year}`;
        caption.style.fontSize = '20px';
        caption.style.marginBottom = '10px';
        caption.style.fontWeight = 'bold';
        calendarTable.appendChild(caption);

        const headerRow = popupDocument.createElement('tr');
        daysOfWeek.forEach((day) => {
            const th = popupDocument.createElement('th');
            th.textContent = day;
            th.style.border = '1px solid #ddd';
            th.style.padding = '10px';
            th.style.backgroundColor = '#f4f4f4';
            headerRow.appendChild(th);
        });
        calendarTable.appendChild(headerRow);

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = popupDocument.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = popupDocument.createElement('td');
                cell.style.border = '1px solid #ddd';
                cell.style.textAlign = 'center';
                cell.style.padding = '10px';

                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    cell.textContent = '';
                } else {
                    cell.textContent = date;
                    if (date === today.getDate()) {
                        cell.style.backgroundColor = '#007bff';
                        cell.style.color = '#fff';
                        cell.style.borderRadius = '50%';
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarTable.appendChild(row);

            if (date > daysInMonth) break;
        }

        return calendarTable;
    }

    const calendar = generateCalendar();
    popupDocument.body.appendChild(calendar);
})();
