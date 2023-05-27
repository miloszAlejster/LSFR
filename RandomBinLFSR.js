let seed, wielomian;
process.argv.forEach((val, id) => {
    if (id === 2) seed = parseInt(val, 2);
    else if (id === 3) wielomian = val;
});
const pause = (sleepDuration) => new Promise(res => setTimeout(res, sleepDuration));
process.on('SIGINT', () => {
    process.exit();
});

let state = seed;
let lfsrCompBitsLoop = [];
(async () => {
    do {
        // operacja xor na wybranych przez wielomian bitach stanu
        for (let i = 0; i < wielomian.length; i++){
            if(wielomian[i] === '1'){
                lfsrCompBitsLoop.push((state & (1 << i)) === 0 ? 0 : 1);
            }
        }
        let out = lfsrCompBitsLoop[0];
        lfsrCompBitsLoop.shift();
        lfsrCompBitsLoop.map((bit) => {
            out = out ^ bit;
        });
        lfsrCompBitsLoop = [];
        state = (state >> 1) | (out << (wielomian.length - 1));
        process.stdout.write(`${out}`);
        await pause(200);
    } while (true);
})();
