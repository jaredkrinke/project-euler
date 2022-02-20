width = 1001
# width = 3
squares = (width - 1) // 2
counter = 1
total = counter
for x in range(squares):
    delta = 2 * (x + 1)
    for y in range(4):
        counter += delta
        total += counter

print(total)