import {Injectable} from "@angular/core";
import {Couchbase} from "nativescript-couchbase";

@Injectable()
export class Database {

    private isInstantiated: boolean;
    private db: any;

    public constructor() {
        if(!this.isInstantiated) {
            this.db = new Couchbase("tinyurl");
            this.db.createView("urls", "1", (document, emitter) => {
                if(document.type == "url") {
                    emitter.emit(document._id, document);
                }
            });
            this.isInstantiated = true;
        }
    }

    public getDatabase() {
        return this.db;
    }

}