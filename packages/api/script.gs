var responsePrefix = '\n\n\nChat GPT:'

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Nuno GPT')
      .addItem('Buscar dados astrológicos', 'getAstrologicData')
      .addItem('Conversar com ChatGPT', 'insertTextInDoc')
      .addItem('Exportar saídas GPT', 'exportGPTContent')
      .addToUi();
}

function getAstrologicData() {
  var documento = DocumentApp.getActiveDocument();
  var ui = DocumentApp.getUi();
  
  var resultado = ui.prompt('Digite a data e hora:', ui.ButtonSet.OK_CANCEL);
  
  if (resultado.getSelectedButton() == ui.Button.OK) {
    var dataHora = resultado.getResponseText();
    
    var texto = ui.prompt('Digite um texto:', ui.ButtonSet.OK_CANCEL);
    
    if (texto.getSelectedButton() == ui.Button.OK) {
      var textoDigitado = texto.getResponseText();
      
      // Realize qualquer ação desejada com a data/hora e o texto inseridos
      documento.getBody().appendParagraph('Data e hora: ' + dataHora);
      documento.getBody().appendParagraph('Texto: ' + textoDigitado);
    }
  }
}
function exportGPTContent()
{
  var sourceDoc = DocumentApp.getActiveDocument();
  var paragraphs = sourceDoc.getBody().getParagraphs();
  var filteredParagraphs = paragraphs.filter(function(paragraph) {
    return paragraph.getText().includes('Chat GPT:');
  });
  var newDoc = DocumentApp.create(sourceDoc.getName() + ' (Respostas)');
  var newBody = newDoc.getBody();
  for (var i = 0; i < filteredParagraphs.length; i++) {
    Logger.log(filteredParagraphs[i].getText());
    newBody.appendParagraph(filteredParagraphs[i].getText().replace('\n\n\n', ''));
  }
  newDoc.saveAndClose();
  
  var ui = DocumentApp.getUi();
  ui.alert('O documento com as saídas foi criado com sucesso.', 'Acesse pelo link: ' + newDoc.getUrl(), ui.ButtonSet.OK);
}

function getPrompts()
{
  var sourceDoc = DocumentApp.getActiveDocument();
  var paragraphs = sourceDoc.getBody().getParagraphs();
  var prompts = []
  paragraphs.forEach(function(paragraph) {
    var content = paragraph.getText()
    var role = content.includes('Chat GPT:') ? 'assistant' : 'user'
    prompts.push({role: role, content: replaceGoogleContent(content)})
  });

  return prompts
}

function insertTextInDoc() {
  var doc = DocumentApp.getActiveDocument();
  // get selected content
  var prompts = getPrompts()
  Logger.log(prompts)

  // call chat gpt api
  var text = getGPTResponse(prompts);
  
  // append result on document
  var body = doc.getBody();
  body.appendParagraph(responsePrefix + text);
}

function getDocIdByName(name) {
  var files = DriveApp.getFilesByName(name);
  if (files.hasNext()) {
    return files.next().getId();
  } else {
    return null;
  }
}

function replaceGoogleContent(text)
{
  var data = text;
  var regex = /https:\/\/docs\.google\.com\/(document|spreadsheets)\/d\/([a-zA-Z0-9-_]+)/g;
  var link;

  while ((link = regex.exec(text)) !== null) {
    var type = link[1];
    var id = link[2];
    var content;

    if (type == 'document') {
      content = DocumentApp.openById(id).getBody().getText()
    }

    if (type == 'spreadsheets') {
      var sheet = SpreadsheetApp.openById(id).getActiveSheet();
      var range = sheet.getDataRange();
      var values = range.getValues();
      content = "";

      for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
          content += ';' + values[i][j] + "\t";
        }
        content += "\n";
      }
    }

    data = data.replace(link[0], `\"\"\"` + content + `\"\"\"`)
  }

  return data
}

function getGPTResponse(prompts) {
  var apiKey = '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';
  var endpoint = 'https://api.openai.com/v1';

  var data = { 
    model: "gpt-3.5-turbo",
    messages: prompts
  }

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data),
    'headers': { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
  };

  var response = UrlFetchApp.fetch(endpoint + '/chat/completions', options);
  var jsonResponse = JSON.parse(response.getContentText());
  var generatedText = jsonResponse.choices[0].message.content;

  return generatedText;
}