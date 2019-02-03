import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import * as utils from "tns-core-modules/utils/utils";
import {Database} from "../../providers/database/database";

@Component({
    selector: "links",
    moduleId: module.id,
    templateUrl: "./links.component.html",
})
export class LinksComponent implements OnInit {

    public urls: any;

    public constructor(private router: Router, private location: Location, private database: Database) {
        this.urls = [];
    }

    public ngOnInit() {
        this.location.subscribe(() => {
            this.urls = [];
            this.loadData();
        });
        this.loadData();
    }

    public createShrunkenUrl() {
        this.router.navigate(["shrink"]);
    }

    public launchUrl(url: string) {
        utils.openUrl(url);
    }

    private loadData() {
        this.urls = this.database.getDatabase().executeQuery("urls");
    }

}
