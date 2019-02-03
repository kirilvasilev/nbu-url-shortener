import {Component} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";


import * as Toast from 'nativescript-toast';
import {Database} from "../../providers/database/database";

@Component({
    selector: "shrink",
    moduleId: module.id,
    templateUrl: "./shrink.component.html",

})
export class ShrinkComponent {

    public longUrl: string;
    private googleApiKey: string = "AIzaSyCR_nn0ycWnd-BifTdC4o_vwmOabRoBqYs";

    public constructor(private routerExtensions: RouterExtensions, private http: HttpClient, private database: Database) {
        this.longUrl = "";
    }

    public shrink() {
        if(this.longUrl) {
            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'
                })
              };

            this.http.post("https://www.googleapis.com/urlshortener/v1/url?key=" + this.googleApiKey, JSON.stringify({longUrl: this.longUrl}), httpOptions)
                .subscribe((result: any) => {
                    this.database.getDatabase().createDocument({
                        "type": "url",
                        "long": this.longUrl,
                        "short": result.id
                    });
                    this.routerExtensions.back();
                }, () => {
                    Toast.makeText("A valid long URL is required!").show();
                });
        } else {
            Toast.makeText("A valid long URL is required!").show();
        }
    }

}
