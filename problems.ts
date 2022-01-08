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
