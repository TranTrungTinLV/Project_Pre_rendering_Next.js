export async function getAlllEvents() {
    const response = await fetch('https://fetching-data-project-time-default-rtdb.firebaseio.com/evnents.json')
    const data = await response.json();
    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key], //dúng toán tử ba chấm nhầm để sao chép dữ liệu vào mảng

        })
    }
    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAlllEvents();
    return allEvents.filter((event) => event.isFeatured);
}


export async function getEventById(id) {
    const allEvents = await getAlllEvents();
    return allEvents.find((event) => event.id === id);
}


export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    
    const allEvents = await getAlllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}