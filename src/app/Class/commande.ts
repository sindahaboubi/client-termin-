export class Commande {
    constructor(public id: number,
        public idClient?:number,
        public idService?:number,
        public description?:string,
        public dateCommande?:Date){}
}
