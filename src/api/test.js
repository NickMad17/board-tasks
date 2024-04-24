export const vizhener = {
  ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
  en : "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  square : [],
  genSqViz : function (lang) {
    let l = this[lang], square = [];
    for (let i = 0; i < l.length; i++) {
      this.square[i] = l.slice(i).concat(l.slice(0, i));
    }
  },
  encryption : function (lang, text, key) {
    if (lang !== "ru" && lang !== "en") return false;
    if (text.length !== key.length) key = this.genKey(text, key);
    this.genSqViz(lang);
    let s = "";
    for (let i = 0; i < text.length; i++) {
      s += this.square[this[lang].indexOf(text[i])][this[lang].indexOf(key[i])];
    }
    return s;
  },
  decryption : function (lang, key, cipher) {
    if (lang !== "ru" && lang !== "en") return false;
    if (cipher.length !== key.length) key = this.genKey(cipher, key);
    this.genSqViz(lang);
    let s = "";
    for (let i = 0; i < cipher.length; i++) {
      let row = this[lang].indexOf(key[i])
      let coll = this.square[row].indexOf(cipher[i]);
      s += this[lang][coll];
    }
    return s;
  },
  genKey : function (text, key) {

    for (let i = 0; i < Math.ceil(text.length/key.length)-1; i++) {

      key = key.concat(key);
    }

    key = key.concat(key.slice(0, text.length - key.length));

    return key;

  }
};

console.log(vizhener.encryption("en", "EYETOASSRULIT", "ITWOC"))
console.log(vizhener.decryption("en", "ITWOC", "MRAHQILOFWTBP"))