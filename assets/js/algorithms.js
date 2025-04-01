
// 2 - Transforme a planilha (imagem) em JSON: 
// Criei um documento a parte, que está no diretório: ./assets/data

async function getTabledata() {
  const response = await fetch('./assets/data/table.json');
  const data = await response.json();
  return data.data;
}


// 2. 1 Crie um algoritmo para listar:
// -> Como não foi especificado o formato das saídas desejado,
//    todas as listagens estão em arrays e no próprio console 
//    (exceto a ordem por idade). Se necessário posso colocar a
//    saída no front e formatada, basta me mandar e-mail.
//
// -> criei um front apenas com botões para facilitar os testes,
//    rodei pelo xammp.

// 👉 Pessoa com ID = 2
//  O id é passado como parâmetro,
async function searchPersonByID(id) {
  let data = await getTabledata();

  let result = data.find(item => item.id == id);
  console.log(result);
}


// 👉 Listagem de pessoas em ordem crescente de idade com o número do CPF:
async function listPeopleSortingAge() {
  let data = await getTabledata();
  data.sort((a, b) => a.idade - b.idade);

  data.forEach(person => {
    let cpf = person.documentos.tipo === 'CPF' ?? "Não informado";
    console.log("Idade: " + person.idade + " - Nome: " + person.nome + " - CPF: " + cpf + "\n");
  });
}


// 👉 Pessoas com idade superior a 50 anos:
async function AgeOverFifty() {
  let data = await getTabledata();
  const overFifty = data.filter(person => person.idade > 50);
  console.log(overFifty);  
}


// 👉 Pessoas que não possuem CPF:
async function withoutCpf() {
  let data = await getTabledata();

  const withoutCpf = data.filter(person => 
    !person.documentos.some(doc => doc.tipo === "CPF")
  );
  console.log(withoutCpf);  
}


// 👉 Listagem de tipos de documentos:
async function documentTypes() {
  let data = await getTabledata();

  const documentTypes = [];

  data.forEach(person => {
    person.documentos.forEach(doc => {
      const existe = documentTypes.some(d => 
        d.tipo === doc.tipo && (doc.descricao ? d.descricao === doc.descricao : true)
      );
      
      if (!existe) { 
        documentTypes.push({ tipo: doc.tipo, descricao: doc.descricao || "Sem descrição" });
      }
    });
  });

  console.log(documentTypes);
}
