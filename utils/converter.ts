import * as mume from "@shd101wyy/mume";
import {engineConfig} from './config'


async function main() {
    const myArgs = process.argv.slice(2);
    // await mume.init();
    let fp: string = '';
    let dp: string = '';
    switch (myArgs[0]) {
        case '-d':
            dp = myArgs[1].toString();
            break;
        case '-f':
            fp = myArgs[1].toString();
            break;
    }
    let engine;
    if (fp != '') {
        console.log(`Creating engine with fp ` + fp + " " + typeof fp);
        engine = new mume.MarkdownEngine({
            projectDirectoryPath: "",
            filePath: fp,
            config: engineConfig
        });
    } else if (dp != '') {
        console.log("Creating engine with dp, " + dp + " " + typeof dp);
        engine = new mume.MarkdownEngine({
            filePath: "",
            projectDirectoryPath: dp,
            config: engineConfig
        });
    } else {
        console.error("[ERROR] Please enter either -f filepath or -d dirpath");
        return;

    }
    await engine.htmlExport({offline: false, runAllCodeChunks: true});

}

main().then(_ => {
    console.log("Terminated");
});