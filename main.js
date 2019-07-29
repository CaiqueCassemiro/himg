const { app, BrowserWindow, ipcMain, Menu} = require('electron');
const templateGenerator = require('./template');

app.on('ready', () => {  

  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });
  
  //Cria MenuAplication
  let templateMenu = templateGenerator.applicationMenuTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);
  

  //Carrega a URl
  mainWindow.loadURL('https://gmail.com/mail/help/intl/pt_pt/about.html');

});

//Quando fecharmos a tela essa função finaliza a aplicacao no SO
app.on('window-all-closed', () => {
  app.quit();
});

//Cria janela de sobre
let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () =>{
  
  //se a janela ja estiver instanciada ela nao instancia novamente, evitando uma instancia por janela
  if(sobreWindow == null){
    
    sobreWindow = new BrowserWindow({
      width:300,
      height:220,
      alwaysOnTop: true, //Sempre em primeiro plano
      frame: true //mantem o minimizar, max e fechar
    });  

    //Quando fechamos a janela, o electron exclui o objeto, nesse caso precisamos criar o objeto vazio novamente para que se clicarmos novamente, ele possa ser renderizado
    sobreWindow.on('closed', ()=>{
      sobreWindow = null;
    });

  }
  
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);

});


ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});

