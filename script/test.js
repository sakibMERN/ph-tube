function getTime(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = parseInt(remainingSecond % 60);

    return `${hour} h ${minute} min ago`
}

console.log(getTime(6000));