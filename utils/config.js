"use strict";
exports.__esModule = true;
var MarkdownPreviewEnhancedConfig = /** @class */ (function () {
    function MarkdownPreviewEnhancedConfig() {
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
        this.mathRenderingOption = 'KaTeX';
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
    MarkdownPreviewEnhancedConfig.getCurrentConfig = function () {
        return new MarkdownPreviewEnhancedConfig();
    };
    MarkdownPreviewEnhancedConfig.prototype.isEqualTo = function (otherConfig) {
        var json1 = JSON.stringify(this);
        var json2 = JSON.stringify(otherConfig);
        return json1 === json2;
    };
    return MarkdownPreviewEnhancedConfig;
}());
exports.MarkdownPreviewEnhancedConfig = MarkdownPreviewEnhancedConfig;
