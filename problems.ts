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
