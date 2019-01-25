let Styler = function(needMark,_document){
    this.styleInfo = getElemStyles(needMark,_document,'');
};

let getElemStyles = function(needMark, _document,rootPath){
    let nodeStyles = [];
    let body = _document.getElementsByTagName('body');
    let nodes = body[0].getElementsByTagName('*');
    $(nodes).each(function(){
        if($(this).css('display')!='none' && $(this).attr('ignore') == undefined){
            let node = this;
            let path = getPath(null,node);
            if(this.tagName.indexOf('FRAME')>=0){
                let innerWindow = this.contentWindow;
                let innerDocument = innerWindow.document;
                let frameInfo = [];
                frameInfo = getElemStyles(needMark,innerDocument,path);
                if(frameInfo.length>0)
                    nodeStyles.push(frameInfo);
            }

            if($(this).attr('mark')=='true' || !needMark){
                let nodeInfo = {};
                let style = getElStyleStr(node,_document);
                nodeInfo.inputValue = $(this).val();
                nodeInfo.content = getText($(this));
                nodeInfo.path = rootPath+'>'+path;
                nodeInfo.style = (Object.keys(style).length)>0?style:null;
                let frameInfo = [];
                if(this.tagName.indexOf('FRAME')>=0){
                    let innerWindow = this.contentWindow;
                    let innerDocument = innerWindow.document;
                    frameInfo = getElemStyles(needMark,innerDocument,path);
                }
                if(frameInfo.length>0)
                    nodeStyles.push(frameInfo);

                nodeStyles.push(nodeInfo);
            }

        }
    });
    return nodeStyles;
}
function getPath(rootPath, node){
    let path = $(node).parents().addBack();
    let selector='';
    for (let i = 0; i < path.length; i++)
    {
        let nd = path[i].nodeName.toLowerCase();
        let prev = '';
        let later = '';
        let inner = nd;
        let flag = rootPath!=null && rootPath == selector;
        if(selector == rootPath){
            selector = '';
            flag = true;
        }
        if(i!==0){
            let idx = $(path[i-1]).children(nd).index(path[i]);
            if(flag){
                prev = '';
                later = ':eq('+idx+')';
            }else if(idx===0){
                prev = '>';
            }else{
                prev = '>';
                later = ':eq('+idx+')';
            }
        }
        selector+=(prev+inner+later);
    }
    return selector;
}

/**
 *One bug, you do not know what are the target element's styles. (e.g. <a href="x">, :target{styles})
 * @param node
 * @returns {{}}
 */
function getElStyleStr(node,_document) {
    let sheets = _document.styleSheets;
    node.matches = node.webkitMatchesSelector; //获取到真正的matches方法
    let tmp = {};
    let tmpArr = [];

    for (let i in sheets) {
        let rules = sheets[i].rules || sheets[i].cssRules; //前面两步执行之后才能得到所有的css rules
        // 计算rule
        for (let r in rules) {
            let rule = rules[r];
            let style = rule.style;
            let selectors = pseudoClsHandler(rule.selectorText);
            for(let k in selectors){
                if( selectors.hasOwnProperty( k ) ){
                    if (node.matches(selectors[k].origin)) { // 调用matches获取，测试匹配
                        tmp[rule.selectorText] = tmp[rule.selectorText]||[];
                        for (let j = 0; j < style.length; j++) {
                            tmp[rule.selectorText][style[j]]
                                = style[style[j]];
                        }
                    }
                }
            }
        }
    }
    let style = node.style;
    if(style.length>0){
        tmp['own']=[];
        for (let j = 0; j < style.length; j++) {
            tmp['own'][style[j]]
                = style[style[j]];
        }
    }
    return tmp;
}

/**
 * this function will returns the original selectors if some CSS selectors contain pseudo classes.
 * @param selector
 */
function pseudoClsHandler(selector){
    let res = [];
    if(selector){
        if(selector.length>0){
            let slcts = selector.split(','); // in case of multiple elements share the same styles
            for(let i in slcts){
                let tmp = [slcts[i]];
                let currSelector = slcts[i];
                let pseInfo = getAnchorPsecls(currSelector);
                let pseudoCls = pseInfo.pseCls;
                if(pseudoCls.length>0){
                    tmp.origin = slcts[i].substring(0,pseInfo.idx);
                    tmp.pseCls = pseudoCls;
                }else{
                    tmp.origin = slcts[i];
                    tmp.pseCls = '';
                }
                res.push(tmp);
            }
        }
    }
    return res;
}

/**
 * This function will find selectors which contains anchor pseudo classes. (e,g, a:hover, a:visited, etc.)
 * @param str The selector string
 * @returns {Array}
 */
function getAnchorPsecls(str){
    let anchorPsecls = [':checked', ':disabled', ':enabled', ':in-range', ':invalid', ':optional', ':out-of-range', ':read-only', ':read-write', ':required', ':valid', ':link', ':visited', ':active', ':hover', ':focus', ':before', ':after', ':first-letter', ':first-line', ':target' ];

    let flag = false;
    let pseudoCls = '';
    let res = [];
    res.pseCls = pseudoCls;
    if(str.indexOf(':')>=0){ // it means the string contains pseudo class
        for(let i in anchorPsecls){
            if(str.indexOf(anchorPsecls[i])>=0){
                flag = true;
                pseudoCls = str.substr(str.indexOf(anchorPsecls[i]), anchorPsecls[i].length);
                res.pseCls = pseudoCls;
                res.idx = str.indexOf(anchorPsecls[i]);
                break;
            }
        }
    }
    return res;
}

/**
 * returns the text in a node(include the texts in its children)
 * @param node
 * @returns {Array}
 */
function getText(node) {
    let textVec = node.contents().filter(function () {
        return this.nodeType === 3;
    });

        let str = [];
        for (let i = 0; i < textVec.length; i++) {
            let tmpStr = textVec[i].nodeValue;
            var regu = "^([ ]|\\n)+$";
            var re = new RegExp(regu);
            if (!re.test(tmpStr)){
                str.push(textVec[i].nodeValue);
            }
        }
        return str;
}

/**
 * returns the content of an node (format: )
 * @param node
 * @returns {string}
 */
function getContent(node) {
    let html = node.html();
    let text = getText(node);
    let prev = 0;
    let content = "";
    for (let i = 0; i < text.length; i++) {
        let idx = html.indexOf(text[i]);
        let count = 0;
        if (idx !== prev) {
            let subHtml = html.substring(prev, idx);
            prev = idx + text[i].length - 1;
            let tag = subHtml.match(/<[a-z]+>|<\/[a-z]+>/g); //regexp to match strings like '<char>'
            let headStack = [];
            if (tag === null) {
                content = content + text[i];
                continue;
            } else {
                for (let k = 0; k < tag.length; k++) {
                    if (tag[k].search(/<[a-z]+>/) >= 0) {
                        headStack.push(tag[k]);
                    } else {
                        headStack.pop();
                        if (headStack.length === 0) {
                            ++count;
                        }
                    }
                }
            }
        }
        content = content + count + "(sep1)" + text[i] + "(sep2)";

    }
    return content;
}

export {Styler}