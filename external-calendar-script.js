(function () {
    console.log('Script started executing in the popup window.');

    // Ensure the script runs in the popup window context
    const popupDocument = window.document;

    if (!popupDocument.body) {
        console.error('Popup document body not found.');
        return;
    }

    console.log('Popup document ready.');

    // Generate a simple calendar for the current month
    function generateCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const table = popupDocument.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.maxWidth = '300px';
        table.style.margin = '20px auto';
        table.style.border = '1px solid #ddd';
        table.style.fontFamily = 'Arial, sans-serif';

        const caption = popupDocument.createElement('caption');
        caption.textContent = `${monthNames[month]} ${year}`;
        caption.style.fontSize = '20px';
        caption.style.margin = '10px auto';
        caption.style.fontWeight = 'bold';
        table.appendChild(caption);

        const headerRow = popupDocument.createElement('tr');
        daysInWeek.forEach((day) => {
            const th = popupDocument.createElement('th');
            th.textContent = day;
            th.style.border = '1px solid #ddd';
            th.style.padding = '10px';
            th.style.backgroundColor = '#f4f4f4';
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = popupDocument.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = popupDocument.createElement('td');
                cell.style.border = '1px solid #ddd';
                cell.style.textAlign = 'center';
                cell.style.padding = '8px';

                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > lastDate) {
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
            table.appendChild(row);
            if (date > lastDate) break;
        }

        return table;
    }

    const calendar = generateCalendar();
    popupDocument.body.appendChild(calendar);

    console.log('Calendar added to popup document.');
})();
