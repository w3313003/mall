class A {
    name: number;
    constructor(){
        this.name = 5;
    }
}

class B extends A {
    constructor() {
        super();
    }
}

let b = new B; 