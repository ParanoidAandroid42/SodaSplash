
 window.onload = function () {

     let data = {action:"Load",targetCanvasName:"game-canvas",cdnPath:"",fpsMeter:false}
     new Dev.Controller.GameController(data);
     window.gameTarget = Core.Controller.DataController;
     window.addEventListener(Dev.Enum.DataListener.Message,(data)=>{
         if(data.data.action==Dev.Enum.DataListener.Load){
            new Dev.Controller.GameController(data);
            window.gameTarget = Core.Controller.DataController;
         }
     })
 }
 