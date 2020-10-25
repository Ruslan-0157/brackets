const matches = (bracket, nextBracket, kartaSkobok) => {
    return !!nextBracket === kartaSkobok[bracket];
};
// const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];
const otkritieSkobki = (bracketsConfig) => bracketsConfig.map((m) => m[0]);
const zakritieSkobki = (bracketsConfig) => bracketsConfig.map((m) => m[1]);

const karta = (otkritie, bracketsConfig) => {
    let tmp = {};
    otkritie.forEach((sk, i) => (tmp = {...tmp, [sk]: bracketsConfig[i][1] }));
    return tmp;
};

module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 !== 0) return false;
    const otkritie = otkritieSkobki(bracketsConfig);
    const zakritie = zakritieSkobki(bracketsConfig);

    let stack = [];
    const kartaSkobok = karta(otkritie, bracketsConfig);
    console.log("kartaSkobok", JSON.stringify(kartaSkobok));
    str.split("").forEach((skobka, index, massiv) => {
        // if (index === 0 && !otkritie.includes(skobka)) return false;
        if (otkritie.includes(skobka) && zakritie.includes(skobka)) {
            if (index === 0) stack.push(skobka);
            else {
                let prevSkobka = stack[stack.length - 1];
                if (skobka === kartaSkobok[prevSkobka]) stack.pop();
                else stack.push(skobka);
            }
        } else if (otkritie.includes(skobka)) stack.push(skobka);
        else {
            let prevSkobka = stack[stack.length - 1];
            if (skobka === kartaSkobok[prevSkobka]) stack.pop();
        }
    });

    return stack.length === 0;
};