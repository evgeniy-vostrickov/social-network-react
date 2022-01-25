'use strict'

exports.checkFilePhoto = (files) => {
    // console.log(file)
    const selectedFile = files[0];
    if (!selectedFile) {
        // Alert с ошибкой
        console.log("Ничего не выбрано");
        return false;
    }
    else if (selectedFile.type != "image/jpeg" && selectedFile.type != "image/png") {
        console.log("Неверный тип");
        return false;
    }
    else if (selectedFile.size > 1700000) {
        console.log("Слишком большой размер");
        return false;
    }
    return true;
}