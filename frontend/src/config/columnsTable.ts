const columnsArea = [
    { name: "Nome", uid: "name" },
    { name: "Descrição", uid: "description" },
    { name: "Empresa", uid: "companyTradeName" },
    { name: "Ações", uid: "actions" },
];

const columnsCompany = [
    { name: "Nome fantasia", uid: "companyName" },
    { name: "CNPJ", uid: "cnpj" },
    { name: "Telefone", uid: "phone" },
    { name: "Andar / Sala", uid: "floor" },
    { name: "Ações", uid: "actions" },
];

const columnsDevice = [
    { name: "Nome", uid: "name" },
    { name: "Descrição", uid: "description" },
    { name: "Área", uid: "belongsArea" },
    { name: "Ações", uid: "actions" },
];

const columnsEmployee = [
    { name: "Nome", uid: "name" },
    { name: "CPF", uid: "cpf" },
    { name: "Empresa", uid: "company" },
    { name: "Departamento", uid: "department" },
    { name: "Ações", uid: "actions" },
];

const columnsVisitor = [
    { name: "Nome", uid: "name" },
    { name: "CPF", uid: "cpf" },
    { name: "Celular", uid: "mobile" },
    { name: "Ações", uid: "actions" },
];

const columnsBadge = [
    { name: "Code", uid: "code" },
    { name: "Nome", uid: "employee" },
    { name: "Tipo", uid: "type" },
    { name: "Validade", uid: "visit" },
    { name: "Status", uid: "active" },
    { name: "Ações", uid: "actions" },
];

export {
    columnsArea,
    columnsCompany,
    columnsDevice,
    columnsEmployee,
    columnsVisitor,
    columnsBadge
};