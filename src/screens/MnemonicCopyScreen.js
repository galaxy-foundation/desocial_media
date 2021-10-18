var Mnemonic = require('bitcore-mnemonic-react-native');
var code = new Mnemonic(Mnemonic.Words.ENGLISH);
code.toString(); // natal hada sutil año sólido papel jamón combate aula flota ver esfera...
var xpriv = code.toHDPrivateKey();