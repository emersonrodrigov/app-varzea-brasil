import { AngularFirestore } from 'angularfire2/firestore';


export class UtilService {



    constructor(public afs: AngularFirestore) {
        console.log('Init Util-Service');
    }

    getGenerateID(): string {
        let id = this.afs.createId();
        console.log('[UtilService] - ID documento gerado ', id);
        return id;
    }


}