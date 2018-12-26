let Element = function (values, children) {
    let i =0;
    this.id = values[i++];
    this.pid = values[i++];
    this.w = values[i++];
    this.h = values[i++];
    this.x = values[i++];
    this.y = values[i++];
    this.children_num = values[i++];
    this.isZero = values[i++];
    this.overflow = values[i++];
    this.search = values[i++];
    this.footer = values[i++];
    this.header = values[i++];
    this.image = values[i++];
    this.logo = values[i++];
    this.navigation = values[i++];
    this.is_href = values[i++];
    this.textarea = values[i++];
    this.is_input = values[i++];
    this.is_txt = values[i++];
    this.is_title = values[i++];
    this.sibling_num = values[i++];
    this.tag = values[i++];
    this.lv = values[i++];
    this.children = children;
    this.verticalSidedness=values[i++];
    this.horizontalSidedness=values[i++];
    this.leftSidedness=values[i++];
    this.topSideness=values[i++];
    this.shapeAppearance=values[i++];
    this.color=values[i++];
    this.fontColor=values[i++];
    this.font_size=values[i++];
    this.font_weight=values[i++];
    this.word_count=values[i++];
    this.word_len=values[i++];
    this.bottom=values[i++];
    this.top=values[i++];
    this.fillsHeight=values[i++];
    this.fillsWidth=values[i++];
    this.selector=values[i++];
    this.sib_order = values[i++];
    this.typeCls = values[i++];
    this.coverage = 0;
};

Element.prototype.getSpecialTags = function () {
    let tmp = [this.search, this.footer, this.header, this.image, this.logo, this.navigation, this.is_input, this.is_txt, this.is_title];
    let str = '1';
    for (let i = 0; i < tmp.length; i++) {
        str += tmp[i];
       // console.log('tmp='+tmp[i]+' str='+str);
    }
    return str;
};

Element.prototype.setSpecialTags = function (values) {
    this.search = parseInt(values.charAt(1));
    this.footer = parseInt(values.charAt(2));
    this.header = parseInt(values.charAt(3));
    this.image = parseInt(values.charAt(4));
    this.logo = parseInt(values.charAt(5));
    this.navigation = parseInt(values.charAt(6));
    this.is_input = parseInt(values.charAt(7));
    this.is_txt = parseInt(values.charAt(8));
    this.is_title = parseInt(values.charAt(9));

};

Element.prototype.getProperties = function(){
    let prop =
        this.id+","
        +this.pid+","
        +this.w+","
        +this.h+","
        +this.x+","
        +this.y+","
        +this.verticalSidedness+","
        +this.horizontalSidedness+","
        +this.leftSidedness+","
        +this.topSideness+","
        +this.shapeAppearance+","
        +this.isZero+",'"
        +this.tag+"','"
        +this.color+"','"
        +this.fontColor+"','"
        +this.overflow+"',"
        +this.font_size +","
        +this.font_weight+","
        +this.word_count+","
        +this.word_len+","
        +this.search+","
        +this.footer+","
        +this.logo+","
        +this.image+","
        +this.navigation+","
        +this.bottom+","
        +this.top +","
        +this.fillsHeight+","
        +this.fillsWidth+",'"
        +this.selector+"',"
        +this.lv+","
        +this.sib_order+","
        +this.children_num+","
        +this.is_href+","
        +this.sibling_num+","
        +this.textarea+","
        +this.is_input+","
        +this.is_txt+","
        +this.is_title+","
        +this.coverage+","
        +this.typeCls;
    return prop;
}

export {Element}
