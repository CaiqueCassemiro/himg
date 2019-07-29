//Este modulo é reponsável por gerar todos os templates necessários
const { ipcMain } = require('electron');

module.exports = {
    //Gerando o template do menu principal
    applicationMenuTemplate(app){
        let templateMenu = [
            {
                label: 'view',
                submenu: [ 
                    { role: 'reload' } 
                    , { role: 'toggledevtools' } 
                ]
            },
            {
                label: 'Sobre',
                submenu : [
                    {
                        label: 'Sobre',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre')
                        },
                        accelerator: 'CommandOrControl + I'
                    }
                ]
            }
        ]
        
        //Se for Mac
        if(process.platform == 'darwin'){
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Sobre',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre')
                        },
                        accelerator: 'CommandOrControl + I'
                    }
                ]
            })
        }
        return templateMenu;
    }
}