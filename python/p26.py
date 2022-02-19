def divide(divisor: int):
    """Performs long division of (1 / divisor) and returns the length of any cycle of repeating decimal digits (otherwise returns 0)."""
    # For detecting cycles (i.e. where the remainder has been encountered before)
    memo = {}

    remainder = 1
    index = 0
    while remainder > 0:
        memo[remainder] = index
        index += 1
        remainder *= 10

        # Division step
        remainder = remainder % divisor

        # Check for cycle
        if memo.get(remainder):
            return index - memo[remainder]
    
    return 0

n = 1000

# Find the longest cycle and its corresponding number
number = 0
max_cycle_length = 0
for x in range(2, n):
    cycle_length = divide(x)
    if cycle_length > max_cycle_length:
        max_cycle_length = cycle_length
        number = x

print(number)