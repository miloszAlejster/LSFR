let seed, wielomian, stream;
process.argv.forEach((val, id) => {
    if (id === 2) seed = parseInt(val, 2);
    else if (id === 3) wielomian = val;
    else if (id === 4) stream = val
});
let streamEnded = false;
let id = 1;
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
    let newBit = lfsrCompBitsLoop[0];
    lfsrCompBitsLoop.shift();
    lfsrCompBitsLoop.map((bit) => {
        newBit = newBit ^ bit;
    });
    lfsrCompBitsLoop = [];
    // ustawienie bitow nowego stanu
    state = (state >> 1) | (newBit << (wielomian.length - 1));
    // pominięcie pierwszych wielomian.length bitów
    if(id++ < wielomian.length) continue;
    const tempOutput = (state & 1) ^ stream[streamId++].toString(2);
    output.push(tempOutput)
    if(streamId >= stream.length) streamEnded = true;
} while (streamEnded === false);

console.log(`Sync Stream Cipher/Plaintext: ${output.join('')}`);
