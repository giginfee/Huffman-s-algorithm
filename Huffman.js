//хаффман
const Node = function (char, numValue, first) {
    this.mainValue = char;
    this.numValue = numValue;
    this.allPrevValues = [char];
    this.binValue = undefined;
    this.parent = null;
    this.leftChild =null;
    this.rightChild =null;
    this.end = first;
    this.root = false;
}

let alphabet={
    a:0.5,
    b:0.2,
    c:0.2,
    d:0.05,
    e:0.04,
    f:0.01

}
let alphabet2={
    a:0.082,
    b:0.015,
    c:0.028,
    d:0.043,
    e:0.127,
    f:0.022,
    g:0.02,
    h:0.061,
    i:0.07,
    j:0.0015,
    k:0.0077,
    l:0.04,
    m:0.024,
    n:0.067,
    o:0.075,
    p:0.019,
    q:0.00095,
    r:0.06,
    s:0.063,
    t:0.091,
    u:0.028,
    v:0.0098,
    w:0.024,
    x:0.0015,
    y:0.02,
    z:0.00074
}
alphabet2={
    a:0.18,
    b:0.09,
    c:0.06,
    d:0.11,
    e:0.04,
    f:0.05,
    g:0.08,
    h:0.13,
    i:0.08,
    j:0.16,
    k:0.12
}
//createTree(alphabet)



decode(encode("aaaaaa",alphabet2),alphabet2)

calcL(alphabet2)
calcH(alphabet2)




function calcL(alphabet){
    let L=0
    let table=createTablesWithCharKeys(alphabet)
    for(let char of Object.keys(alphabet)){

        L+=alphabet[char]*table[char].length
    }
    console.log("L = "+L)
    return L

}
function calcH(alphabet){
    let H=0
    for(let char of Object.keys(alphabet)){

        H-=alphabet[char]*getBaseLog(2,alphabet[char])
    }
    console.log("H = "+H)
    return H
}
function encode(string, alphabet){
    let encodedStr=""
    let table=createTablesWithCharKeys(alphabet)
    console.log(table)
    for(let ch of string){
        if(table.hasOwnProperty(ch))
            encodedStr+=table[ch]
        else{
            throw new Error("Cannot encode with this alphabet");
        }
    }
    console.log(encodedStr)
    return encodedStr

}


function decode(string, alphabet){
    let decodedStr=""
    let table=createTablesWithCodesKeys(alphabet)
    let code=""
    let i=0
    for(let bit of string){
        code+=bit
        if(table.hasOwnProperty(code)) {
            decodedStr += table[code]
            code=""
        }else if (i === string.length-1){
            throw new Error("Cannot decode this string");
        }
        i++
    }
    console.log(decodedStr)
    return decodedStr

}







function createTablesWithCharKeys(alphabet){
    let charNodesArr=[]
    let tree=createTree(alphabet,charNodesArr)
    let table={    }

    for(let node of charNodesArr){
        let binArr=[]
        let char=node.mainValue
        while(node.root!==true){
            binArr.push(node.binValue)
            node=node.parent
        }
        binArr=binArr.reverse()
        let codedString=binArr.join("")
        table[char]=codedString
    }
    return table

}
function createTablesWithCodesKeys(alphabet){
    let charNodesArr=[]
    let tree=createTree(alphabet,charNodesArr)
    let table={    }

    for(let node of charNodesArr){
        let binArr=[]
        let char=node.mainValue
        while(node.root!==true){
            binArr.push(node.binValue)
            node=node.parent
        }
        binArr=binArr.reverse()
        let codedString=binArr.join("")
        table[codedString]=char
    }
    return table

}
function createTree(alphabet, charArr){
    let array=initArray(alphabet);
    let i = -1;
    while (++i < array.length) {
        charArr[i] = array[i];
    }
    for (let i=1;i<array.length;){
        let length=array.length
        let newNode=new Node((array[length-1].mainValue<array[length-2].mainValue?array[length-1].mainValue:array[length-2].mainValue),
            array[length-1].numValue+array[length-2].numValue, false)
        array[length-1].parent=newNode
        array[length-2].parent=newNode
        if(array[length-1].mainValue<array[length-2].mainValue)
        {
            newNode.leftChild=array[length-1]
            newNode.rightChild=array[length-2]
        }else {
            newNode.leftChild=array[length-2]
            newNode.rightChild=array[length-1]
        }
        if(newNode.leftChild )
        newNode.leftChild.binValue=0
        newNode.rightChild.binValue=1
        newNode.allPrevValues=newNode.leftChild.allPrevValues.concat(newNode.rightChild.allPrevValues)
        array=array.slice(0,length-2)
        insertInArray(newNode,array)


    }
    array[0].root=true
    //console.log(array)
    return array[0]

}


function insertInArray(node, arr){
    arr.push(node)
    sortArr(arr)
}

function initArray(alphabet){
    let array=[]
    for(let key of Object.keys(alphabet)){
        array.push(new Node(key,alphabet[key], true))
    }
    sortArr(array)
    return array;
}

function sortArr(arr){
    arr.sort(function (a, b) {
        if (a.numValue > b.numValue) {
            return -1;
        }
        if (a.numValue < b.numValue) {
            return 1;
        }
        return 0;
    });
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

