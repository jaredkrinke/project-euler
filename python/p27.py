from math import floor, sqrt

def prime(n):
    for x in range(2, floor(sqrt(n)) + 1):
        if n % x == 0:
            return False
    return True

def consecutive_primes(a, b):
    n = 0
    while True:
        result = n ** 2 + a * n + b
        if result < 2 or not prime(result):
            return n
        n += 1

max_length = 0
product = 0
for a in range(-999, 1000):
    for b in range(-1000, 1001):
        length = consecutive_primes(a, b)
        if length > max_length:
            max_length = length
            product = a * b
            print(f"{a} * {b} = {product} (length: {length})")

print(product)
