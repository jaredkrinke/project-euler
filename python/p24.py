numbers = range(0, 10)
n = 1000000
# numbers = [0, 1, 2]
# n = 3

digits = [str(n) for n in numbers]

def permute(prefix, remaining):
    if len(remaining) == 0:
        yield prefix
    else:
        for c in remaining:
            yield from permute(prefix + c, [other for other in remaining if other != c])

for i, s in enumerate(permute("", digits)):
    if i + 1 == n:
        print(s)
        break
