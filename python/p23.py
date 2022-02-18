from math import floor, sqrt

def getDivisors(n):
    divisors = {1}
    for i in range(2, floor(sqrt(n)) + 1):
        if (n % i) == 0:
            divisors.add(i)
            divisors.add(n // i)

    return divisors

print(getDivisors(90))
print(sum(getDivisors(90)))

max = 28123
# max = 30

# Find abundant numbers
relevantNumbers = {n for n in range(1, max + 1)}
abundantNumbers = {n for n in relevantNumbers if sum(getDivisors(n)) > n}

# Find numbers that can't be written as a sum of two abundant numbers
for n in abundantNumbers:
    for m in abundantNumbers:
        sumOfAbundants = n + m
        if relevantNumbers.issuperset({sumOfAbundants}):
            relevantNumbers.remove(sumOfAbundants)

print(sum(relevantNumbers))
