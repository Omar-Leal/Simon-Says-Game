const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const $btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 3;
let score = 10;







// Constructor del juego
// Call to the functioncs 
class juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this);
        this.inicializar()
        this.generarSecuencia()
        this.nextLevel()
    }

    inicializar(){
        
        this.selectColor = this.selectColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.toggleRestart()        
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleRestart(){
        if($btnEmpezar.classList.contains('hide')){
            $btnEmpezar.classList.remove('hide');
        }else{
            $btnEmpezar.classList.add('hide');
        }
    }
    
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n  => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.subnivel = 0;
        this.iluminarSecuencia()
        this.eventosClicks()
    }

    converNumToColor(numero){
        switch(numero){
            case 0: 
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }

    }

    converColorToNum(color){
        switch(color){
            case 'celeste': 
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }

    }


    iluminarSecuencia(){
       for(let i = 0; i < this.nivel; i++){
            const color = this.converNumToColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i);
       }   
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    eventosClicks(){
        this.colores.celeste.addEventListener('click', this.selectColor);
        this.colores.violeta.addEventListener('click', this.selectColor);
        this.colores.naranja.addEventListener('click', this.selectColor);
        this.colores.verde.addEventListener('click', this.selectColor);
    }

    deleteClicks(){
        this.colores.celeste.removeEventListener('click', this.selectColor);
        this.colores.violeta.removeEventListener('click', this.selectColor);
        this.colores.naranja.removeEventListener('click', this.selectColor);
        this.colores.verde.removeEventListener('click', this.selectColor);
    }

    selectColor(ev){
        
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.converColorToNum(nombreColor);
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            if(this.subnivel === this.nivel){
                this.nivel++
                this.deleteClicks();

                  if(this.nivel === (ULTIMO_NIVEL + 1)){
                        this.ganoElJuego();
                  }  else{
                      setTimeout(this.nextLevel, 1500)
                  }

            }

        }else{
            this.perdioELJuego();
        }

       


    }


    ganoElJuego(){
        swal("Good job!", "You've won! :D", "success")
            .then(this.inicializar)
            score = score + 5;
            

    }

    perdioELJuego(){
        swal("Sorry..", "You've lost the game :( ", "error")
            .then(()  => {
                this.deleteClicks();
                this.inicializar();
            })
            score = score - 5;
            
    }

}



function empezarJuego() {
    window.clickStar = new juego;
}