# 1.	GENERATOR LICZB PSEUDOLOSOWYCH
W pętli wykonujemy po kolei kilka poniższych operacji.<br />
Wykonanie operacji XOR na wskazanych przez wielomian bitach aktualnego stanu
```
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
```
Uaktualnienie stanu
```
    state = (state >> 1) | (out << (wielomian.length - 1));
```
Wypisanie kolejnego bitu
```
    process.stdout.write(`${out}`);
```
Pętla kończy się gdy wywoła się event SIGINT(‘Ctrl + c’)
```
    process.on('SIGINT', () => {
        process.exit();
    });
```
### Testy:
 ![image](https://github.com/miloszAlejster/LSFR/assets/57639228/4c7e6ca5-0169-4453-8fe6-b189ae918f51)
 
# 2.	Synchronous Stream Cipher
## 2.1.	Encoder
W pętli wykonujemy po kolei kilka poniższych operacji.<br />
Wykonanie operacji XOR na wskazanych przez wielomian bitach aktualnego stanu
```
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
```
Uaktualnienie stanu
```
    state = (state >> 1) | (newBit << (wielomian.length - 1));
```
Po pominięciu pierwszych bitów z nasienia(seed),  następuje operacja XOR na bicie ze strumienia i starym bicie ze stanu
```
    if(id++ < wielomian.length) continue;
    const tempOutput = (state & 1) ^ stream[streamId++].toString(2);
    output.push(tempOutput)
    if(streamId >= stream.length) streamEnded = true;
```
Loop kończy się gdy flaga streamEnded ma wartość true
### Testy:
![image](https://github.com/miloszAlejster/LSFR/assets/57639228/0bef767f-cf77-469e-bc4b-2fc4146accac)
 
## 2.2.	Decoder
Dekodowanie wygląda w sposób analogicznie, więc pominę opis kodu i pokażę jedynie testy 
### Testy:
![image](https://github.com/miloszAlejster/LSFR/assets/57639228/8831a097-f261-4de5-9443-848a5ca57b07)

# 3.	Ciphertext Autokey
## 3.1.	Encoder	
W pętli wykonujemy po kolei kilka poniższych operacji.<br />
Wykonanie operacji XOR na wskazanych przez wielomian bitach aktualnego stanu
```
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
```
Następnie wykonuje się operacja XOR na z i bicie ze strumienia
```
    const y = z ^ x[streamId++].toString(2);
```
Uaktualnienie stanu
```
    state = (state >> 1) | (y << (wielomian.length - 1));
    output.push(y)
    if(streamId >= stream.length) streamEnded = true;
```
Loop kończy się gdy flaga streamEnded ma wartość true
### Testy:
 ![image](https://github.com/miloszAlejster/LSFR/assets/57639228/3299882d-7cca-40df-a675-1571b5bc5022)
 
## 3.2.	Decoder
Jedyną różnicą jest to, że bit wejścia jest od razu przekazywany do stanu, a operacja xor jest wykonywana później przed przekazaniem następnego bitu do wyjścia
```
    const y = stream[streamId++].toString(2);
    state = (state >> 1) | (y << (wielomian.length - 1));
    const x = y ^ z;
    output.push(x)
```
### Testy:
 ![image](https://github.com/miloszAlejster/LSFR/assets/57639228/4979e49f-75e3-48c8-9c4b-2379159ea2e1)

 
 
