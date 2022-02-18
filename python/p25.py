def fib():
    a, b = 0, 1
    while True:
        a, b = b, a + b
        yield a

minDigits = 1000
index = 0
for n in fib():
    index += 1
    if len(str(n)) >= minDigits:
        print(index)
        break
