function quickSort(data, array){
    qSort(data,array,0,array.length-1);
}
function partition(data, array, left, right ){
    let key = data[array[left]];
    let array_key = array[left];
    let pivot = left;
    while(left<right) {
        while (left < right && data[array[right]] >= key) {
            right--;
        } // now we find a [right] that has lower value than key
        if(left<right){
            array[left] = array[right]; // place it in pivot(in this time, it's [left], note that we get a blank space in [right])
            ++left;// update left
        }

        while (left < right && data[array[left]] <= key) {
            left++;
        }// similar to previous process
        if(left<right){
            array[right] = array[left];
            --right;
        }
    }
    array[left] = array_key;
    pivot = left;
    return pivot;

}
function qSort(data, array,left,right){
    if(left<right){
        let pivot = partition(data, array, left, right); // now the position of pivot is correct
        let msg = 'pivot='+pivot+' left='+left+' right='+right;
        qSort(data, array, left, pivot-1);
        qSort(data, array, pivot+1, right)
    }

}

export {quickSort};
