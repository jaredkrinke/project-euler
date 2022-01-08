// import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

Deno.test("1. Multiples of 3 or 5", () => {
    let sum = 0;
    for (let i = 3; i < 1000; i++) {
        if ((i % 3) === 0 || (i % 5) === 0) {
            sum += i;
        }
    }
    console.log(sum);
});

Deno.test("2. Even Fibonacci numbers", () => {
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

    console.log(sum);
});

Deno.test("3. Largest prime factor", () => {
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
    console.log(largestPrimeFactor);
});
