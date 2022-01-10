export interface Problem {
    number: number;
    title: string;
    solve: () => number;
}

export const problems: Problem[] = [];
function add(number: number, title: string, solve: () => number) {
    problems.push({ number, title, solve });
}

add(1, "Multiples of 3 or 5", () => {
    let sum = 0;
    for (let i = 3; i < 1000; i++) {
        if ((i % 3) === 0 || (i % 5) === 0) {
            sum += i;
        }
    }
    return sum;
});

add(2, "Even Fibonacci numbers", () => {
    function* fib(): Iterable<number> {
        let pp = 0;
        let p = 1;
        while (true) {
            const next = p + pp;
            yield next;
            pp = p;
            p = next;
        }
    }

    let sum = 0;
    for (const n of fib()) {
        if (n > 4000000) {
            break;
        }

        if (!(n & 0x1)) {
            sum += n;
        }
    }
    return sum;
});

add(3, "Largest prime factor", () => {
    const n = 600851475143;

    function primeOrZero(x: number): number {
        const limit = Math.floor(Math.sqrt(x));
        for (let i = 2; i <= limit; i++) {
            if ((x % i) === 0) {
                return 0;
            }
        }
        return x;
    }

    let largestPrimeFactor = 2;
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= limit; i++) {
        if ((n % i) === 0) {
            largestPrimeFactor = Math.max(largestPrimeFactor, primeOrZero(i), primeOrZero(n / i));
        }
    }
    return largestPrimeFactor;
});

add(4, "Largest palindrome product", () => {
    function isPalindrome(x: number): boolean {
        const numberString = x.toString(10);
        return numberString === numberString.split("").reverse().join("");
    }

    const factorMin = 100;
    const factorMax = 999;
    function isProductOfTwoThreeDigitNumbers(x: number): boolean {
        for (let i = factorMin; i <= factorMax; i++) {
            if ((x % i) === 0) {
                const other = x / i;
                if (other >= factorMin && other <= factorMax) {
                    return true;
                }
            }
        }
        return false;
    }

    const min = factorMin * factorMin;
    const max = factorMax * factorMax;
    for (let i = max; i >= min; i--) {
        if (isPalindrome(i) && isProductOfTwoThreeDigitNumbers(i)) {
            return i;
        }
    }
    return 0;
});

function* primesUpTo(max: number): Iterable<number> {
    // TODO: sieve and/or only test primes
    yield 2;
    for (let i = 3; i <= max; i += 2) {
        let prime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if ((i % j) === 0) {
                prime = false;
                break;
            }
        }
        if (prime) {
            yield i;
        }
    }
}

add(5, "Smallest multiple", () => {
    const n = 20;
    const primes = new Set(primesUpTo(n));
    const productOfPrimes = [...primes].reduce((product, x) => product * x, 1);
    const otherFactors = [...Array(n).keys()].map((_v, i) => i + 1).filter(x => !primes.has(x));
    console.log(otherFactors);
    while (true) {
        for (let i = productOfPrimes;; i += productOfPrimes) {
            if (otherFactors.filter(x => (i % x) === 0).length === otherFactors.length) {
                return i;
            }
        }
    }
});

add(6, "Sum square difference", () => {
    const n = 100;
    const numbers = [...Array(n).keys()].map((_v, i) => i + 1);
    const sumOfSquares = numbers.reduce((sum, x) => sum += x * x);
    const sum = numbers.reduce((sum, x) => sum + x);
    const squareOfSum = sum * sum;
    return squareOfSum - sumOfSquares;
});

add(7, "10001st prime", () => {
    function* primes(): Iterable<number> {
        for (let i = 2;; i++) {
            let prime = true;
            for (let j = 2; j < i; j++) {
                if ((i % j) === 0) {
                    prime = false;
                    break;
                }
            }
            if (prime) {
                yield i;
            }
        }
    }

    const n = 10001;
    let i = 0;
    for (const prime of primes()) {
        if (++i === n) {
            return prime;
        }
    }
    return 0;
});

add(8, "Largest product in a series", () => {
    const digitString = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";
    const n = 13;

    const digits = digitString.split("").map(str => parseInt(str));
    let max = 0;
    for (let i = 0; i < digits.length - n; i++) {
        max = Math.max(max, digits.slice(i, i + n).reduce((product, x) => product * x, 1));
    }

    return max;
});

add(9, "Special Pythagorean triplet", () => {
    for (let a = 1; a < 1000; a++) {
        for (let b = 1; b < 1000; b++) {
            for (let c = 1; c < 1000; c++) {
                if ((a * a + b * b === c * c) && (a + b + c === 1000)) {
                    return a * b * c;
                }
            }
        }
    }
    return 0;
});

add(10, "Summation of primes", () => {
    const n = 2 * 1000 * 1000;
    return [...primesUpTo(n)].reduce((sum, x) => sum + x);
});


add(11, "Largest product in a grid", () => {
    const str = `08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
    49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
    81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
    52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
    22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
    24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
    32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
    67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
    24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
    21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
    78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
    16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
    86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
    19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
    04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
    88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
    04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
    20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
    20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
    01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48`;

    const grid = str.split(/\r?\n/).map(line => line.trim().split(/ +/).map(s => parseInt(s)));
    console.log(grid);
    const n = 4;

    function multiply(pick: (k: number) => number): number {
        let product = 1;
        for (let k = 0; k < n; k++) {
            product *= pick(k);
        }
        return product;
    }

    let maxProduct = 0;
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            if (j <= row.length - n) {
                // Horizontal
                maxProduct = Math.max(maxProduct, multiply(k => row[j + k]));

                if (i <= grid.length - n) {
                    // Down and right
                    maxProduct = Math.max(maxProduct, multiply(k => grid[i + k][j + k]));
                }
                if (i >= n) {
                    // Up and right
                    maxProduct = Math.max(maxProduct, multiply(k => grid[i - k][j + k]));
                }
            }
            if (i <= grid.length - n) {
                // Vertical
                maxProduct = Math.max(maxProduct, multiply(k => grid[i + k][j]));
            }
        }
    }
    return maxProduct;
});

add(12, "Highly divisible triangular number", () => {
    function* triangleNumbers(): Iterable<number> {
        let sum = 0;
        for (let i = 1;; i++) {
            yield sum += i;
        }
    }

    function getDivisors(x: number): Set<number> {
        const divisors = new Set<number>();
        for (let i = 1; i <= Math.sqrt(x); i++) {
            if ((x % i) === 0) {
                divisors.add(i);
                divisors.add(x / i);
            }
        }
        return divisors;
    }

    const n = 500;
    for (const x of triangleNumbers()) {
        if (getDivisors(x).size > n) {
            return x;
        }
    }
    return 0;
});

add(13, "Large sum", () => {
    const str = `37107287533902102798797998220837590246510135740250
    46376937677490009712648124896970078050417018260538
    74324986199524741059474233309513058123726617309629
    91942213363574161572522430563301811072406154908250
    23067588207539346171171980310421047513778063246676
    89261670696623633820136378418383684178734361726757
    28112879812849979408065481931592621691275889832738
    44274228917432520321923589422876796487670272189318
    47451445736001306439091167216856844588711603153276
    70386486105843025439939619828917593665686757934951
    62176457141856560629502157223196586755079324193331
    64906352462741904929101432445813822663347944758178
    92575867718337217661963751590579239728245598838407
    58203565325359399008402633568948830189458628227828
    80181199384826282014278194139940567587151170094390
    35398664372827112653829987240784473053190104293586
    86515506006295864861532075273371959191420517255829
    71693888707715466499115593487603532921714970056938
    54370070576826684624621495650076471787294438377604
    53282654108756828443191190634694037855217779295145
    36123272525000296071075082563815656710885258350721
    45876576172410976447339110607218265236877223636045
    17423706905851860660448207621209813287860733969412
    81142660418086830619328460811191061556940512689692
    51934325451728388641918047049293215058642563049483
    62467221648435076201727918039944693004732956340691
    15732444386908125794514089057706229429197107928209
    55037687525678773091862540744969844508330393682126
    18336384825330154686196124348767681297534375946515
    80386287592878490201521685554828717201219257766954
    78182833757993103614740356856449095527097864797581
    16726320100436897842553539920931837441497806860984
    48403098129077791799088218795327364475675590848030
    87086987551392711854517078544161852424320693150332
    59959406895756536782107074926966537676326235447210
    69793950679652694742597709739166693763042633987085
    41052684708299085211399427365734116182760315001271
    65378607361501080857009149939512557028198746004375
    35829035317434717326932123578154982629742552737307
    94953759765105305946966067683156574377167401875275
    88902802571733229619176668713819931811048770190271
    25267680276078003013678680992525463401061632866526
    36270218540497705585629946580636237993140746255962
    24074486908231174977792365466257246923322810917141
    91430288197103288597806669760892938638285025333403
    34413065578016127815921815005561868836468420090470
    23053081172816430487623791969842487255036638784583
    11487696932154902810424020138335124462181441773470
    63783299490636259666498587618221225225512486764533
    67720186971698544312419572409913959008952310058822
    95548255300263520781532296796249481641953868218774
    76085327132285723110424803456124867697064507995236
    37774242535411291684276865538926205024910326572967
    23701913275725675285653248258265463092207058596522
    29798860272258331913126375147341994889534765745501
    18495701454879288984856827726077713721403798879715
    38298203783031473527721580348144513491373226651381
    34829543829199918180278916522431027392251122869539
    40957953066405232632538044100059654939159879593635
    29746152185502371307642255121183693803580388584903
    41698116222072977186158236678424689157993532961922
    62467957194401269043877107275048102390895523597457
    23189706772547915061505504953922979530901129967519
    86188088225875314529584099251203829009407770775672
    11306739708304724483816533873502340845647058077308
    82959174767140363198008187129011875491310547126581
    97623331044818386269515456334926366572897563400500
    42846280183517070527831839425882145521227251250327
    55121603546981200581762165212827652751691296897789
    32238195734329339946437501907836945765883352399886
    75506164965184775180738168837861091527357929701337
    62177842752192623401942399639168044983993173312731
    32924185707147349566916674687634660915035914677504
    99518671430235219628894890102423325116913619626622
    73267460800591547471830798392868535206946944540724
    76841822524674417161514036427982273348055556214818
    97142617910342598647204516893989422179826088076852
    87783646182799346313767754307809363333018982642090
    10848802521674670883215120185883543223812876952786
    71329612474782464538636993009049310363619763878039
    62184073572399794223406235393808339651327408011116
    66627891981488087797941876876144230030984490851411
    60661826293682836764744779239180335110989069790714
    85786944089552990653640447425576083659976645795096
    66024396409905389607120198219976047599490197230297
    64913982680032973156037120041377903785566085089252
    16730939319872750275468906903707539413042652315011
    94809377245048795150954100921645863754710598436791
    78639167021187492431995700641917969777599028300699
    15368713711936614952811305876380278410754449733078
    40789923115535562561142322423255033685442488917353
    44889911501440648020369068063960672322193204149535
    41503128880339536053299340368006977710650566631954
    81234880673210146739058568557934581403627822703280
    82616570773948327592232845941706525094512325230608
    22918802058777319719839450180888072429661980811197
    77158542502016545090413245809786882778948721859617
    72107838435069186155435662884062257473692284509516
    20849603980134001723930671666823555245252804609722
    53503534226472524250874054075591789781264330331690`;

    const numbers = str.split(/\r?\n/).map(s => s.trim());

    const n = 10;
    let sum = "";
    let remainder = 0;
    for (let i = numbers[0].length - 1; i >= 0; i--) {
        let columnSum = remainder;
        for (let j = 0; j < numbers.length; j++) {
            columnSum += parseInt(numbers[j][i]);
        }
        if (i === 0) {
            sum = columnSum.toString(10) + sum;
        } else {
            sum = (columnSum % 10).toString(10) + sum;
            remainder = Math.floor(columnSum  / 10);
        }
    }
    return parseInt(sum.slice(0, n));
});

add(14, "Longest Collatz sequence", () => {
    function collatzSequence(x: number): number[] {
        const sequence = [x];
        while (x !== 1) {
            let next: number;
            if ((x % 2) === 0) {
                next = x / 2;
            } else {
                next = 3 * x + 1;
            }
            sequence.push(next);
            x = next;
        }
        return sequence;
    }

    let maxLength = 0;
    let inputWithLongestSequence = 0;
    for (let i = 1; i < 1000000; i++) {
        const length = collatzSequence(i).length;
        if (length > maxLength) {
            inputWithLongestSequence = i;
            maxLength = length;
        }
    }

    return inputWithLongestSequence;
});

add(15, "Lattice paths", () => {
    const width = 20;
    const height = 20;

    const memo: { [wh: number]: number } = {};
    function countPaths(w: number, h: number): number {
        const index = w << 8 | h;
        const cached = memo[index];
        if (cached !== undefined) {
            return cached;
        }

        let paths = 0;
        if (w > 0) {
            paths += countPaths(w - 1, h);
        } else {
            return 1;
        }

        if (h > 0) {
            paths += countPaths(w, h - 1);
        } else {
            return 1;
        }

        memo[index] = paths;
        return paths;
    }

    return countPaths(width, height);
});

add(16, "Power digit sum", () => {
    // A bit overkill... also BigInt
    const base = 10;
    class NaiveDecimal {
        constructor(public digits: number[]) {
        }

        static add(...list: NaiveDecimal[]): NaiveDecimal {
            switch (list.length) {
                case 0: return new NaiveDecimal([]);
                case 1: return list[0];
            }

            const a = list[0];
            const b = list[1];
            const sum = new NaiveDecimal([]);
            const maxLength = Math.max(a.digits.length, b.digits.length);
            let remainder = 0;
            for (let i = 0; i < maxLength; i++) {
                const digitSum = remainder + (a.digits[i] ?? 0) + (b.digits[i] ?? 0);
                sum.digits.push(digitSum % base);
                remainder = Math.floor(digitSum / base);
            }
            if (remainder > 0) {
                sum.digits.push(remainder);
            }

            return NaiveDecimal.add(sum, ...list.slice(2));
        }

        static multiply(...list: NaiveDecimal[]): NaiveDecimal {
            switch (list.length) {
                case 0: return new NaiveDecimal([]);
                case 1: return list[0];
            }

            const a = list[0];
            const b = list[1];
            const digitProducts: NaiveDecimal[] = [];
            for (let i = 0; i < a.digits.length; i++) {
                const row = new NaiveDecimal([]);
                digitProducts[i] = row;
                let remainder = 0;
                for (let j = 0; j < b.digits.length; j++) {
                    const product = remainder + (a.digits[i] * b.digits[j]);
                    row.digits.push(product % base);
                    remainder = Math.floor(product / base);
                }
                if (remainder > 0) {
                    row.digits.push(remainder);
                }
                for (let k = 0; k < i; k++) {
                    row.digits.unshift(0);
                }
            }

            const sum = NaiveDecimal.add(...digitProducts);
            return NaiveDecimal.multiply(sum, ...list.slice(2));
        }

        sumDigits(): number {
            return this.digits.reduce((sum, x) => sum + x, 0);
        }

        toString(): string {
            return this.digits.length > 0 ? this.digits.slice().reverse().join("") : "0";
        }
    }

    const two = new NaiveDecimal([2]);
    let x = two;
    const n = 1000;
    for (let i = 1; i < n; i++) {
        x = NaiveDecimal.multiply(x, two);
    }

    return x.sumDigits();
});

add(17, "Number letter counts", () => {
    const numberWords = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];

    const tensWords = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];

    const rankWords = [
        "",
        "",
        "hundred",
        "thousand",
    ];

    const andWord = "and";

    function numberToEnglish(x: number): string {
        const list: string[] = [];

        let remainder = x;
        for (let i = 3; i >= 2; i--) {
            const power = Math.pow(10, i);
            if (remainder >= power) {
                list.push(numberWords[Math.floor(remainder / power)]);
                list.push(rankWords[i]);
                remainder = remainder % power;
            }
        }

        if (remainder > 0) {
            if (list.length > 0) {
                // I don't like this part...
                list.push(andWord);
            }

            if (numberWords[remainder]) {
                list.push(numberWords[remainder]);
            } else {
                list.push(tensWords[Math.floor(remainder / 10)]);
                remainder = remainder % 10;
                if (remainder > 0) {
                    list.push(numberWords[remainder]);
                }
            }
        }

        return list.join(" ");
    }

    const letterRegexp = /^[a-zA-Z]$/;
    function countLetters(str: string): number {
        return str.split("").filter(l => letterRegexp.test(l)).length;
    }

    const n = 1000;
    const list: string[] = [];
    for (let i = 1; i <= n; i++) {
        const english = numberToEnglish(i);
        list.push(english);
        console.log(english);
    }

    return countLetters(list.join(", "));
});

add(18, "Maximum path sum I", () => {
    // const text = `3
    // 7 4
    // 2 4 6
    // 8 5 9 3`;

    const text = `75
    95 64
    17 47 82
    18 35 87 10
    20 04 82 47 65
    19 01 23 75 03 34
    88 02 77 73 07 63 67
    99 65 04 28 06 16 70 92
    41 41 26 56 83 40 80 70 33
    41 48 72 33 47 32 37 16 94 29
    53 71 44 65 25 43 91 52 97 51 14
    70 11 33 28 77 73 17 78 39 68 17 57
    91 71 52 38 17 14 91 43 58 50 27 29 48
    63 66 04 68 89 53 67 30 73 16 69 87 40 31
    04 62 98 27 23 09 70 98 73 93 38 53 60 04 23`;

    const triangle = text.split("\n").map(line => line.trim().split(" ").map(s => parseInt(s)));
    
    let max = 0;
    function getPaths(line: number, index: number, previousTotal: number): void {
        const total = previousTotal + triangle[line][index];
        if (line >= triangle.length - 1) {
            if (total > max) {
                max = total;
            }
            return;
        }

        if (index < triangle[line].length) {
            getPaths(line + 1, index + 1, total);
        }

        getPaths(line + 1, index, total);
    }

    getPaths(0, 0, 0);

    return max;
});
