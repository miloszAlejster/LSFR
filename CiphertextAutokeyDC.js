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
    // sprawdzam co ma xorowac
    for (let i = 0; i < wielomian.length; i++){
        if(wielomian[i] === '1'){
            lfsrCompBitsLoop.push((state & (1 << i)) === 0 ? 0 : 1);
        }
    }
    // operacja xor
    let z = lfsrCompBitsLoop[0];
    lfsrCompBitsLoop.shift();
    lfsrCompBitsLoop.map((bit) => {
        z = z ^ bit;
    });
    lfsrCompBitsLoop = [];
    const y = stream[streamId++].toString(2);
    const x = y ^ z;
    state = (state >> 1) | (y << (wielomian.length - 1));
    output.push(x)
    if(streamId >= stream.length) streamEnded = true;
} while (streamEnded === false);

console.log(`Plaintext: ${output.join('')}`);
