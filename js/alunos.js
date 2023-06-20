let inputNewAluno = document.querySelector('#inputNewAluno');
let btnAddAluno = document.querySelector('#btnAddAluno');
let listPresence = document.querySelector('#listPresence');
let editWindow = document.querySelector('#editWindow');
let editWindowBackground = document.querySelector('#editWindowBackground');
let btnCloseEditWindow = document.querySelector('#btnCloseEditWindow');
let btnUpate = document.querySelector('#btnUpate');
let idEditAluno = document.querySelector('#idEditAluno');
let inputNameEdit = document.querySelector('#inputNameEdit');

inputNewAluno.addEventListener('keypress', (e) => {
    if (e.keyCode == 13 && inputNewAluno.value.length == 0) {
        alert('Digite o nome do aluno!');
    } else {
        if (e.keyCode == 13 && inputNewAluno.value.length !== 0) {
            let aluno = {
                nome: inputNewAluno.value,
                id: generateId(),
            }
            addAluno(aluno);
        }
    }
});

btnAddAluno.addEventListener('click', (e) => {
    if (inputNewAluno.value.length == 0) {
        alert('Digite o nome do aluno!');
    } else {
        let aluno = {
            nome: inputNewAluno.value,
            id: generateId(),
        }
        addAluno(aluno);
    }
});

btnCloseEditWindow.addEventListener('click', (e) => {
    toggleEditWindow();
});

btnUpate.addEventListener('click', (e) => {
    e.preventDefault();

    let btnUpate = document.getElementById('btnUpate');

    let idAluno = btnUpate.getAttribute('attr-id');
       
    let aluno = {
        nome: inputNameEdit.value,
        id: idAluno,
    }

    let currentAluno = document.getElementById('' + idAluno + '');

    if(currentAluno) {
        let li = criateTagLi(aluno);
        listPresence.replaceChild(li, currentAluno);
    
        toggleEditWindow();
    } else {
        alert('Elemento HTML não encontrado!')
    }

});

function generateId() {
    return Math.floor(Math.random() * 3000);
}

function addAluno(aluno) {
    let li = criateTagLi(aluno);
    listPresence.appendChild(li);
    inputNewAluno.value = '';
}

function criateTagLi(aluno) {
    let li = document.createElement('li');
    li.id = aluno.id;

    let span = document.createElement('span');
    span.classList.add('textAluno');
    span.innerHTML = aluno.nome;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAction');
    btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEdit.setAttribute('title', 'Editar');
    btnEdit.setAttribute('onclick', 'toEdit(' + aluno.id + ')');

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btnAction');
    btnDelete.innerHTML = '<i class="fa fa-trash"></i>';
    btnDelete.setAttribute('title', 'Excluir');
    btnDelete.setAttribute('onclick', 'toDelete(' + aluno.id + ')');

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function toEdit(idAluno) {
    let li = document.getElementById('' + idAluno + '');
    if (li) {
        const btnUpate = document.getElementById('btnUpate');
        btnUpate.setAttribute('attr-id', idAluno);        
        inputNameEdit.value = li.innerText;
        toggleEditWindow();
    } else {
        alert('Elemento HTML não encontrado!')
    }
}

function toDelete(idAluno) {
    let confirmacao = window.confirm('Deseja realmente excluir o nome?');
    if (confirmacao) {
        let li = document.getElementById('' + idAluno + '');
        if (li) {
            listPresence.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!')
        }
    }
}

function toggleEditWindow() {
    editWindow.classList.toggle('open');
    editWindowBackground.classList.toggle('open');
}