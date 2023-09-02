export const translateAnswer = (answer) => {
    let translated = '';
    if (answer === 'ა') {
        translated = 'a'
    } else if (answer === 'ბ') {
        translated = 'b'
    } else if (answer === 'გ') {
        translated = 'c'
    } else if (answer === 'დ') {
        translated = 'd'
    } else if (answer === 'a') {
        translated = 'ა'
    } else if (answer === 'b') {
        translated = 'ბ'
    } else if (answer === 'c') {
        translated = 'გ'
    } else if (answer === 'd') {
        translated = 'დ'
    }
    else {
        translated = ''
    }
    return translated;
}