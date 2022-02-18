def fib():
    a, b = 1, 1
    while True:
        yield a
        a, b = b, a + b

minDigits = 1000
for i, n in enumerate(fib()):
    if len(str(n)) >= minDigits:
        print(i + 1)
        break
