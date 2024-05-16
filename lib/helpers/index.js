function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}
function getLayerAndSlice(path, alias=null) {
    const arrNorm = path.split('src')
    const pathWithoutSrc = arrNorm.length>1 ? arrNorm[1] : arrNorm[0];
    const array = pathWithoutSrc && pathWithoutSrc.split(/\\|\//);
    if(!array[0]){
        array.shift();
    }
    const coincidence = alias ?  alias===array[0] : false;
    if(coincidence){
        array.shift();
    }
    const layer = array[0];
    const slice = array[1];
    return [layer, slice, array];
}

module.exports = {
    isPathRelative,
    getLayerAndSlice
}