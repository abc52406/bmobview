
export function GetBmobFieldString(record, field, type, enuminfo) {
    var value;
    switch (field) {
        case 'createdAt':
            value = record.createdAt;
            break;
        case 'updatedAt':
            value = record.updatedAt;
            break;
        case 'objectId':
            value = record.id;
            break;
        default:
            value = record.get(field);
            break;
    }
    if (type === 'enum') {
        var enumitem = enuminfo.filter(function (item) {
            return item.value === value
        })
        value = enumitem.length ? enumitem[0].text : ''
    }
    return value;
}