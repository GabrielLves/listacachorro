document.getElementById('addDogBtn').onclick = function () {
    document.getElementById('modal').style.display = 'block';
};

document.querySelector('.close').onclick = function () {
    document.getElementById('modal').style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

document.getElementById('addDogForm').onsubmit = function (event) {
    event.preventDefault();
    const dogName = document.getElementById('dogName').value;
    const ownerName = document.getElementById('ownerName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const imageURL = document.getElementById('imageURL').value;

    // Se um cachorro está sendo editado, atualiza a tabela
    if (editingRow) {
        editingRow.cells[1].textContent = dogName;
        editingRow.cells[2].textContent = ownerName;
        editingRow.cells[3].textContent = phone;
        editingRow.cells[4].textContent = email;
        editingRow.cells[0].querySelector('img').src = imageURL;
    } else {
        addDogToTable({ dogName, ownerName, phone, email, imageURL });
    }

    document.getElementById('addDogForm').reset();
    document.getElementById('modal').style.display = 'none';
    editingRow = null; // Reset the editingRow after submission
};

let editingRow = null;

function addDogToTable(dog) {
    const table = document.getElementById('dogTable').querySelector('tbody');
    const row = table.insertRow();
    row.innerHTML = `
        <td><img src="${dog.imageURL || 'https://placedog.net/50'}" alt="${dog.dogName}"></td>
        <td>${dog.dogName}</td>
        <td>${dog.ownerName}</td>
        <td>${dog.phone}</td>
        <td>${dog.email}</td>
        <td>
            <button onclick="editDog(this)">Editar</button>
            <button onclick="deleteDog(this)">Excluir</button>
        </td>
    `;
}

function editDog(button) {
    const row = button.parentElement.parentElement;
    editingRow = row; // Store the row to update later

    const dogName = row.cells[1].innerText;
    const ownerName = row.cells[2].innerText;
    const phone = row.cells[3].innerText;
    const email = row.cells[4].innerText;
    const imageURL = row.cells[0].querySelector('img').src;

    document.getElementById('dogName').value = dogName;
    document.getElementById('ownerName').value = ownerName;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;
    document.getElementById('imageURL').value = imageURL;

    document.getElementById('modal').style.display = 'block';
}

function deleteDog(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

window.onload = function () {
    fetch('https://run.mocky.io/v3/9189caf3-293c-44e9-942f-03964dad1a53')
        .then(response => response.json())
        .then(data => {
            data.forEach(dog => {
                addDogToTable({
                    dogName: dog.cachorro,
                    ownerName: dog.dono,
                    phone: dog.telefone,
                    email: dog.email,
                    imageURL: dog.imagem
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados da API:', error);
        });
};
