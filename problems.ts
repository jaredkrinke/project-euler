interface Problem {
    number: number;
    title: string;
    solve: () => number;
}

function log(p: Problem) {
    console.log(`${p.number}. ${p.title}:`);
    console.log(p.solve());
    console.log();
}

const problems: Problem[] = [];
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

for (const p of (Deno.args.length > 0)
    ? problems.filter(p => p.number === parseInt(Deno.args[0]))
    : problems
) {
    log(p);
}
