function templateStr(tpl, attributes) {
    var prop;
    for (prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
            tpl = tpl.replace('{{' + prop + '}}', attributes[prop]);
        }
    }
    return tpl;
}