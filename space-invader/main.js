document.addEventListener('DOMContentLoaded',() => {
    let width=15;
    let currentShooterIndex=202;
    let currentInvaderIndex=0;
    let direction=1;
    let alienInvadersTakeDown=[]
    let result=0;
    let invaderid;
    let resultDisplay;
    let isGameOver=false;
    document.getElementById('score').innerHTML="Score : " + result;
    const alienInvaders=[
        0,1,2,3,4,5,6,7,8,9
        ,15,16,17,18,19,
        20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]
    const squares =document.querySelectorAll(".grid div")
    sa=[...squares];
    sa.forEach(element => {
        element.addEventListener('click',mark)
    })
        function mark(e){
            var index=sa.indexOf(e.target);
            console.log(index)
            console.log(e.target)
        }

    alienInvaders.forEach((invader) => {
        squares[currentInvaderIndex+invader].classList.add("invader")   

    });
    squares[currentShooterIndex].classList.add("shooter")
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove("shooter")
        switch(e.keyCode){
            case 37:
                if(currentShooterIndex % width > 0 ){
                    currentShooterIndex-=1;
                }
                break;
            case 39:
                if(currentShooterIndex % width < width-1) currentShooterIndex+=1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown',moveShooter);

    function moveInvader(){
        const leftEdge=alienInvaders[0]%width ===0;
        const rightEdge=alienInvaders[alienInvaders.length-1] % width === width-1
        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction=width
        }else if(direction===width){
            if(leftEdge)
                direction=1
            else{
                direction=-1
            }
        }
        for(let i=0;i<alienInvaders.length;i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for(let i=0;i<alienInvaders.length;i++){
            alienInvaders[i]+=direction
        }
        for(let i=0;i<alienInvaders.length;i++){
            if(!alienInvadersTakeDown.includes(i))
                squares[alienInvaders[i]].classList.add('invader')
        }
        if(squares[currentShooterIndex].classList.contains('invader','shooter')){
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderid)
            document.getElementById('res').innerHTML="You LOST"
            isGameOver=true;
        }
        for(let i=0;i<alienInvaders.length;i++){
            if(alienInvaders[i]>squares.length-(width-1)){
                clearInterval(invaderid)
                document.getElementById('res').innerHTML="You LOST"
                isGameOver=true;
               
            }
        }
        if(result === 30){
            clearInterval(invaderid)
            isGameOver=true;    
            document.getElementById('res').innerHTML="You WON "
        }

    }
    
    function shoot(e){
        var laserId;
        let currentLaser=currentShooterIndex;
        function moveLaser(){
            squares[currentLaser].classList.remove('laser');
            currentLaser-=width;
            squares[currentLaser].classList.add('laser');
            if(squares[currentLaser].classList.contains('invader')){
                squares[currentLaser].classList.remove('laser');
                squares[currentLaser].classList.remove('invader');
                squares[currentLaser].classList.add('boom');
                setTimeout(()=> squares[currentLaser].classList.remove('boom'),250)
                clearInterval(laserId)
                const alienTakeDown=alienInvaders.indexOf(currentLaser);
                alienInvadersTakeDown.push(alienTakeDown);
                result++;
                document.getElementById('score').innerHTML="Score : " + result;
            }
            if(currentLaser<width+30){
                clearInterval(laserId)
                setTimeout(()=>squares[currentLaser].classList.remove('laser'),50)
            }

        }
        switch(e.keyCode){
            case 32:
                laserId=setInterval(moveLaser,100)
                break;
        }
        if(isGameOver){
            clearInterval(laserId);
        }
       
    }
    document.addEventListener('keyup',shoot);
    invaderid=setInterval(moveInvader,400);
    })

