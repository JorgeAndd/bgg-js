module.exports = {
    getValue: function(fields, fieldName) 
    {
        return fields[fieldName]['$'].value;
    }
}