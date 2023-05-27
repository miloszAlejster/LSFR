let seed, wielomian, stream;
process.argv.forEach((val, id) => {
    if (id === 2) seed = parseInt(val, 2);
    else if (id === 3) wielomian = val;
    else if (id === 4) stream = val
});
let streamEnded = false;
let streamId = 0;
let output = [];
let state = seed;
let lfsrCompBitsLoop = [];
do {
    // operacja xor na wybranych przez wielomian bitach stanu
    for (let i = 0; i < wielomian.length; i++){
        if(wielomian[i] === '1'){
            lfsrCompBitsLoop.push((state & (1 << i)) === 0 ? 0 : 1);
        }
    }
    let z = lfsrCompBitsLoop[0];
    lfsrCompBitsLoop.shift();
    lfsrCompBitsLoop.map((bit) => {
        z = z ^ bit;
    });
    lfsrCompBitsLoop = [];
    // operacja xor na z i x
    const y = z ^ stream[streamId++].toString(2);
    state = (state >> 1) | (y << (wielomian.length - 1));
    output.push(y)
    if(streamId >= stream.length) streamEnded = true;
} while (streamEnded === false);

console.log(`Ciphertext Autokey: ${output.join('')}`);
