import "./jquery.js";
// // export for others scripts to use
// window.$ = $;
// window.jQuery = jQuery;
//import 'http://code.jquery.com/jquery-3.3.1.min.js';
//import {a} from "./myExport.js";
import {saveAs} from "./FileSaver.js"
import {Element} from "./Element.js";
import {Tree} from "./Tree.js";

let gid = 0;
const page_width = $(document.body)[0].clientWidth;
const page_height = $(document.body)[0].clientHeight;

let dbName = get_page_name();
if(dbName.indexOf("_sql")>0){
    dbName = dbName.substring(0,dbName.indexOf("_sql"));
}

let elems = [];
let tree = new Tree(null,elems);
$(window).on('load',function(){
    main();
});


function main() {
    let node = $('html').first();
    let pid = gid;
    gid = gid + 1;
    let tag = $(node).get(0).tagName.toLowerCase();
    let lv = 0;
    let root = getElem(node, pid, lv, 0, 1);

    // sql_array.push(values);
    let children = getChild(node, root.id, lv + 1);
    root.children = children;

    elems[root.id] = root;
    tree.elems = elems;
    tree.root = root;
    tree.dfs_traverse(dbName);
    // tree.deleteElemAt(2);
    tree.init();
    let sql_array = tree.dfs_traverse(dbName);
    let file = new File(sql_array, dbName+".sql", {type: "text/plain;charset=utf-8"});
    saveAs(file);

}
function get_page_name(){
    let filename=window.location.href;
    filename=filename.substr(filename.lastIndexOf("/")+1);
    filename = filename.substring(0,filename.lastIndexOf(".html"));
    return filename;
}

/**
 * return an Elem object of node
 * @param node
 * @param pid
 * @param lv
 * @param sib_order
 * @param sib_num
 * @returns {Element}
 */
function getElem(node, pid, lv, sib_order, sib_num) {
    let w = parseInt($(node).width());
    let h = parseInt($(node).height());
    let x = parseInt($(node).offset().left);
    let y = parseInt($(node).offset().top);
    let children_num = $(node).children().length;
    let verticalSidedness = page_height===0?0:(y + h) / page_height;
    verticalSidedness = verticalSidedness>1?1:verticalSidedness;
    verticalSidedness = verticalSidedness.toFixed(2);
    let horizontalSidedness = page_width===0?0:(x + w) / page_width;
    horizontalSidedness = horizontalSidedness>1?1:horizontalSidedness;
    horizontalSidedness = horizontalSidedness.toFixed(2);
    let leftSidedness = (x/page_width).toFixed(2);
    let topSideness = (y/page_height).toFixed(2);
    let shapeAppearance = (w !== 0 && h !== 0) ? Math.min(w / h, h / w) : 0;
    shapeAppearance = shapeAppearance.toFixed(2);
    let isZero = w * h === 0 ? 1 : 0;
    let tag = $(node).get(0).tagName.toLowerCase();
    let color = $(node).css("background-color");
    let bkimg = $(node).css("background-image");
    let fontColor = $(node).css("color");

    let pdt = parseInt($(node).css('padding-top'));

    let pdl = parseInt($(node).css('padding-left'));

    let overflow = $(node).css('overflow');
    let content = getContent($(node));

    let fontSize = $(node).css('font-size');
    fontSize = fontSize.substring(0,fontSize.length-2);
    let fontWeight = $(node).css('font-weight');
    fontWeight/=100;
    let word_count = wordCount(content);
    let word_len = wordSize(content);
    let m = content.replace(/(\n)+|(\r\n)+/g, "");
    m = m.replace(/(\s)+/g, " ");
    let attr = getAttr($(node));
    let search = isSearch(node, tag, attr) ? 1 : 0;
    let footer = contain_keyword(node, tag, attr, "footer") ? 1 : 0;
    let header = contain_keyword(node, tag, attr, "header") ? 1 : 0;

    let image = (bkimg!=="none" || contain_keyword(node, tag, attr, "img") )? 1 : 0;
    let logo = contain_keyword(node, tag, attr, "logo") ? 1 : 0;
    let navigation = contain_keyword(node, tag, attr, "nav") ? 1 : 0;
    let bottom = y / page_height >= 0.9 ? 1 : 0;
    let top = y / page_height <= 0.1 ? 1 : 0;
    let fillsHeight = h / page_height >= 0.9 ? 1 : 0;
    let fillsWidth = w / page_width >= 0.9 ? 1 : 0;
    isZero = (w<0||h<0||x<0||y<0)?1:isZero;
    x+=pdl;
    y+=pdt;

    let is_href = contain_keyword(node,tag,attr,"href") ? 1:0;
    let textarea = contain_keyword(node,tag,attr,"text") ? w*h:0;
    let is_input = contain_keyword(node,tag,attr,"input")?1:0;
    let is_txt = content.length>0?1:0;
    let is_title = (tag.charAt(0)==='h' && tag.charAt(1)>='1' && tag.charAt(1)<='6') ?1:0;
    let selector = getPath(node);
    let typeCls = 0;
    if(is_txt===1) typeCls = 1;
    if(is_href===1) typeCls = typeCls*10 + 1;
    if(is_input===1) typeCls = typeCls*10 + 2;
    if(is_title === 1) typeCls = typeCls*10+3;
    if(image === 1) typeCls = typeCls*10+4;


    let values = [gid,pid,w,h,x,y,children_num,isZero,overflow,search,footer,
        header,image,logo,navigation,is_href,textarea,is_input,is_txt,is_title,sib_num,tag,lv,
        verticalSidedness,horizontalSidedness,leftSidedness,topSideness,shapeAppearance,color,fontColor,fontSize
        ,fontWeight,word_count,word_len,bottom,top
        ,fillsHeight,fillsWidth,selector,sib_order,typeCls
    ];
    let element = new Element(values,null);
    element.idx = gid;
    element.pidx= pid;
    return element;
}


//let node = $("#testContent");

/**
 * A very naive heuristic rule:
 * 1) this tag or its children contains keyword 'search';
 * 2) this tag contains at least one input and a button
 * @param node
 * @param tag
 * @param attr
 */
function isSearch(node, tag, attr) {
    let is_search = false;
    let child_attrs = attr;
    let child = $(node).children();
    let input_num = 0;
    let button_num = 0;
    $(child).each(function () {
            let attr = getAttr($(this));
            child_attrs = child_attrs + "(sep)" + attr;
            if (tag===('button')) {
                button_num += 1;
            } else if (tag===('input')) {
                if (attr.indexOf("submit")!==-1 || attr.indexOf("button")!==-1) {
                    button_num += 1;
                } else {
                    input_num += 1;
                }
            }
        }
    );
    if (child_attrs.indexOf("search")!==-1) {
        is_search = true;
    } else {
        is_search = (input_num * button_num !== 0);
    }
    return is_search;
}

/**
 * A naive heuristic function to judge if the node belongs to special nodes (e.g. logo, navigation, header, footer, etc).
 * The function suppose the special nodes can be determined by their tags and attributes. (e.g. <nav>, <div id="nav">)
 * @param node
 * @param tag
 * @param attr
 * @param keyword
 * @returns {boolean}
 */
function contain_keyword(node, tag, attr, keyword) {
    let contains_kw = false;
    if (attr.indexOf(keyword)!==-1) {
        contains_kw = true;
    } else if (tag===(keyword)) {
        contains_kw = true;
    }
    return contains_kw;
}

function traverse_single_tree() {

}

function wordCount(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let subStr = [];
        subStr = str[i].split(/ +/);
        len += subStr.length
    }
    return len;
}

function wordSize(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        len += str[i].length;

    }
    return len;
}

function getAttr(node) {
    let attr = node[0].attributes;
    let attrs = "";

    for (let i = 0; i < attr.length; i++) {
        let atrValue = attr.item(i).value;
        atrValue = atrValue.replace(/'/g, "\"");
        attrs += attr.item(i).name + '=' + atrValue + "(sep)";
    }
    return attrs;

}

function getText(node) {
    let textVec = node.contents().filter(function () {
        return this.nodeType === 3;
    });
    if (textVec.length === 1) {
        let str = [];
        str[0] = textVec[0].nodeValue;
        return str;
    } else if (textVec.length > 1) {
        let str = [];
        for (let i = 0; i < textVec.length; i++) {
            if (i === textVec.length - 1) {
                str[i] = textVec[i].nodeValue;
            } else {
                str[i] = textVec[i].nodeValue;
            }

        }
        return str;
    } else {
        return [];
    }
}

function getChild(node, id, lv) {
    let child = $(node).children();
    let children = [];
    let sib_order = 0;
    let sib_num = child.length;
    $(child).each(function () {
        gid = gid + 1;
        let child_elem =  getElem(this, id, lv, sib_order, sib_num);
        ++sib_order;
        let tag = $(this).get(0).tagName.toLowerCase();
        if (tag.indexOf("frame") > 0 || tag.indexOf("FRAME")>0) {
            let innerElem = $(this).contents().find('html');
            let children_elem = getChild(innerElem, gid,  lv + 1);
            child_elem.children = children_elem;
        } else {
            let children_elem = getChild(this, gid,  lv + 1);
            child_elem.children = children_elem;
        }

        children.push(child_elem);
        elems[child_elem.id] = child_elem;
    });
    return children;
}

function formattedCls(cls) {
    let pieceCls = [];
    pieceCls = cls.split(/ +/);
    let formated = "";
    for (let i = 0; i < pieceCls.length; i++) {
        formated = formated + "." + pieceCls[i];

    }
    return formated;
}

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
            let tag = subHtml.match(/<[a-z]+>|<\/[a-z]+>/g);
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

function getPath(node){
    let path = $(node).parents().addBack();
    let selector='';
    for (let i = 0; i < path.length; i++)
    {
        let nd = path[i].nodeName.toLowerCase();
        let id = path[i].getAttribute("id");
        if(id && id.length>0){
            selector = '#'+id;
            continue;
        }
        let prev = '';
        let later = '';
        let inner = nd;

        if(i!==0){
            let idx = $(path[i-1]).children(nd).index(path[i]);
            if(idx===0){
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