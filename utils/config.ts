import { MarkdownEngineConfig } from "@shd101wyy/mume";
import { MathRenderingOption } from "@shd101wyy/mume/out/src/markdown-engine-config";

export class MarkdownPreviewEnhancedConfig implements MarkdownEngineConfig {
    public static getCurrentConfig() {
        return new MarkdownPreviewEnhancedConfig();
    }

    public readonly usePandocParser: boolean;
    public readonly breakOnSingleNewLine: boolean;
    public readonly enableTypographer: boolean;
    public readonly enableWikiLinkSyntax: boolean;
    public readonly enableLinkify: boolean;
    public readonly wikiLinkFileExtension: string;
    public readonly enableEmojiSyntax: boolean;
    public readonly enableExtendedTableSyntax: boolean;
    public readonly enableCriticMarkupSyntax: boolean;
    public readonly frontMatterRenderingOption: string;
    public readonly mathRenderingOption: MathRenderingOption;
    public readonly mathInlineDelimiters: string[][];
    public readonly mathBlockDelimiters: string[][];
    public readonly mathRenderingOnlineService: string;
    public readonly codeBlockTheme: string;
    public readonly mermaidTheme: string;
    public readonly previewTheme: string;
    public readonly revealjsTheme: string;
    public readonly protocolsWhiteList: string;
    public readonly imageFolderPath: string;
    public readonly imageUploader: string;
    public readonly printBackground: boolean;
    public readonly chromePath: string;
    public readonly imageMagickPath: string;
    public readonly pandocPath: string;
    public readonly pandocMarkdownFlavor: string;
    public readonly pandocArguments: string[];
    public readonly latexEngine: string;
    public readonly enableScriptExecution: boolean;
    public readonly enableHTML5Embed: boolean;
    public readonly HTML5EmbedUseImageSyntax: boolean;
    public readonly HTML5EmbedUseLinkSyntax: boolean;
    public readonly HTML5EmbedIsAllowedHttp: boolean;
    public readonly HTML5EmbedAudioAttributes: string;
    public readonly HTML5EmbedVideoAttributes: string;
    public readonly puppeteerWaitForTimeout: number;
    public readonly usePuppeteerCore: boolean;

    // preview config
    public readonly scrollSync: boolean;
    public readonly liveUpdate: boolean;
    public readonly singlePreview: boolean;
    public readonly automaticallyShowPreviewOfMarkdownBeingEdited: boolean;

    private constructor() {

        this.usePandocParser = false;
        this.breakOnSingleNewLine = true;
        this.enableTypographer = false;
        this.enableWikiLinkSyntax = true;
        this.enableLinkify = true;
        this.wikiLinkFileExtension = 'md';
        this.enableEmojiSyntax = true;
        this.enableExtendedTableSyntax = true;
        this.enableCriticMarkupSyntax = true;
        this.frontMatterRenderingOption = 'none';
        this.mermaidTheme = 'mermaid.dark.css';
        this.mathRenderingOption = 'KaTeX' as MathRenderingOption;
        this.mathInlineDelimiters = [["$", "$"], ["\\(", "\\)"]];
        this.mathBlockDelimiters = [["$$", "$$"], ["\\[", "\\]"]];
        this.mathRenderingOnlineService = "https://latex.codecogs.com/gif.latex";
        this.codeBlockTheme = 'auto.css';
        this.previewTheme = 'github-light.css';
        this.revealjsTheme = "night.css";
        this.protocolsWhiteList = "http://, https://, atom://, file://, mailto:, tel:";
        this.imageFolderPath = "../resources";
        // this.imageUploader = config.get<string>("imageUploader");
        this.printBackground = false;
        this.chromePath = '';
        this.imageMagickPath = '';
        this.pandocPath = 'pandoc';
        this.pandocMarkdownFlavor = "markdown-raw_tex+tex_math_single_backslash";
        this.pandocArguments = [];
        this.latexEngine = 'pdflatex';
        this.enableScriptExecution = true;

        // this.scrollSync = config.get<boolean>("scrollSync");
        // this.liveUpdate = config.get<boolean>("liveUpdate");
        // this.singlePreview = config.get<boolean>("singlePreview");
        // this.automaticallyShowPreviewOfMarkdownBeingEdited = config.get<boolean>(
        //     "automaticallyShowPreviewOfMarkdownBeingEdited",
        // );

        this.enableHTML5Embed = true;
        this.HTML5EmbedUseImageSyntax = true;
        this.HTML5EmbedUseLinkSyntax = true;
        this.HTML5EmbedIsAllowedHttp = false;
        this.HTML5EmbedAudioAttributes = 'controls preload="metadata" width="320"';
        this.HTML5EmbedVideoAttributes = 'controls preload="metadata" width="320" height="240"';
        this.puppeteerWaitForTimeout = 0;
        this.usePuppeteerCore = true;
    }

    public isEqualTo(otherConfig: MarkdownPreviewEnhancedConfig) {
        const json1 = JSON.stringify(this);
        const json2 = JSON.stringify(otherConfig);
        return json1 === json2;
    }

    [key: string]: any;
}