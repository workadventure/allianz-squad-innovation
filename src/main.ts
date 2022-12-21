/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // Show configuration tile for editors only
    if (WA.player.tags.includes('editor')) {
        WA.room.showLayer('exitNorthConfig')
        WA.room.showLayer('exitSouthConfig')
    }

    // Exit popup
    WA.room.area.onEnter('waExit').subscribe(() => {
        currentPopup = WA.ui.openPopup("waExitPopup","Bureaux virtuels de WorkAdventure", [
            {
                label: 'Y aller',
                className: 'primary',
                callback: () => WA.nav.goToPage("https://play.staging.workadventu.re/@/tcm/workadventure/wa-village"),
            }
        ]);
    })

    WA.room.area.onLeave('waExit').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
