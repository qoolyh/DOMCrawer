/*
To do:
1) updating tree structure by node's type
e.g. div->div->a ==> a->a->a (weak sense)

2) deleting overlap elements
e.g. node.size isOutof(Ancestor) ==> node.isZero=0
 */
import {quickSort} from "./Util.js";

function Tree(root, elems) {
    this.root = root;
    this.elems = elems;
}

function getBitMap(node) {
    let bitmap = [];
    for (let i = 0; i < node.w; i++) {
        bitmap[i] = [];
        for (let j = 0; j < node.h; j++) {
            bitmap[i][j] = 0;
        }
    }
    return bitmap;
}

function draw_bitMap(bitmap, node, ancestor) {
    let offset_left = node.x - ancestor.x;
    let offset_top = node.y - ancestor.y;
    for (let i = 0; i < node.w; i++) {
        for (let j = 0; j < node.h; j++) {
            if (isIn(i + offset_left, 0, ancestor.w - 1) && isIn(j + offset_top, 0, ancestor.h - 1)) {
                bitmap[i + offset_left][j + offset_top] = 1;
            }
        }
    }
}

Tree.prototype.getCoverage = function (idx) {
    let node = this.elems[idx];
    let bitmap = getBitMap(this.elems[idx]);
    let descendant = this.getDescendant(this.elems[idx].id);
    for (let i = 0; i < descendant.length; i++) {
        draw_bitMap(bitmap, descendant[i], this.elems[idx]);
    }
    let one_number = 0;
    for (let i = 0; i < node.w; i++) {
        for (let j = 0; j < node.h; j++) {
            one_number = bitmap[i][j] === 1 ? one_number + 1 : one_number;
        }
    }
    let coverage = one_number / (node.w * node.h);
    if(isNaN(coverage)){
        coverage=-1;
    }
    return coverage;
}
Tree.prototype.sortByLv = function (array) {
    let lv = [];
    let zeros_idx = [];
    for (let i = 0; i < array.length; i++) {
        let idx = array[i];
        zeros_idx.push(i);
        lv.push(this.elems[idx].lv);
    }
    quickSort(lv, zeros_idx);
    let tmp = [];
    for (let i = 0; i < zeros_idx.length; i++) {
        tmp[i] = array[zeros_idx[i]];
    }
    for (let i = 0; i < zeros_idx.length; i++) {
        array[i] = tmp[i];
    }
}

function isIn(value, lower, upper) {
    return value >= lower && value <= upper;
}

Tree.prototype.init = function () {
    this.updateIframeOffset();
    this.checkOverlap();

    let zeros = [];
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i].isZero === 1) {
            zeros.push(i);
        }
    }
    this.sortByLv(zeros);
    for (let i = 0; i < zeros.length; i++) {
        this.deleteElemAt(zeros[i]);
    }
    this.updateNodesType();
    this.updateNodesCoverage();
}
Tree.prototype.deleteElemAt = function (id) {
    let node = this.elems[id]; // that's the problem, the index is not the id!
    let children = node.children;
    let idx = node.sib_order;
    if(node.pid===0){
        this.elems[node.id].isZero = 0;
        return;
    }
    let parent = this.elems[node.pid];
    for (let i = idx + 1; i < parent.children.length; i++) { //update node's siblings first
            let sib_idx = parent.children[i].idx;
            if (this.elems[sib_idx]) {
                let new_order = this.elems[sib_idx].sib_order + children.length - 1;
                this.elems[sib_idx].sib_order = new_order;
            }
    }

    for (let i = 0; i < children.length; i++) { // update node's children
        let cld_idx = children[i].id;
        this.elems[cld_idx].sib_order += idx;
        this.elems[cld_idx].pid = node.pid;

        this.elems[cld_idx].lv -= 1;
        let new_order = children[i].sib_order + idx;
        children[i].sib_order = new_order;
        children[i].pid = node.pid;
        children[i].lv -= 1;
    }

    if (children.length > 0) {
        for (let k = 0; k < children.length; k++) {
            // this.elems[parent.id].children.splice(idx + 1, 0, children[k]); // reverse
            this.elems[parent.id].children.splice(idx + 1, 0, children[children.length-1-k]);
        }
        this.elems[parent.id].children.splice(idx, 1);
    } else {
        this.elems[parent.id].children.splice(idx, 1);
    }
    this.elems[parent.id].children_num += children.length - 1;
    delete this.elems[id];
};
Tree.prototype.getLeaves = function () {
    let leaves = [];
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i] && this.elems[i].children_num === 0) {
            leaves.push(i);
        }
    }
    return leaves;
};

Tree.prototype.getSingleLeaves = function (leaves) {
    let single_leaves = [];
    for (let i = 0; i < leaves.length; i++) {
        if (this.elems[leaves[i]].sibling_num === 1) {
            single_leaves.push(leaves[i]);
        }
    }
    return single_leaves;
};
/**
 * This function returns a subtree of elements that each of them has only one child (not include the leaf node)
 * @param leaf the leaf node
 * @returns {Array}
 */
Tree.prototype.getSingleBranch = function (leaf) {
    let single_branch = [];
    let current_idx = leaf;
    let p = this.elems[current_idx].pid;
    let children_num = this.elems[p].children_num;
    while (children_num === 1) {
        single_branch.push(current_idx);
        current_idx = this.elems[current_idx].pid;
        children_num = this.elems[current_idx].children_num;
    }
    return single_branch;
};

/**
 * Todo:
 */
Tree.prototype.updateNodesType = function () {
    let single_leaves = this.getSingleLeaves(this.getLeaves());
    for (let i = 0; i < single_leaves.length; i++) {
        let single_branch = this.getSingleBranch(single_leaves[i]);
        if (single_branch.length > 0) {
            let values = this.elems[single_branch[0]].getSpecialTags();
            let cross = values;
            for (let k = 0; k < single_branch.length; k++) {
                let current = this.elems[single_branch[k]].getSpecialTags();
                cross = parseInt(values, 2);
                current = parseInt(current, 2);
                cross = cross | current;
            }
            values = cross.toString(2);
            for (let k = 0; k < single_branch.length; k++) {
                this.elems[single_branch[k]].setSpecialTags(values);
            }
        }
    }
};
Tree.prototype.updateNodesCoverage = function () {
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i]) {
            this.elems[i].coverage = this.getCoverage(i);
        }
    }
}
Tree.prototype.dfs_traverse = function (dbName) {
    let sql_array = [];
    let sql = "insert into `" + dbName + "` (`ID`, `parentID`, `width`, `height`, `offsetLeft`, `offsetTop`," +
        "`v_side`, `h_side`, `l_side`, `t_side`, `shapeAprnc`, `isZero`," +
        "`tag`, `color`, `fontColor`, `overflow`, `font_size`, `font_weight`," +
        "`word_count`, `word_len`, `search`, `footer`, `logo`, `image`," +
        "`navigation`, `bottom`, `top`, `fills_height`, `fills_width`, `selector`," +
        "`lv`, `sib_order`,`children_num`," +
        "`is_href`, `sib_num`,`textarea`,`is_input`,`is_txt`,`is_title`,`coverage`,`typeCls`) values" + "\r\n";

    sql_array.push(sql);
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i]) {
            let tmp_sql = "(" + this.elems[i].getProperties() + ")," + "\r\n";
            sql_array.push(tmp_sql);
        }
    }
    let last = sql_array[sql_array.length - 1];
    last = last.substr(0, last.lastIndexOf(',')) + ";";
    sql_array.pop();
    sql_array.push(last);
    return sql_array;
};

Tree.prototype.getDescendant = function (root_idx) {
    let children = this.elems[root_idx].children.slice();
    let descendant = children.slice();
    while (children !== undefined && children !== null && children.length !== 0) {
        let tmp_children = []
        for (let i = 0; i < children.length; i++) {
            let tmp = children[i].children;
            if (tmp !== undefined && tmp !== null && tmp.length > 0) {
                for (let k = 0; k < tmp.length; k++) {
                    tmp_children.push(tmp[k]);
                }
            }
        }
        children = tmp_children;

        if (children.length !== 0) {
            for (let i = 0; i < children.length; i++) {
                descendant.push(children[i]);
            }

        }
    }
    return descendant;
};

Tree.prototype.updateIframeOffset = function(){
    let frames = [];
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i].tag.indexOf('frame')>=0) {
            frames.push(i);
        }
    }
    for (let i = 0; i < frames.length; i++) {
        let idx = frames[i];
        let px = this.elems[idx].x,
            py = this.elems[idx].y,
            pw = this.elems[idx].w,
            ph = this.elems[idx].h;
        let descendant = this.getDescendant(idx);
        for (let k = 0; k < descendant.length; k++) {
            let node = descendant[k],
                curr_idx = descendant[k].id;
            this.elems[curr_idx].x = this.elems[curr_idx].x+px;
            this.elems[curr_idx].y = this.elems[curr_idx].y+py;
        }
    }
}
Tree.prototype.checkOverlap = function () {
    let overflow_root = [];
    for (let i = 1; i < this.elems.length; i++) {
        if (this.elems[i].overflow === 'hidden') {
            overflow_root.push(i);
        }
    }
    for (let i = 0; i < overflow_root.length; i++) {
        let idx = overflow_root[i];
        let px = this.elems[idx].x,
            py = this.elems[idx].y,
            pw = this.elems[idx].w,
            ph = this.elems[idx].h;
        let descendant = this.getDescendant(idx);
        for (let k = 0; k < descendant.length; k++) {
            let node = descendant[k],
                curr_idx = descendant[k].id;
            let cx = node.x,
                cy = node.y,
                cw = node.w,
                ch = node.h;
            let is_In = isIn(cx, px, px + pw) && isIn(cx + cw, px, px + pw) && isIn(cy, py, py + ph) && isIn(cy + ch, py, py + ph);
            if (!is_In) {
                this.elems[curr_idx].isZero = 1;
            }
        }
    }

};
export {Tree}