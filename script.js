imageList = [
    
    "images/environnement/env-01.svg",
    "images/environnement/env-02.svg",
    "images/environnement/env-03.svg"
]

imageLetterList = [
    "images/letters/dbm-01.svg",
    "images/letters/dbm-02.svg",
    "images/letters/dbm-03.svg"
]

time = 0;
counter = 0;

letter_found = 0;

class Element {
    constructor(_xTemp,_yTemp,_imagesList,_imageIndex,_class) {

        var imageLink = "";

        this.div_id = _imageIndex;
        
        imageLink = _imagesList[_imageIndex]

        this.element = document.createElement("img");
        this.element.src = imageLink;
        this.element.classList.add(_class)
        this.element.id = counter;
        counter ++;

        container.appendChild(this.element);

        this.x = _xTemp;
        this.y = _yTemp;
        this.z = 0;
        this.size = (Math.random()+0.4);

        this.clicked = false;
        this.element.addEventListener("click", this.click.bind(this), false);
        this.element.addEventListener("mouseover", this.over.bind(this), false);
        this.element.addEventListener("mouseout", this.out.bind(this), false);
        this.element.addEventListener('transitionend', this.transitionend.bind(this), false);
    }
    click() {}
    transitionend(){}
    over() {}
    out() {}
    update() {}
}

class Letter extends Element {
    constructor(_xTemp,_yTemp,_imagesList,_imageIndex,_class) {
        super(_xTemp,_yTemp,_imagesList,_imageIndex,_class);
    }
    click() {
        var box = document.getElementById('box-'+this.div_id)
       
        
        
        if (!this.clicked) {
            letter_found += 1 
            this.clicked = true;
            this.element.style.transform = "rotate(360deg) scale(0.7)"
            this.x = box.offsetLeft;
            this.y = box.offsetTop;
            this.update();
        }
        
        
    }
    transitionend(){
        var box = document.getElementById('box-'+this.div_id)
       
        box.appendChild(this.element);
        this.element.style = "position: static; transition: all 0.5s;"
        if (letter_found >= 3) {
            document.getElementById("game-container").style.opacity = 0
            document.getElementById("letters").classList.add("end");
            document.getElementById("losange").classList.add("active");
            
        }
    }
    over() {}
    out() {}
    update() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}

class Forest extends Element {
    constructor(_xTemp,_yTemp,_imagesList,_imageIndex,_class) {
        super(_xTemp,_yTemp,_imagesList,_imageIndex,_class);
    }
    click() {
        this.element.style.transform = this.x += 20;
        this.element.style.animation = "0.2s jump";
        this.update();
    }
    over() {
       this.element.style.animation = "0.2s shake ";
    }
    out() {
        this.element.style.animation = "";
    }
    update() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.zIndex = Math.floor(this.y);
    }
}

var container = document.getElementById('game-container');
var screenWidth = container.offsetWidth
var screenHeight = container.offsetHeight 

var spaceWidth = screenWidth/7
var spaceHeight = screenHeight/7

for (var i = spaceWidth; i<screenWidth - spaceWidth; i+=spaceWidth ) {
    for (var j = spaceHeight ; j<screenHeight - spaceHeight; j+=spaceHeight) {
    var x = i + Math.random() * spaceWidth/2;
    var y = j + Math.random() * spaceHeight/2;
    var image = Math.floor(Math.random()*imageLetterList.length);
    var test = new Forest(x,y,imageList,image,"env");
    test.update();
    }
}

for (var i = 0 ; i<imageLetterList.length ; i++) {
    var x = spaceWidth  + Math.random()*(screenWidth - spaceWidth*2) ;
    var y = spaceHeight + Math.random()*(screenHeight - spaceHeight*2);
    var test = new Letter(x, y,imageLetterList,i,"letter");
    test.div_id = i+1;
    test.update();
}