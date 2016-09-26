


function guid() {
    return Math.floor((Math.random() * 100000) + 1);
}

$(document).ready(function () {
    //carrega no inicio

    load();
});

function load() {

    var lstContacts = []
    //se local storage vazio adiciona contatos exemplo
    if (localStorage.length == 0) {
        lstContacts = [
            { 'id': '' + guid() + '', 'nome': 'Lucas ', 'email': 'lucas.fernandes@forlogic.net', 'telefone': '43 96658960', 'sexo': '1', 'endereco': 'Rua dos Expedicionários, nº 312', 'obs': '', 'fav': '0' },
            { 'id': '' + guid() + '', 'nome': 'Teste', 'email': 'teste@forlogic.net', 'telefone': '123456', 'sexo': '3', 'endereco': 'end', 'obs': 'esta é uma observação', 'fav': '1' },
            { 'id': '' + guid() + '', 'nome': 'Test2', 'email': 'test@exemplo.com', 'telefone': '123456', 'sexo': '2', 'endereco': 'end', 'obs': '', 'fav': '0' },
        ];

    } else {
        //pega valores ja armazenados no localstorage
        lstContacts = JSON.parse(localStorage.getItem('lstContacts'));

    }
    //preenche a tabela chamando addTabela
    for (var i = 0; i < lstContacts.length; i++) {
        addTabela(lstContacts[i]);
    }
    updateStorage(lstContacts);
}


function addTabela(contact) {
    //cria a linha e chama coloca os valores
    var newRow = $("<tr>");
    var cols = "";
    cols += '<td>';
    cols += contact['nome'] + '';
    cols += '</td>';
    cols += '<td>';
    cols += contact['email'] + '';
    cols += '</td>';
    cols += '<td>';
    cols += contact['telefone'] + '';
    cols += '</td>';
    cols += '<td>';
    cols += '<button type="button" class="btn btn-info" onclick="mostraModal(1, ' + contact['id'] + ')" data-toggle="modal" data-target="#myModal" tittle="Editar"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button> <button class="btn btn-danger" onclick="removeRow(this, ' + contact['id'] + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></button> <button class="btn btn-default" onclick="mostraModal(2, ' + contact['id'] + ')" data-toggle="modal" data-target="#myModal"><i class="fa fa-eye" aria-hidden="true"></i></button>  <button type="button" class="btn btn-default"  "><i onclick="setMark(this, ' + contact['id'] + ')"  class="' + (contact['fav'] == '0' ? 'fa fa-heart-o' : 'fa fa-heart') + ' " aria-hidden="true"></i></button> <button type="button" class="btn btn-default"  ><i class="' + (contact['obs'] == '' ? 'fa fa-commenting-o' : 'fa fa-commenting') + ' " aria-hidden="true"></i></button>';


    cols += '</td>';
    newRow.append(cols);
    $('#contacts-table').append(newRow);
    //updateStorage(contact);

    //localStorage.setItem(contact.id, JSON.stringify(contact));
}

function removeRow(row, id) {
    if (!confirm('Você quer realmente apagar este registro?\nEssa operação não poderá ser desfeita. '))
        return;

    var tr = $(row).closest('tr');
    tr.fadeOut(500, function () {
        tr.remove();
    });

    //remove from localStorage
    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    var i = 0;
    //procura o id no array
    for (i = 0; i < lstContacts.length; i++) {
        if (lstContacts[i].id == id)
            break;
    }
    lstContacts.splice(i, 1);
    localStorage.setItem('lstContacts', JSON.stringify(lstContacts));
}

function viewContact(contact_id) {

    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    var i = 0;
    for (i = 0; i < lstContacts.length; i++) {
        if (lstContacts[i].id == contact_id)
            break;
    }

    $('#nome').val(lstContacts[i].nome).prop('readonly', true);
    $('#email').val(lstContacts[i].email).prop('readonly', true);
    $('#telefone').val(lstContacts[i].telefone).prop('readonly', true);
    $('#sexo').val(lstContacts[i].sexo).prop('readonly', true);
    $('#endereco').val(lstContacts[i].endereco).prop('readonly', true);
    $('#obs').val(lstContacts[i].obs).prop('readonly', true);
    $('#salvar').hide();

    return false;

}

function mostraModal(op, contact_id) {
    limpaForm();

    if (contact_id != null && op == 1) {
        editContact(contact_id);
    }else if (contact_id != null && op == 2) {
        viewContact(contact_id);
    }
}

function limpaForm() {
    $('input').val('').prop('readonly', false);
    $('textarea').val('').prop('readonly', false);
    $('#salvar').show();

}

function saveContact() {

    var valida = validateForm();
    if (valida == false)
        return;

    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    if (lstContacts == null)
        lstContacts = [];
    lstContacts.push(
        {
            'id': '' + guid() + '', 'nome': '' + $('#nome').val() + '', 'email': '' + $('#email').val() + '', 'telefone': '' + $('#telefone').val() + '', 'sexo': '1', 'endereco': '' + $('#endereco').val() + '', 'obs': '' + $('#obs').val() + '', 'fav': '0'
        }
    );
    addTabela(lstContacts[lstContacts.length - 1]);
    updateStorage(lstContacts);
    $('#myModal').modal('hide');
}


function updateStorage(lstContact) {
    //localStorage.clear();

    localStorage.setItem('lstContacts', JSON.stringify(lstContact));
}

function editContact(contact_id) {
    //mostraModal(contact_id);

    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    var i = 0;
    for (i = 0; i < lstContacts.length; i++) {
        if (lstContacts[i].id == contact_id)
            break;
    }


    $('#nome').val(lstContacts[i].nome);
    $('#email').val(lstContacts[i].email);
    $('#telefone').val(lstContacts[i]);
    $('#sexo').val(lstContacts[i].sexo);
    $('#endereco').val(lstContacts[i].endereco);
    $('#obs').val(lstContacts[i].obs);
    


}
function validateForm() {
    var nome = $('#nome').val();
    var email = $('#email').val();
    var telefone = $('#telefone').val();
    if (nome == '') {
        alert("Não é possível armazenar um Nome em branco\nPor favor digite um Nome");
        return false;
    } if (email == '' && telefone == '') {
        alert("Não é possível armazenar um Email e/ou Telefone em branco\nPor favor digite um Email e/ou Telefone");
        return false;
    }
}

function setMark(button, contact_id) {

    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    var i = 0;
    for (i = 0; i < lstContacts.length; i++) {
        if (lstContacts[i].id == contact_id)
            break;
    }
    //alert('ola');
    //var contact = JSON.parse(localStorage.getItem('lstContact'));
    var btnId = $(button);
    //var btnId = '#btnFav';
    if (lstContacts[i].fav == '1') {
        // alert('if')
        $(btnId).removeClass('fa fa-heart');
        $(btnId).addClass('fa fa-heart-o');
        lstContacts[i].fav = '0';
    } else if (lstContacts[i].fav == '0') {
        //alert('else')
        $(btnId).removeClass('fa fa-heart-o');
        $(btnId).addClass('fa fa-heart');
        lstContacts[i].fav = '1';
    }
    //alert('save')
    //localStorage.setItem(lstContacts['id'], JSON.stringify(lstContacts));
    updateStorage(lstContacts);
}
function exportarContato() {
    //var myWindow = window.open("", "MsgWindow");
    var lstContacts = JSON.parse(localStorage.getItem('lstContacts'));
    var i = 0;
    for (i = 0; i < lstContacts.length; i++) {
        $('#export').append('<br/>');
        $('#export').append('id: ' + lstContacts[i].id + ' | ');
        $('#export').append('Nome: ' + lstContacts[i].nome + ' | ');
        $('#export').append('Email: ' + lstContacts[i].email + ' | ');
        $('#export').append('Endereço: ' + lstContacts[i].endereco + ' | ');
        $('#export').append('Observações: ' + lstContacts[i].obs + ' | ');
        $('#export').append('<br/>');

        //window.document.write('' + lstContacts[i].nome + '');
            
    }
    $('#export').append('<br/>');
}
