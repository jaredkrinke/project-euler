numbers = range(0, 10)
n = 1000000
# numbers = [0, 1, 2]
# n = 3

digits = [str(n) for n in numbers]

# Note: should really just count up to 1,000,000 and not return huge lists
def permute(prefix, remaining):
    if len(remaining) == 0:
        yield prefix
    else:
        for c in remaining:
            yield from permute(prefix + c, [other for other in remaining if other != c])

i = 0
for s in permute("", digits):
    i += 1
    if i == n:
        print(s)
        break
