'use strict'

exports.checkFilePhoto = (files) => {
    // console.log(file)
    const selectedFile = files[0];
    if (!selectedFile) {
        console.log("Ничего не выбрано");
        return { value: false, text: "Вы ничего не выбрали!" }
    }
    else if (selectedFile.type != "image/jpeg" && selectedFile.type != "image/png") {
        console.log("Неверный тип");
        return { value: false, text: "Выбран неверный тип файла!" }
    }
    else if (selectedFile.size > 5000000) {
        console.log("Слишком большой размер");
        return { value: false, text: "Выбранный файл имеет слишком большой размер!" }
    }
    return { value: true, text: "Файл успешно загружен!" }
}