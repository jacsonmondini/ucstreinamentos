
/**
 * Nome da primitiva : createRole
 * Nome do dominio : platform
 * Nome do serviço : authorization
 * Nome do tenant : trn32043155
 **/

const axios = require("axios");// Aqui importamos a boblioteca instalada

exports.handler = async (event) => {
  
  let body = parseBody(event);
  let tokenSeniorX = event.headers['X-Senior-Token'];
  //let tokenSeniorX = 'Bearer cbbb4c0ed248d71778d2807f8658b85c';
  
  if(body.hasOwnProperty('description')){
    return sendRes(200, body);
  }else{
    let user = await obterDadosUser(tokenSeniorX);
    body.description = 'Papel criado por: ' + user.fullName;
    return sendRes(200, body);
  } 

};

const obterDadosUser = async (tokenSeniorX) => {
  
  //Variável que receberá o retorno da chamada
  let vResponse;
  
  let headerConfig = {
    headers: {
      "Authorization": tokenSeniorX
    }
  };
   
  //Realiza a chamada passando a URL e o cabeçalho
  try{
    vResponse = await axios.get('https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser', headerConfig);
    //Caso sucesso retorna o corpo da requisição
    return vResponse.data;
  } catch(e){
    //Caso ocorra erro para o usuário
    return sendRes(400, 'Erro ao realizar chamada HTTP');
  }
  
};


const parseBody = (event) => {
  return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};

const sendRes = (status, body) => {
  body.helloWorld = "Olá mundo!";
  
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };

  console.log(body);

  return response;
};
