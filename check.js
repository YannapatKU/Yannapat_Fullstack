const BASE_URL = 'http://localhost:2000';

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('on load');

    try {
        const response = await axios.get(`${BASE_URL}/tasking`);
        console.log(response.data);

        const INTDOM = document.getElementById('Check');
        let htmlData = '<div>';
        for (let i = 0; i < response.data.length; i++) {
            let INT = response.data[i];
            htmlData += `
                <div>
                    ${INT.id} ${INT.title} ${INT.description} ${INT.status} ${INT.due_date} ${INT.created_at}
                    <div class="buttons">
                        <a href='main.html?id=${INT.id}'><button>Edit</button></a>
                        <button class='delete' data-id='${INT.id}'>Delete</button>
                    </div>
                </div>
            `;
        }
        htmlData += '</div>';
        INTDOM.innerHTML = htmlData;

        const deleteDOMs = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMs.length; i++) {
            deleteDOMs[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                if (confirm('Are you sure to delete?')) {
                    try {
                        await axios.delete(`${BASE_URL}/tasking/${id}`);
                        loadData(); // Refresh task list after deletion
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
};
