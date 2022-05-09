export class Signalement {
    constructor(public id:number,
        public idClient:number,
        public idService:number,
        public idCommentaire:number,
        public description:string) {}
}
